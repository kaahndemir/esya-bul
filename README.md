# Smart Market Scraper & Verifier

A marketplace listing pipeline that combines Node.js data collection, rule-based filtering, and Python CLIP image classification to help review product listings. Its filters and model scores are heuristics, not guarantees of seller legitimacy or product condition.

Project maintainer: [Kaan Demir](https://kaahn.com/hakkimda/) (Oğuz Kaan Demir), software developer in Istanbul.

Demo: [Seyrantepe listing dashboard](https://seyrantepe.netlify.app/).

## 🚀 System Architecture (Pipeline)

The system consists of a multi-stage pipeline, utilizing various scraping and AI verification methods:

1.  **Console Scraper (Data Collection):** Collects raw listing data from marketplace platforms.
2.  **Visual Classification (CLIP Model):** The `scraper/verify_listings.py` script uses a PyTorch/Transformers-based **CLIP Model** to compare listing images with predefined product-category prompts.
3.  **Data Enrichment (Puppeteer Stealth):** The `scraper/enrich_data.js` script navigates to specific listing pages using Puppeteer with Stealth plugins and User-Agent rotation. It extracts the full description and the true publication date from JSON-LD or page metadata.
4.  **Audit & Safety (Rule-based Analysis):** The `scraper/audit_listings.js` script performs text and rule-based analysis on the enriched data.
    - **Review Flags:** Filters listings using configured text, price, and category rules; the output still requires human review.
5.  **Dashboard Hub:** The linked dashboard presents filtered listings. Its source is referenced by the `web-dashboard` gitlink; see the availability note below.

---

## 📁 Project Structure

### 1. Scraper & Data Pipeline (`/scraper`)
- The backend logic responsible for collecting data, enriching it via Puppeteer, and validating it.
- **Technologies:** Node.js, Puppeteer, `puppeteer-extra-plugin-stealth` (for bypassing basic bot detection).
- **Python ML Pipeline:** Includes the PyTorch/Transformers CLIP model for image validation (`verify_listings.py`).

### 2. Dashboard (`/web-dashboard`)
- A frontend interface to view processed listings; filtering does not establish that a listing is safe.
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
The repository currently records `web-dashboard` as a gitlink without a `.gitmodules` entry. A fresh clone therefore does not include the dashboard source, and the commands below require a separately available dashboard checkout. The hosted demo is linked above.

To run the web dashboard:
```bash
cd web-dashboard
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.
