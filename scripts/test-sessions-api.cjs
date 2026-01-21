// Test the sessions API endpoint directly
const fetch = require("node-fetch");

async function testSessionsAPI() {
  console.log("🧪 Testing Sessions API Endpoint\n");
  
  const API_URL = "https://schoolpathfinder.vercel.app/api/sessions";
  
  const testPayload = {
    email: "test-share-modal@schoolpathfinder.com",
    fullName: "Test Share Modal User",
    shareToken: crypto.randomUUID(),
    isShared: true,
    shareCreatedAt: new Date().toISOString(),
    assessmentData: { 
      profile: {
        academicTrack: "science",
        waecEstimate: "mostly_distinctions",
        jambEstimate: "very_confident",
        learningStyle: "fast_learner"
      }
    },
    recommendations: [
      {
        course: { name: "Computer Science" },
        fitScore: 95
      }
    ],
    paymentStatus: "shared",
  };

  console.log("Sending request to:", API_URL);
  console.log("Payload:", JSON.stringify(testPayload, null, 2));
  console.log("\n" + "=".repeat(80) + "\n");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    console.log("Response status:", response.status, response.statusText);
    
    const data = await response.json();
    console.log("Response body:", JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("\n✅ SUCCESS! Session saved successfully!");
      console.log("Share Token:", data.shareToken);
      console.log("Share URL: https://schoolpathfinder.vercel.app/assessment/" + data.shareToken);
    } else {
      console.log("\n❌ FAILED! Error saving session");
      console.log("Error:", data.error || "Unknown error");
    }

  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error(error);
  }
}

testSessionsAPI();
