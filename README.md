# Smart Market Scraper & Verifier

An automated pipeline designed to securely and efficiently scrape, verify, and filter product listings from online marketplaces. This tool addresses the challenge of identifying legitimate, accurately described, and reasonably priced items among thousands of raw listings, filtering out scams and misleading posts.

## 🚀 System Architecture (Pipeline)

The system consists of a multi-stage pipeline, utilizing various scraping and AI verification methods:

1.  **Console Scraper (Data Collection):** Collects raw listing data from marketplace platforms.
2.  **Visual Verification (CLIP Model):** The `scraper/verify_listings.py` script uses a PyTorch/Transformers-based **CLIP Model** to verify whether the listing's images actually match the described product (targeting a high confidence score).
3.  **Data Enrichment (Puppeteer Stealth):** The `scraper/enrich_data.js` script navigates to specific listing pages using Puppeteer with Stealth plugins and User-Agent rotation. It extracts the full description and the true publication date from JSON-LD or page metadata.
4.  **Audit & Safety (Rule-based Analysis):** The `scraper/audit_listings.js` script performs text and rule-based analysis on the enriched data.
    - **Scam Protection:** Flags listings that have unrealistically low prices, misuse keywords like "free" or "wholesale", or exhibit other common scam patterns.
5.  **Dashboard Hub:** A Next.js-based web dashboard (`web-dashboard`) that presents the verified and safe listings, allowing users to browse through pre-filtered, reliable data efficiently.

---

## 📁 Project Structure

### 1. Scraper & Data Pipeline (`/scraper`)
- The backend logic responsible for collecting data, enriching it via Puppeteer, and validating it.
- **Technologies:** Node.js, Puppeteer, `puppeteer-extra-plugin-stealth` (for bypassing basic bot detection).
- **Python ML Pipeline:** Includes the PyTorch/Transformers CLIP model for image validation (`verify_listings.py`).

### 2. Dashboard (`/web-dashboard`)
- A frontend interface to view the processed and safe listings.
- **Technologies:** Next.js (App Router), React, Tailwind CSS.
- **Features:** Smart sorting, strict filtering for audited items (Safe Mode).

---

## 🛠️ Setup & Execution

### Scraper & ML Model:
Install Node.js and Python dependencies in their respective directories:

```bash
cd scraper
npm install

# Python requirements (for verify_listings.py, etc.)
pip install torch transformers Pillow requests
```

To run the pipeline sequentially (Enrichment, Auditing, Verification):
```bash
node enrich_data.js
node audit_listings.js
python3 verify_listings.py
```

### Dashboard:
To run the web dashboard:
```bash
cd web-dashboard
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.
