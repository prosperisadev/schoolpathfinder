/**
 * Seed Metrics Database
 * 
 * This script initializes the Redis database with current real metrics.
 * Run once to set starting values, then the daily cron job will keep them updated.
 */

const https = require('https');

// Your Upstash Redis credentials
const KV_REST_API_URL = "https://fancy-starfish-36894.upstash.io";
const KV_REST_API_TOKEN = "AZAeAAIncDIzZmZiMGEyNmIwZjM0ZjEwYjc4NDg5MzZmNGE5NmJiNnAyMzY4OTQ";

// Starting metrics (your current real data)
const INITIAL_VISITORS = 127;
const INITIAL_ASSESSMENTS = 34;

async function setRedisValue(key, value) {
  return new Promise((resolve, reject) => {
    const url = `${KV_REST_API_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`;
    
    https.get(url, {
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Set ${key} = ${value}`);
          resolve(data);
        } else {
          reject(new Error(`Failed to set ${key}: ${res.statusCode} ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function seedMetrics() {
  console.log('🌱 Seeding metrics database...\n');
  
  try {
    // Create metrics object matching LiveMetrics interface
    const now = new Date().toISOString();
    const metrics = {
      totalVisitors: INITIAL_VISITORS,
      totalAssessments: INITIAL_ASSESSMENTS,
      lastUpdated: now,
      hourKey: now.slice(0, 13) // "2026-01-12-18"
    };
    
    // Set the complete metrics object
    await setRedisValue('metrics:current', JSON.stringify(metrics));
    
    console.log('\n✅ Metrics seeded successfully!');
    console.log(`\nCurrent values:`);
    console.log(`  Students Guided: ${INITIAL_VISITORS}`);
    console.log(`  Career Decisions: ${INITIAL_ASSESSMENTS}`);
    console.log(`  Last Updated: ${now}`);
    console.log(`\nThe daily cron job will update these automatically.`);
    console.log(`\n🌐 Visit: https://schoolpathfinder.vercel.app`);
    console.log(`📊 API: https://schoolpathfinder.vercel.app/api/metrics`);
    
  } catch (error) {
    console.error('❌ Error seeding metrics:', error.message);
    process.exit(1);
  }
}

seedMetrics();
