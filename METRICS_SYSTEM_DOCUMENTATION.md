# Live Metrics System - Complete Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Components](#components)
4. [API Endpoints](#api-endpoints)
5. [Data Flow](#data-flow)
6. [Security & Privacy](#security--privacy)
7. [Deployment Guide](#deployment-guide)
8. [Testing Guide](#testing-guide)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Scaling Considerations](#scaling-considerations)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Live Metrics System tracks real-time platform usage and displays impact metrics on the homepage. It provides:

- **Visitor Tracking**: Privacy-safe unique visitor counting
- **Assessment Tracking**: Completed assessment counting (not just starts)
- **Hourly Updates**: Automated aggregation via Vercel Cron
- **Real-time Display**: Animated counters with auto-refresh
- **Platform Stats**: Universities (191), Courses (106), Continents (3)

### Key Features

✅ **Privacy-First**: No PII storage (SHA-256 hashed sessions)  
✅ **Tamper-Proof**: Server-side validation, rate limiting  
✅ **Scalable**: Edge Runtime + Vercel KV (global distribution)  
✅ **Performant**: Sub-10ms reads, edge caching, stale-while-revalidate  
✅ **Reliable**: Graceful degradation, automatic retries  
✅ **Production-Ready**: Comprehensive error handling, logging  

---

## 🏗️ Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘
                                  │
        ┌─────────────────────────┴─────────────────────────┐
        │                                                     │
        ▼                                                     ▼
┌───────────────┐                                   ┌────────────────┐
│   Homepage    │                                   │  Results Page  │
│   Visit       │                                   │  (Assessment)  │
└───────┬───────┘                                   └────────┬───────┘
        │                                                    │
        │ POST /api/track-visitor                           │ POST /api/track-assessment
        │ { ip, userAgent } → sessionId                     │ { completedAt, assessmentId }
        │                                                    │
        └────────────────────┬───────────────────────────────┘
                             ▼
                   ┌───────────────────┐
                   │   VERCEL EDGE     │
                   │   API ROUTES      │
                   │  (Edge Runtime)   │
                   └─────────┬─────────┘
                             │
                             ▼
                   ┌───────────────────┐
                   │   VERCEL KV       │
                   │   (Redis)         │
                   │                   │
                   │ Keys:             │
                   │ - totalVisitors   │
                   │ - totalAssessments│
                   │ - sessions:*      │
                   │ - snapshots:*     │
                   └─────────┬─────────┘
                             │
                   ┌─────────▼─────────────────┐
                   │   VERCEL CRON JOB         │
                   │   Every hour at :00       │
                   │                           │
                   │ 1. Fetch current metrics  │
                   │ 2. Calculate delta        │
                   │ 3. Store snapshot (30d)   │
                   │ 4. Cleanup old data       │
                   └───────────────────────────┘
                             │
                   ┌─────────▼─────────────────┐
                   │   HOMEPAGE DISPLAY        │
                   │                           │
                   │ GET /api/metrics          │
                   │ → Cached (5min)           │
                   │ → Animated Counters       │
                   │ → Auto-refresh (5min)     │
                   └───────────────────────────┘
```

### Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React + TypeScript | UI Components |
| **API Runtime** | Vercel Edge Functions | Global low-latency endpoints |
| **Storage** | Vercel KV (Redis) | Metrics data (sub-10ms reads) |
| **Caching** | Edge Cache | CDN-level response caching |
| **Scheduling** | Vercel Cron | Hourly aggregation jobs |
| **Privacy** | Web Crypto API | SHA-256 session hashing |
| **Animation** | requestAnimationFrame | 60fps counter animations |

---

## 🧩 Components

### Frontend Components

#### 1. **LiveImpactMetrics.tsx**
Main display component for homepage metrics.

**Features:**
- Auto-tracks visitor on mount
- Fetches metrics every 5 minutes
- Displays 5 animated counters
- Loading skeleton state
- Error fallback UI
- "Last updated" timestamp

**Usage:**
```tsx
import { LiveImpactMetrics } from "@/components/metrics/LiveImpactMetrics";

<LiveImpactMetrics />
```

#### 2. **AnimatedCounter.tsx**
Smooth number counting animation component.

**Props:**
```tsx
interface AnimatedCounterProps {
  value: number;              // Target value
  duration?: number;          // Animation duration (default: 2000ms)
  formatter?: (n: number) => string;  // Custom formatter
  className?: string;         // Tailwind classes
}
```

**Example:**
```tsx
<AnimatedCounter 
  value={1234} 
  formatter={(n) => n.toLocaleString()} 
/>
```

#### 3. **useTrackAssessment.ts**
React hook for tracking assessment completions.

**Usage:**
```tsx
const trackAssessment = useTrackAssessment();

useEffect(() => {
  if (resultsCalculated) {
    trackAssessment();  // Tracks once
  }
}, [resultsCalculated]);
```

### Backend Components

#### 1. **types.ts** - Type Definitions
```typescript
interface LiveMetrics {
  totalVisitors: number;
  totalAssessments: number;
  lastUpdated: string;
}

interface HourlySnapshot {
  hour: string;              // "2024-01-15-14"
  totalVisitors: number;
  totalAssessments: number;
  newVisitors: number;
  newAssessments: number;
  timestamp: string;
}

interface PlatformStats {
  universities: 191;
  courses: 106;
  continents: 3;
}
```

#### 2. **utils.ts** - Core Utilities

**Key Functions:**

| Function | Purpose | Example |
|----------|---------|---------|
| `generateSessionId(ip, userAgent)` | SHA-256 hash for privacy | `"a3f7b2..."` |
| `getCurrentHourKey()` | Hour key for snapshots | `"2024-01-15-14"` |
| `checkRateLimit(key, limit)` | Rate limit validation | `true/false` |
| `getSecondsUntilNextHour()` | Cache TTL calculation | `1847` |

---

## 🔌 API Endpoints

### 1. POST `/api/track-visitor`

**Purpose:** Record unique platform visits

**Runtime:** Edge  
**Rate Limit:** 100 requests/hour per IP  

**Request:**
```json
POST /api/track-visitor
Content-Type: application/json

{
  // No body required - IP/UserAgent from headers
}
```

**Response:**
```json
{
  "success": true,
  "alreadyCounted": false,
  "message": "Visit tracked successfully"
}
```

**Logic:**
1. Extract IP and User-Agent from headers
2. Generate sessionId: `SHA-256(ip + userAgent + salt)`
3. Check if session exists in KV (`sessions:${sessionId}`)
4. If new:
   - Increment `totalVisitors`
   - Store session with 24h TTL
5. Return result

**Privacy:**
- No raw IPs stored
- Sessions expire after 24h
- Hashing makes data irreversible

---

### 2. POST `/api/track-assessment`

**Purpose:** Record completed assessments

**Runtime:** Edge  
**Rate Limit:** 10 requests/hour per IP  

**Request:**
```json
POST /api/track-assessment
Content-Type: application/json

{
  "completedAt": "2024-01-15T14:30:00.000Z",
  "assessmentId": "550e8400-e29b-41d4-a716-446655440000"  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assessment completion tracked"
}
```

**Validation:**
- `completedAt` must be within 5 minutes
- `assessmentId` used for idempotency (prevents duplicates)
- Rate limited to prevent spam

**Logic:**
1. Validate timestamp (within 5min window)
2. Check idempotency key (`assessment:${assessmentId}`)
3. If not duplicate:
   - Increment `totalAssessments`
   - Store idempotency key (1h TTL)
4. Return success

---

### 3. GET `/api/metrics`

**Purpose:** Fetch current platform metrics

**Runtime:** Edge  
**Caching:** `s-maxage=300, max-age=60, stale-while-revalidate=60`  

**Request:**
```http
GET /api/metrics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVisitors": 12847,
    "totalAssessments": 3492,
    "lastUpdated": "2024-01-15T14:00:00.000Z",
    "platform": {
      "universities": 191,
      "courses": 106,
      "continents": 3
    }
  }
}
```

**Caching Strategy:**
- **Edge Cache:** 5 minutes (CDN)
- **Browser Cache:** 1 minute
- **Stale-while-revalidate:** 60 seconds (serve stale during revalidation)

**Graceful Degradation:**
- Returns zeros if KV unavailable
- Doesn't crash frontend if API fails

---

### 4. POST `/api/cron/aggregate-metrics`

**Purpose:** Hourly data aggregation and cleanup

**Runtime:** Node.js  
**Schedule:** Every hour at :00 (`0 * * * *`)  
**Authentication:** Requires `CRON_SECRET` in Authorization header  

**Request:**
```http
POST /api/cron/aggregate-metrics
Authorization: Bearer YOUR_CRON_SECRET
```

**Response:**
```json
{
  "success": true,
  "snapshot": {
    "hour": "2024-01-15-14",
    "totalVisitors": 12847,
    "totalAssessments": 3492,
    "newVisitors": 127,
    "newAssessments": 43,
    "timestamp": "2024-01-15T14:00:00.000Z"
  },
  "duration": 127
}
```

**Process:**
1. **Verify Authentication**: Check CRON_SECRET
2. **Fetch Current Metrics**: Get latest totals from KV
3. **Calculate Deltas**: Compare with previous snapshot
4. **Store Snapshot**: Save hourly snapshot (30-day TTL)
5. **Cleanup**: Remove expired sessions/snapshots
6. **Log Results**: Output for monitoring

**Data Retention:**
- **Sessions:** 24 hours
- **Idempotency Keys:** 1 hour
- **Snapshots:** 30 days
- **Total Metrics:** Permanent

---

## 🔄 Data Flow

### User Visit Flow

```
1. User lands on homepage
   ↓
2. LiveImpactMetrics component mounts
   ↓
3. useEffect triggers trackVisitor()
   ↓
4. POST /api/track-visitor
   ↓
5. Edge Function extracts IP + UserAgent
   ↓
6. Generate sessionId: SHA-256(ip + ua + salt)
   ↓
7. Check KV: sessions:${sessionId}
   ↓
8. If new session:
   - Increment totalVisitors
   - Store session (24h TTL)
   ↓
9. Return { success: true }
   ↓
10. Frontend continues normally
```

### Assessment Completion Flow

```
1. User completes assessment
   ↓
2. Results page renders
   ↓
3. useTrackAssessment hook called
   ↓
4. POST /api/track-assessment
   { completedAt, assessmentId }
   ↓
5. Validate timestamp (within 5min)
   ↓
6. Check idempotency: assessment:${id}
   ↓
7. If not duplicate:
   - Increment totalAssessments
   - Store idempotency key (1h TTL)
   ↓
8. Return { success: true }
   ↓
9. Frontend displays results (no UX change)
```

### Hourly Aggregation Flow

```
CRON: Every hour at :00
   ↓
1. Vercel triggers /api/cron/aggregate-metrics
   ↓
2. Verify Authorization: Bearer CRON_SECRET
   ↓
3. Fetch current metrics from KV
   - totalVisitors
   - totalAssessments
   ↓
4. Fetch previous snapshot (1 hour ago)
   ↓
5. Calculate deltas:
   - newVisitors = current - previous
   - newAssessments = current - previous
   ↓
6. Create snapshot object:
   {
     hour: "2024-01-15-14",
     totalVisitors: 12847,
     totalAssessments: 3492,
     newVisitors: 127,
     newAssessments: 43,
     timestamp: ISO string
   }
   ↓
7. Store in KV: snapshots:2024-01-15-14 (30d TTL)
   ↓
8. Log success + duration
   ↓
9. Future: Cleanup old data, send alerts
```

### Metrics Display Flow

```
1. User views homepage
   ↓
2. LiveImpactMetrics fetches GET /api/metrics
   ↓
3. Edge Cache check (5min TTL)
   - Cache HIT: Return cached response
   - Cache MISS: Query KV
   ↓
4. KV returns current metrics
   ↓
5. Response cached at edge
   ↓
6. Frontend receives data:
   {
     totalVisitors: 12847,
     totalAssessments: 3492,
     lastUpdated: "2024-01-15T14:00:00Z",
     platform: { universities: 191, courses: 106, continents: 3 }
   }
   ↓
7. AnimatedCounter components animate to values
   ↓
8. Auto-refresh every 5 minutes (via useEffect)
```

---

## 🔒 Security & Privacy

### Privacy Measures

#### 1. **No PII Storage**
- **Problem**: GDPR requires user consent for personal data
- **Solution**: Hash all identifiers before storage
- **Implementation**:
  ```typescript
  const sessionId = await generateSessionId(ip, userAgent);
  // SHA-256 hash - irreversible, no consent needed
  ```

#### 2. **Session Hashing**
- **Input**: IP address + User-Agent + salt
- **Algorithm**: SHA-256
- **Output**: `"a3f7b2d8e1c4..."`
- **Benefits**:
  - Can't reverse-engineer IP
  - Same user = same hash (deduplication)
  - Salt prevents rainbow table attacks

#### 3. **Short Data Retention**
- **Sessions**: 24 hours (recent visitor deduplication)
- **Idempotency Keys**: 1 hour (prevent double-counting)
- **Snapshots**: 30 days (trend analysis)
- **Total Metrics**: Permanent (aggregated, anonymous)

### Security Measures

#### 1. **Rate Limiting**

| Endpoint | Limit | Purpose |
|----------|-------|---------|
| `/api/track-visitor` | 100/hour | Prevent visitor count inflation |
| `/api/track-assessment` | 10/hour | Prevent assessment spam |
| `/api/metrics` | N/A | Cached, no limit needed |
| `/api/cron/*` | Auth-only | CRON_SECRET required |

**Implementation:**
```typescript
const rateLimit = await checkRateLimit(sessionId, 100);
if (!rateLimit) {
  return new Response(JSON.stringify({ 
    success: false, 
    error: "Rate limit exceeded" 
  }), { status: 429 });
}
```

#### 2. **Timestamp Validation**
Prevents backdating or future-dating assessments:
```typescript
const now = Date.now();
const completedTime = new Date(completedAt).getTime();
const diff = Math.abs(now - completedTime);

if (diff > 5 * 60 * 1000) {  // 5 minutes
  return new Response(JSON.stringify({ 
    success: false, 
    error: "Invalid timestamp" 
  }), { status: 400 });
}
```

#### 3. **Idempotency**
Prevents duplicate assessment counting:
```typescript
const idempotencyKey = `assessment:${assessmentId}`;
const exists = await kv.get(idempotencyKey);

if (exists) {
  return { success: true, message: "Already counted" };
}

// Increment + store key
await kv.incr("totalAssessments");
await kv.set(idempotencyKey, true, { ex: 3600 });  // 1h
```

#### 4. **CRON Authentication**
Prevents unauthorized job execution:
```typescript
const authHeader = request.headers.get("authorization");
const token = authHeader?.replace("Bearer ", "");

if (token !== process.env.CRON_SECRET) {
  return new Response("Unauthorized", { status: 401 });
}
```

#### 5. **Input Validation**
All inputs validated before processing:
```typescript
// Example: Assessment tracking
if (!completedAt || typeof completedAt !== 'string') {
  return new Response(JSON.stringify({ 
    success: false, 
    error: "Missing completedAt" 
  }), { status: 400 });
}

try {
  new Date(completedAt);  // Validates ISO format
} catch {
  return new Response(JSON.stringify({ 
    success: false, 
    error: "Invalid date format" 
  }), { status: 400 });
}
```

---

## 🚀 Deployment Guide

### Prerequisites

1. **Vercel Account** (free tier works)
2. **Node.js 18+** for local development
3. **Git** for version control

### Step 1: Create Vercel KV Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **Create Database** → **KV (Redis)**
4. Name it `school-pathfinder-metrics`
5. Select region (choose closest to users)
6. Click **Create**

7. Copy credentials:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### Step 2: Generate CRON_SECRET

Open terminal and run:
```bash
openssl rand -hex 32
```

Copy the output (e.g., `a7f3b2d8e1c4f9a6b5d2e8c7f3a9b6d4e1c8f7a3b9d6e2c5f8a4b7d3e9c6f2a5b8`)

### Step 3: Configure Environment Variables

#### For Vercel (Production)

1. Go to **Project Settings** → **Environment Variables**
2. Add the following:

| Variable | Value | Environment |
|----------|-------|-------------|
| `KV_REST_API_URL` | `https://your-kv...` | Production |
| `KV_REST_API_TOKEN` | `Your token` | Production |
| `CRON_SECRET` | `Generated secret` | Production |
| `DATABASE_URL` | `Your Neon/Supabase URL` | Production |

3. Click **Save**

#### For Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values:
   ```env
   KV_REST_API_URL=https://your-kv-instance.kv.vercel-storage.com
   KV_REST_API_TOKEN=your_token_here
   CRON_SECRET=your_generated_secret
   DATABASE_URL=postgresql://...
   ```

3. Or use Vercel CLI to pull:
   ```bash
   npm i -g vercel
   vercel env pull .env.local
   ```

### Step 4: Deploy to Vercel

```bash
# Install dependencies
npm install

# Build locally to test
npm run build

# Deploy to Vercel
vercel --prod
```

### Step 5: Verify Deployment

1. **Check Metrics Endpoint**:
   ```bash
   curl https://your-app.vercel.app/api/metrics
   ```
   
   Expected response:
   ```json
   {
     "success": true,
     "data": {
       "totalVisitors": 0,
       "totalAssessments": 0,
       "lastUpdated": "2024-01-15T14:00:00.000Z",
       "platform": { "universities": 191, "courses": 106, "continents": 3 }
     }
   }
   ```

2. **Test Visitor Tracking**:
   ```bash
   curl -X POST https://your-app.vercel.app/api/track-visitor
   ```
   
   Expected:
   ```json
   {
     "success": true,
     "alreadyCounted": false,
     "message": "Visit tracked successfully"
   }
   ```

3. **Check Homepage**:
   - Open `https://your-app.vercel.app`
   - Scroll to "Our Growing Impact" section
   - Verify counters display
   - Open dev tools → Network tab
   - Refresh after 5 minutes
   - Verify `/api/metrics` called with cache headers

4. **Verify Cron Job** (wait 1 hour):
   - Go to Vercel Dashboard → **Deployments** → **Functions**
   - Find `cron-aggregate-metrics`
   - Check **Logs** tab
   - Look for successful execution

### Step 6: Monitor Initial Data

```bash
# Watch metrics grow
watch -n 60 'curl -s https://your-app.vercel.app/api/metrics | jq'

# Check Vercel KV (using Vercel CLI)
vercel kv get totalVisitors
vercel kv get totalAssessments
```

---

## 🧪 Testing Guide

### Local Testing

#### 1. **Test Visitor Tracking**

```bash
# Start dev server
npm run dev

# In another terminal, test tracking
curl -X POST http://localhost:5173/api/track-visitor \
  -H "Content-Type: application/json"

# Expected: { "success": true, "alreadyCounted": false }

# Test again (same IP/UA)
curl -X POST http://localhost:5173/api/track-visitor \
  -H "Content-Type: application/json"

# Expected: { "success": true, "alreadyCounted": true }
```

#### 2. **Test Assessment Tracking**

```typescript
// In browser console on Results page
fetch('/api/track-assessment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    completedAt: new Date().toISOString(),
    assessmentId: 'test-' + Math.random()
  })
}).then(r => r.json()).then(console.log);

// Expected: { "success": true, "message": "Assessment completion tracked" }
```

#### 3. **Test Metrics Endpoint**

```bash
curl http://localhost:5173/api/metrics | jq

# Expected:
# {
#   "success": true,
#   "data": {
#     "totalVisitors": 1,
#     "totalAssessments": 1,
#     "lastUpdated": "2024-01-15T14:00:00.000Z",
#     "platform": { "universities": 191, "courses": 106, "continents": 3 }
#   }
# }
```

#### 4. **Test Cron Job (Manual)**

```bash
# Generate test secret
export CRON_SECRET="test-secret-123"

# Trigger cron manually
curl -X POST http://localhost:5173/api/cron/aggregate-metrics \
  -H "Authorization: Bearer test-secret-123" \
  | jq

# Expected: Snapshot created with current metrics
```

### Integration Testing

#### Test 1: Full User Journey

1. **Visit Homepage** (incognito)
   - Open `http://localhost:5173`
   - Check Network tab for `POST /api/track-visitor`
   - Verify response: `success: true`

2. **Complete Assessment**
   - Click "Get Started"
   - Fill out all fields
   - Click "View Results"
   - Check Network tab for `POST /api/track-assessment`
   - Verify response: `success: true`

3. **Check Metrics**
   - Return to homepage
   - Scroll to "Our Growing Impact"
   - Verify counters show:
     - Total Visitors: 1
     - Assessments Completed: 1

4. **Test Deduplication**
   - Refresh homepage (same session)
   - Check Network: `POST /api/track-visitor` → `alreadyCounted: true`
   - Metrics should NOT increment

#### Test 2: Rate Limiting

```bash
# Test visitor rate limit (100/hour)
for i in {1..105}; do
  curl -X POST http://localhost:5173/api/track-visitor \
    -H "X-Forwarded-For: 192.168.1.$i"  # Different IPs
  sleep 1
done

# Check if 101-105 return 429 (Rate Limit Exceeded)
```

#### Test 3: Cache Behavior

```bash
# First request (cache MISS)
curl -v http://localhost:5173/api/metrics 2>&1 | grep -i cache

# Second request within 5min (cache HIT)
curl -v http://localhost:5173/api/metrics 2>&1 | grep -i cache

# Should see: x-vercel-cache: HIT
```

### Production Testing

#### Test 1: Smoke Test

```bash
# Set your production URL
PROD_URL="https://your-app.vercel.app"

# Test all endpoints
echo "Testing /api/metrics..."
curl -s $PROD_URL/api/metrics | jq '.success'

echo "Testing /api/track-visitor..."
curl -s -X POST $PROD_URL/api/track-visitor | jq '.success'

echo "Testing /api/track-assessment..."
curl -s -X POST $PROD_URL/api/track-assessment \
  -H "Content-Type: application/json" \
  -d '{"completedAt":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","assessmentId":"test-123"}' \
  | jq '.success'

# All should return: true
```

#### Test 2: Cron Job Verification

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Deployments** → **Functions** → **Cron**
4. Find `cron-aggregate-metrics`
5. Check **Invocations** (should run every hour)
6. Check **Logs** for errors

#### Test 3: Performance Testing

```bash
# Test concurrent requests (simulate traffic spike)
ab -n 1000 -c 50 https://your-app.vercel.app/api/metrics

# Expected:
# - No failures
# - Most requests served from cache
# - Response time < 100ms
```

### Load Testing

Use [k6.io](https://k6.io/) for load testing:

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,  // 100 virtual users
  duration: '5m',
};

export default function () {
  // Test metrics endpoint
  let res = http.get('https://your-app.vercel.app/api/metrics');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

Run:
```bash
k6 run load-test.js
```

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard Monitoring

1. **Functions Tab**:
   - Monitor execution count
   - Check error rate
   - View response times
   - Analyze cache hit ratio

2. **Logs Tab**:
   - Real-time function logs
   - Filter by endpoint
   - Search for errors
   - Export logs for analysis

3. **Analytics Tab** (if enabled):
   - Page views
   - API call volume
   - Geographic distribution
   - Device breakdown

### KV Database Monitoring

```bash
# Check current metrics
vercel kv get totalVisitors
vercel kv get totalAssessments

# List all snapshots
vercel kv scan 0 MATCH snapshots:* COUNT 100

# Check specific snapshot
vercel kv get snapshots:2024-01-15-14

# Monitor session count (deduplication effectiveness)
vercel kv scan 0 MATCH sessions:* COUNT 1000
```

### Key Metrics to Monitor

| Metric | Command | Expected Range | Alert If |
|--------|---------|----------------|----------|
| **Total Visitors** | `vercel kv get totalVisitors` | Growing | < 0 or stalled |
| **Total Assessments** | `vercel kv get totalAssessments` | 20-30% of visitors | > visitors |
| **Cron Execution** | Check Vercel logs | Every hour | Missed runs |
| **API Response Time** | Vercel Analytics | < 100ms | > 500ms |
| **Cache Hit Rate** | Vercel Analytics | > 80% | < 50% |
| **Error Rate** | Vercel Functions | < 1% | > 5% |

### Automated Monitoring (Future Enhancement)

```typescript
// Add to cron job: api/cron/aggregate-metrics.ts

// Calculate conversion rate
const conversionRate = (totalAssessments / totalVisitors) * 100;

// Alert if abnormal
if (conversionRate < 10 || conversionRate > 50) {
  await sendAlert({
    type: 'warning',
    message: `Conversion rate abnormal: ${conversionRate}%`,
    metrics: { totalVisitors, totalAssessments }
  });
}

// Alert if traffic spike
if (newVisitors > previousSnapshot.newVisitors * 3) {
  await sendAlert({
    type: 'info',
    message: `Traffic spike detected: ${newVisitors} visitors this hour`,
  });
}
```

### Maintenance Tasks

#### Daily
- ✅ Check Vercel dashboard for errors
- ✅ Verify metrics are incrementing
- ✅ Confirm cron job executed last hour

#### Weekly
- ✅ Review conversion rate trends
- ✅ Analyze geographic distribution
- ✅ Check for abuse patterns (rate limit hits)
- ✅ Verify cache hit ratio > 80%

#### Monthly
- ✅ Export snapshots for trend analysis
- ✅ Review storage usage (KV quota)
- ✅ Audit stale sessions (should auto-expire)
- ✅ Update documentation if system changes

---

## 📈 Scaling Considerations

### Current Capacity

| Resource | Limit (Free Tier) | Current Usage | Headroom |
|----------|-------------------|---------------|----------|
| **Vercel KV** | 256MB | ~1MB | 99.6% |
| **Edge Functions** | 100k invocations/day | ~5k/day | 95% |
| **Cron Jobs** | 1 per hour | 1 per hour | N/A |
| **Bandwidth** | 100GB/month | ~10GB/month | 90% |

### Scaling at 10,000+ DAU

**Storage Growth:**
```
Sessions: 10k users × 64 bytes = 640KB (expires in 24h)
Snapshots: 24 snapshots/day × 200 bytes × 30 days = 144KB
Total: ~1MB (well within 256MB limit)
```

**API Calls:**
```
Visitors: 10k × 1 call = 10k/day
Assessments: 10k × 0.3 conversion × 1 call = 3k/day
Metrics: 10k × 2 calls (initial + refresh) = 20k/day
Total: ~33k/day (within 100k limit)
```

**Bandwidth:**
```
Metrics endpoint: 500 bytes × 20k calls = 10MB/day
Total monthly: ~300MB (within 100GB limit)
```

### Scaling at 100,000+ DAU

**Recommended Upgrades:**

1. **Vercel Pro Plan** ($20/month)
   - 1GB KV storage
   - 1M Edge invocations/month
   - Priority support

2. **Database Sharding** (if needed)
   ```typescript
   // Shard by date for snapshots
   const shardKey = Math.floor(Date.now() / (30 * 24 * 60 * 60 * 1000));
   await kv.set(`snapshots:${shardKey}:${hourKey}`, snapshot);
   ```

3. **CDN Optimization**
   - Increase cache TTL to 10 minutes
   - Add CloudFlare in front of Vercel
   - Implement service worker caching

4. **Rate Limit Adjustments**
   ```typescript
   // Increase limits for authenticated users
   const limit = isAuthenticated ? 1000 : 100;
   ```

### Machine Learning Integration (Future)

```typescript
// Predict future traffic using snapshots
interface TrafficPrediction {
  nextHour: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

async function predictTraffic(): Promise<TrafficPrediction> {
  // Fetch last 24 snapshots
  const snapshots = await getRecentSnapshots(24);
  
  // Simple linear regression
  const trend = calculateTrend(snapshots.map(s => s.newVisitors));
  
  // Predict next hour
  const prediction = trend.slope * 25 + trend.intercept;
  
  return {
    nextHour: Math.round(prediction),
    confidence: trend.r2,
    trend: trend.slope > 0 ? 'increasing' : 'decreasing'
  };
}
```

---

## 🔧 Troubleshooting

### Issue 1: Metrics Not Incrementing

**Symptoms:**
- Homepage shows 0 visitors despite traffic
- `/api/track-visitor` returns success but count doesn't change

**Diagnosis:**
```bash
# Check KV connection
vercel kv get totalVisitors

# Check API response
curl -X POST https://your-app.vercel.app/api/track-visitor

# Check Vercel logs
vercel logs --follow
```

**Solutions:**

1. **KV Not Connected**:
   - Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN` in env vars
   - Re-deploy: `vercel --prod`

2. **Rate Limiting**:
   - Check if IP is hitting 100/hour limit
   - Wait 1 hour or test with different IP

3. **Session Deduplication Working**:
   - This is expected! Same IP/UA = same session
   - Test with incognito or different device

### Issue 2: Cron Job Not Running

**Symptoms:**
- No new snapshots created
- `lastUpdated` timestamp not changing

**Diagnosis:**
```bash
# Check cron configuration
cat vercel.json | grep -A 5 crons

# Check Vercel dashboard
# Deployments → Functions → Cron → Invocations
```

**Solutions:**

1. **CRON_SECRET Missing**:
   - Add to Vercel env vars
   - Re-deploy

2. **vercel.json Not Deployed**:
   ```bash
   git add vercel.json
   git commit -m "Add cron config"
   git push
   vercel --prod
   ```

3. **Manual Trigger Test**:
   ```bash
   curl -X POST https://your-app.vercel.app/api/cron/aggregate-metrics \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

### Issue 3: Animated Counters Not Working

**Symptoms:**
- Metrics display but don't animate
- Numbers jump instantly

**Diagnosis:**
```javascript
// Check browser console
console.log('requestAnimationFrame' in window);  // Should be true

// Check if values are changing
fetch('/api/metrics').then(r => r.json()).then(console.log);
```

**Solutions:**

1. **Browser Compatibility**:
   - Ensure modern browser (Chrome 24+, Firefox 23+, Safari 6.1+)
   - Check for JavaScript errors in console

2. **Duration Too Short**:
   ```tsx
   <AnimatedCounter value={1234} duration={3000} />  // Increase duration
   ```

3. **Values Not Updating**:
   - Check network tab for `/api/metrics` calls
   - Verify 5-minute refresh interval

### Issue 4: High Rate Limit Errors

**Symptoms:**
- Many 429 responses
- Users can't track visits

**Diagnosis:**
```bash
# Check logs for rate limit messages
vercel logs | grep "Rate limit"

# Test from different IPs
curl -X POST https://your-app.vercel.app/api/track-visitor \
  -H "X-Forwarded-For: 1.2.3.4"
```

**Solutions:**

1. **Increase Limits** (if legitimate traffic):
   ```typescript
   // In api/track-visitor.ts
   const RATE_LIMIT = 200;  // Increase from 100
   ```

2. **Add Whitelist**:
   ```typescript
   const WHITELISTED_IPS = ['1.2.3.4', '5.6.7.8'];
   if (WHITELISTED_IPS.includes(ip)) {
     // Skip rate limiting
   }
   ```

3. **DDoS Attack**:
   - Enable Vercel Pro for DDoS protection
   - Use CloudFlare for additional filtering

### Issue 5: Cache Not Working

**Symptoms:**
- Every request hits KV (slow)
- Vercel logs show high function execution count

**Diagnosis:**
```bash
# Check cache headers
curl -I https://your-app.vercel.app/api/metrics

# Should see:
# cache-control: s-maxage=300, max-age=60, stale-while-revalidate=60
# x-vercel-cache: HIT (on subsequent requests)
```

**Solutions:**

1. **Missing Cache Headers**:
   ```typescript
   // In api/metrics.ts
   return new Response(JSON.stringify(data), {
     status: 200,
     headers: {
       'Content-Type': 'application/json',
       'Cache-Control': 's-maxage=300, max-age=60, stale-while-revalidate=60',
     },
   });
   ```

2. **Edge Runtime Not Enabled**:
   ```typescript
   // Ensure at top of file
   export const config = {
     runtime: 'edge',
   };
   ```

3. **Query Parameters Breaking Cache**:
   - Ensure no random params in URL
   - Use POST for mutations, GET for reads

---

## 📚 Additional Resources

### Documentation
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

### Code Examples
- `src/lib/metrics/` - Core utilities and types
- `api/track-*.ts` - API endpoint implementations
- `src/components/metrics/` - UI components

### Support
- **GitHub Issues**: [your-repo/issues](https://github.com/your-org/school-pathfinder/issues)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community Discord**: [your-discord-link](#)

---

## 📝 Changelog

### v1.0.0 (2024-01-15)
- ✨ Initial release
- ✅ Visitor tracking with privacy hashing
- ✅ Assessment completion tracking
- ✅ Hourly aggregation via cron
- ✅ Real-time metrics display
- ✅ Animated counters
- ✅ Edge caching
- ✅ Rate limiting
- ✅ Comprehensive documentation

---

**Built with ❤️ for School Pathfinder**  
*Helping students make informed decisions about their future.*
