#!/bin/bash

# Test exactly what the frontend sends

EMAIL="frontend-simulation@example.com"

echo "Step 1: Create initial session (simulating assessment completion)"
curl -X POST https://schoolpathfinder.vercel.app/api/sessions \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"fullName\": \"Frontend Test User\",
    \"paymentStatus\": \"pending\"
  }"

echo -e "\n\nStep 2: Update with share modal data (simulating share button click)"
curl -X POST https://schoolpathfinder.vercel.app/api/sessions \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"fullName\": \"Frontend Test User\",
    \"shareToken\": \"frontend-test-token-123\",
    \"isShared\": true,
    \"shareCreatedAt\": \"2026-01-21T14:30:00.000Z\",
    \"assessmentData\": {
      \"profile\": {
        \"academicTrack\": \"science\",
        \"waecEstimate\": \"mostly_distinctions\",
        \"jambEstimate\": \"very_confident\",
        \"learningStyle\": \"fast_learner\",
        \"fullName\": \"Frontend Test User\"
      }
    },
    \"recommendations\": [
      {
        \"course\": {\"name\": \"Computer Science\"},
        \"fitScore\": 95
      }
    ],
    \"paymentStatus\": \"shared\"
  }"

echo -e "\n\nDone!"
