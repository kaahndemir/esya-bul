import json
import os
import glob
import requests
from PIL import Image
from io import BytesIO
import torch
from transformers import CLIPProcessor, CLIPModel

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '../web-dashboard/public/verified_data.json')

# Device (MPS for Mac M1/M2/M3 if available, else CPU)
device = "mps" if torch.backends.mps.is_available() else "cpu"
print(f"🚀 Initializing verified agent on device: {device}")

# Load Model (Lazy loading)
model_id = "openai/clip-vit-base-patch32"
print(f"📥 Loading CLIP model: {model_id}...")
model = CLIPModel.from_pretrained(model_id).to(device)
processor = CLIPProcessor.from_pretrained(model_id)
print("✅ Model loaded.")

# Agent Definitions (Category Logic)
AGENTS = {
    "AGENT_01_FRIDGE": {
        "keywords": ["buzdolabı", "no frost", "buzdolabi"],
        "positive": "a photo of a refrigerator",
        "negatives": ["spare part", "motor", "shelf", "handle", "repair service", "broken fridge"]
    },
    "AGENT_02_WASHER": {
        "keywords": ["çamaşır makinesi", "camasir makinesi", "yıkama makinesi"],
        "positive": "a photo of a washing machine",
        "negatives": ["spare part", "pump", "motor", "door handle", "hose", "repair"]
    },
    "AGENT_03_STOVE": {
        "keywords": ["ocak", "fırın", "set üstü", "setustu"],
        "positive": "a photo of a kitchen stove or oven",
        "negatives": ["gas pipe", "knob", "lighter", "spare part"]
    },
    "AGENT_04_BED": {
        "keywords": ["yatak", "baza", "başlık"],
        "positive": "a photo of a bed or mattress",
        "negatives": ["bed sheet", "pillow", "slats", "leg"]
    },
    "AGENT_05_SOFA": {
        "keywords": ["koltuk", "kanepe", "çekyat", "oturma grubu"],
        "positive": "a photo of a sofa or couch",
        "negatives": ["pillow", "cover", "fabric swatch"]
    },
    "AGENT_06_TABLE": {
        "keywords": ["masa", "sandalye", "yemek masası"],
        "positive": "a photo of a dining table or desk",
        "negatives": ["table cloth", "leg", "screw"]
    },
    "AGENT_07_CURTAINS": {
        "keywords": ["perde", "tül", "fon"],
        "positive": "a photo of curtains covering a window",
        "negatives": ["fabric roll", "hooks", "rod"]
    },
    "AGENT_08_RUGS": {
        "keywords": ["halı", "kilim", "yolluk"],
        "positive": "a photo of a rug or carpet",
        "negatives": ["smaller fabric piece", "thread"]
    },
    "AGENT_09_WARDROBE": {
        "keywords": ["dolap", "gardırop", "gardrop", "yüklük"],
        "positive": "a photo of a wardrobe or closet",
        "negatives": ["handle", "hinge", "drawer slide"]
    },
    "AGENT_10_SCAVENGER": {
        "keywords": ["taşınıyorum", "bedava", "öğrenci", "depo", "koli", "toplu"],
        "positive": "a photo of household items or furniture",
        "negatives": ["text only", "screenshot"]
    }
}

def load_data():
    input_file = os.path.join(DATA_DIR, 'audited_data.json')
    all_items = []
    
    if os.path.exists(input_file):
        try:
            with open(input_file, 'r') as file:
                data = json.load(file)
                for item in data:
                    # Keep Scavenger tags
                    if 'category_tag' in item and 'SCAVENGER' in item['category_tag']:
                         pass
                    all_items.append(item)
        except Exception as e:
            print(f"⚠️ Error reading {input_file}: {e}")

    print(f"📦 Total unique items loaded: {len(all_items)}")
    return all_items

def classify_item(item, image):
    """
    Returns (Best Agent Name, Confidence Score) or None
    """
    title_lower = item['title'].lower()

    candidate_agent_name = item.get('category_tag') or item.get('verified_agent')

    # Map sub-agents to main agents
    if candidate_agent_name and 'SCAVENGER' in candidate_agent_name:
        candidate_agent_name = "AGENT_10_SCAVENGER"

    # 1. Keyword Filter (or Direct Tag Use)
    candidates = []

    if candidate_agent_name and candidate_agent_name in AGENTS:
         # Trust the scraper's tag first
         candidates.append(candidate_agent_name)

    # Fallback to keyword search if no tag or tag failed
    for agent_name, props in AGENTS.items():
        if agent_name not in candidates:
            if any(k in title_lower for k in props['keywords']):
                candidates.append(agent_name)

    if not candidates:
        return None, 0.0

    # 2. Visual Check (Run for each candidate)
    best_score = 0
    best_agent = None

    for agent_name in candidates:
        props = AGENTS[agent_name]
        prompts = [props['positive']] + [f"a photo of a {n}" for n in props['negatives']]

        inputs = processor(text=prompts, images=image, return_tensors="pt", padding=True).to(device)

        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image  # verification score
            probs = logits_per_image.softmax(dim=1)  # probabilities

        # Win condition: Positive prompt (index 0) must be higher than negatives
        positive_score = probs[0][0].item()

        # print(f"   🧐 Checking {agent_name}: {positive_score:.2f} ({props['positive']})")

        if positive_score > best_score:
            best_score = positive_score
            best_agent = agent_name

    return best_agent, best_score

def main():
    items = load_data()
    verified_items = []

    print("🕵️ Starting Visual Verification...")

    for i, item in enumerate(items):
        try:
            image_url = item.get('image')
            if not image_url:
                continue

            # Download Image
            response = requests.get(image_url, timeout=5)
            if response.status_code != 200:
                continue

            image = Image.open(BytesIO(response.content))

            # Run Classification
            agent, score = classify_item(item, image)

            if agent and score > 0.85:
                # print(f"✅ MATCH: {item['title'][:20]}... -> {agent} ({score:.2%})")
                item['verified_agent'] = agent
                item['confidence_score'] = score
                verified_items.append(item)
            else:
                pass
                # print(f"❌ REJECT: {item['title'][:20]}... (Score: {score:.2%} - Agent: {agent})")

        except Exception as e:
            # print(f"⚠️ Err on {item.get('id')}: {e}")
            continue

        if i % 10 == 0:
            print(f"🔄 Processed {i}/{len(items)} items... Found {len(verified_items)} verified.")

    # Save
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(verified_items, f, indent=2)

    print(f"🎉 DONE! Saved {len(verified_items)} verified items to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
