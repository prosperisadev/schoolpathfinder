/**
 * K6 LOAD TEST FOR ASSESSMENT RESULT RECORDING
 * 
 * Purpose: Validate that the platform can handle 1000 assessments/day
 * 
 * Test Scenarios:
 * 1. Steady state: 1-2 req/sec (simulates 1000/day evenly distributed)
 * 2. Peak burst: 10-20 concurrent (simulates lunch hour rush)
 * 3. Spike test: 50+ concurrent (stress test)
 * 
 * Usage:
 *   npm install -g k6
 *   k6 run scripts/load-test-assessments.js
 * 
 * What to watch:
 * - Response times < 500ms (p95)
 * - Success rate > 99%
 * - No database connection errors
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const assessmentDuration = new Trend('assessment_duration');

// Test configuration
export const options = {
  stages: [
    // Warmup: 5 users for 30 seconds
    { duration: '30s', target: 5 },
    
    // Normal load: 10 users for 2 minutes (simulates ~1000/day)
    { duration: '2m', target: 10 },
    
    // Peak load: 20 users for 1 minute (simulates burst traffic)
    { duration: '1m', target: 20 },
    
    // Spike test: 50 users for 30 seconds (stress test)
    { duration: '30s', target: 50 },
    
    // Cool down: 5 users for 30 seconds
    { duration: '30s', target: 5 },
    
    // Ramp down
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    // 95% of requests should be below 500ms
    http_req_duration: ['p(95)<500'],
    // Error rate should be below 1%
    errors: ['rate<0.01'],
    // Success rate should be above 99%
    'http_req_failed': ['rate<0.01'],
  },
};

// Base URL (update this for production testing)
const BASE_URL = __ENV.BASE_URL || 'http://localhost:8081';

// Sample test data generator
function generateTestAssessment() {
  const userId = Math.floor(Math.random() * 10000);
  const email = `test-user-${userId}@example.com`;
  const fullName = `Test User ${userId}`;
  
  const academicTracks = ['science', 'art', 'commercial'];
  const waecEstimates = ['A-B', 'B-C', 'C-D'];
  const jambEstimates = ['250-300', '200-250', '150-200'];
  const learningStyles = ['visual', 'auditory', 'kinesthetic', 'reading'];
  
  return {
    email,
    fullName,
    academicTrack: academicTracks[Math.floor(Math.random() * academicTracks.length)],
    waecEstimate: waecEstimates[Math.floor(Math.random() * waecEstimates.length)],
    jambEstimate: jambEstimates[Math.floor(Math.random() * jambEstimates.length)],
    learningStyle: learningStyles[Math.floor(Math.random() * learningStyles.length)],
    interests: {
      technology: Math.floor(Math.random() * 5) + 1,
      health: Math.floor(Math.random() * 5) + 1,
      business: Math.floor(Math.random() * 5) + 1,
      education: Math.floor(Math.random() * 5) + 1,
      engineering: Math.floor(Math.random() * 5) + 1,
    },
    personality: {
      analyticalVsCreative: Math.random() * 2 - 1,
      structuredVsFlexible: Math.random() * 2 - 1,
      peopleVsTask: Math.random() * 2 - 1,
      riskVsStability: Math.random() * 2 - 1,
    },
    preferences: {
      budget: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      location: ['nigeria', 'africa', 'global'][Math.floor(Math.random() * 3)],
    },
    recommendations: [
      {
        course: { id: 'cs', title: 'Computer Science' },
        fitScore: 85,
        interestScore: 90,
        personalityScore: 80,
      },
    ],
    sessionId: `session-${Date.now()}-${userId}`,
    durationSeconds: Math.floor(Math.random() * 300) + 60,
    hasUnlocked: Math.random() > 0.5,
  };
}

export default function () {
  // Generate test assessment data
  const assessment = generateTestAssessment();
  
  // Record start time
  const startTime = Date.now();
  
  // Make request to save assessment result
  const response = http.post(
    `${BASE_URL}/api/save-assessment-result`,
    JSON.stringify(assessment),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  // Record duration
  assessmentDuration.add(Date.now() - startTime);
  
  // Check response
  const success = check(response, {
    'status is 201': (r) => r.status === 201,
    'response has success': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.success === true;
      } catch {
        return false;
      }
    },
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  // Record errors
  errorRate.add(!success);
  
  if (!success) {
    console.error(`Failed: ${response.status} - ${response.body}`);
  }
  
  // Think time (simulate users taking time between actions)
  sleep(Math.random() * 2 + 1); // 1-3 seconds
}

/**
 * INTERPRETING RESULTS
 * 
 * Good indicators:
 * - http_req_duration p95 < 500ms
 * - http_req_failed < 1%
 * - errors < 1%
 * - No database connection errors in logs
 * 
 * Warning signs:
 * - Response times increasing over time (memory leak?)
 * - Error rate spiking during peak (hitting limits)
 * - Database connection errors (connection pool exhausted)
 * 
 * What to do if test fails:
 * 1. Check Neon dashboard for connection count
 * 2. Check Vercel logs for function errors/timeouts
 * 3. Verify DATABASE_URL is set correctly
 * 4. Consider adding retries for transient errors
 * 5. Consider batching writes or using a queue
 */
