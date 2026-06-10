#!/bin/bash

echo "🚀 SEYRANTEPE NEST - NO-CLIP CASCADE PIPELINE INITIATED"

echo -e "\n--- STEP 0: DUAL-LANE HARVESTER (Categoric Vacuum) ---"
node dual_lane_harvester.js

echo -e "\n--- STEP 1: FAST ENRICHER (Liveness Check & JSON-LD Description) ---"
node fast_enricher.js

echo -e "\n--- STEP 2: AUDITOR (Text Filter & Spot Scam Check) ---"
node audit_listings.js

echo -e "\n--- STEP 3: VISUAL VERIFIER (SKIPPED BY USER REQUEST) ---"
echo "CLIP AI Model disabled. Bypassing directly to Dashboard..."

# Copy the audited data directly to the dashboard since CLIP is skipped
cp data/audited_data.json ../web-dashboard/public/verified_data.json

echo -e "\n🎉 PIPELINE COMPLETE! Data is ready in the Dashboard."
