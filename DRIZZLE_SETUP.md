# PathFinder - Drizzle ORM Setup Guide

## Quick Setup

### Step 1: Get your Supabase Database Password

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `nwejjwafzscmttqxbrlj`
3. Go to **Settings** → **Database**
4. Under **Connection string**, click **URI**
5. Copy the password (it's the part after `:` and before `@`)

### Step 2: Update .env File

Open `.env` file and replace `[YOUR-PASSWORD]` with your actual database password:

```env
DATABASE_URL="postgresql://postgres.nwejjwafzscmttqxbrlj:YOUR_ACTUAL_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Note**: The region might be different (e.g., `eu-central-1`, `us-east-1`). Check your Supabase dashboard for the correct connection string.

### Step 3: Push Schema to Database

```bash
pnpm db:push
```

This will create all the tables in your Supabase database.

### Step 4: Seed the Database

```bash
pnpm db:seed
```

This will insert:
- 100 access codes
- 11 Nigerian universities
- 40+ course offerings

### Step 5: Start the Application

Open two terminals:

**Terminal 1 - API Server:**
```bash
pnpm server
```

**Terminal 2 - Frontend:**
```bash
pnpm dev
```

Or run both together:
```bash
pnpm dev:all
```

### Step 6: Test Access Code

1. Go to http://localhost:8080
2. Complete the assessment
3. Enter access code: `TE3BWHHULREV`
4. Enter any email
5. You should see "Access Granted!"

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start frontend only |
| `pnpm server` | Start API server only |
| `pnpm dev:all` | Start both frontend and API |
| `pnpm db:generate` | Generate new migrations |
| `pnpm db:push` | Push schema directly to database |
| `pnpm db:migrate` | Run pending migrations |
| `pnpm db:seed` | Seed database with codes & universities |
| `pnpm db:studio` | Open Drizzle Studio (visual DB browser) |

---

## Troubleshooting

### "DATABASE_URL environment variable is not set"
Make sure you've updated the `.env` file with the correct connection string.

### "Connection refused" or "Network error"
1. Check your Supabase project is running
2. Verify the connection string is correct
3. Make sure your IP is not blocked by Supabase

### "Invalid access code"
Run `pnpm db:seed` to insert the access codes into the database.

### API Server not responding
Make sure the server is running on port 3001:
```bash
pnpm server
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Vite)                     │
│                   http://localhost:8080                 │
└─────────────────────────────────────────────────────────┘
                           │
                           │ HTTP Requests
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   API Server (Express)                  │
│                   http://localhost:3001                 │
│                                                         │
│  /api/validate-access-code   - Validate codes          │
│  /api/sessions               - Manage sessions         │
│  /api/universities           - Get universities        │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Drizzle ORM
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Supabase PostgreSQL                       │
│         (nwejjwafzscmttqxbrlj.supabase.co)             │
│                                                         │
│  Tables:                                                │
│  - access_codes_bank (100 codes)                       │
│  - assessment_sessions                                  │
│  - universities_comprehensive (11 universities)        │
│  - university_course_offerings (40+ offerings)         │
└─────────────────────────────────────────────────────────┘
```

---

## Files Created/Modified

### New Files
- `src/db/schema.ts` - Drizzle schema definitions
- `src/db/index.ts` - Client-side DB connection
- `src/db/server.ts` - Server-side DB connection
- `src/server/index.ts` - Express API server
- `src/lib/api.ts` - API client for frontend
- `src/scripts/seed.ts` - Database seeding script
- `drizzle.config.ts` - Drizzle Kit configuration
- `drizzle/0000_hot_joystick.sql` - Generated migration

### Modified Files
- `src/store/accessStore.ts` - Uses API instead of Supabase client
- `src/pages/Results.tsx` - Uses API instead of Supabase client
- `src/components/results/CourseCard.tsx` - Uses API for universities
- `src/vite-env.d.ts` - Added environment variable types
- `package.json` - Added Drizzle scripts
- `.env` - Added DATABASE_URL

---

## All 100 Access Codes

```
TE3BWHHULREV  YTPPQF0TUTR3  UF3FI11VRJJ4  MCF9CFPZIBW5
XGQWAR8AEWU8  WQYMLXBNEG7U  530EZ9K5H1ME  8LYET27JC5VM
RKWB3W0Y81L1  CEWDOEO0WXVB  PIOI4HNRC9B2  CQEZNCL7B13J
LAV3CNFDMEYZ  2UG1A6VXQLR4  TMQSCLD0YTGP  J7KF36SU4HGE
0UAIMXL61WEW  JMOG08V6BK8T  CZW4MGVOMXMY  1LX5BTPMRNQC
Q1NFT9HGOJ2J  MKBQ7IVA0DEQ  OXUIQRBH4EAL  6C217YN38G1P
VVYRLJB5KQVU  DKTRFZF7BB6B  MY93MG8TWZ6R  E45W2HCCDSX9
8VRR2HDW1ARJ  8P8B1IY5C5H3  9PKCCOQWSVNS  7CT2Z0NVFQKV
CJV8ZTY6ZKWV  DYAANJVL4GHB  LTRG4EBO9H3P  OJOX0S8KX83V
J0FAHPHIILCQ  GGKYZ7SR2YI8  9ZOV70KVLJ4J  1DQ23QMT7Y2I
BOAL5NAMV5I7  S9ISBBGYQUL7  K5TW3NXRHP3F  BB3PB1ZFQIEX
QURKDZEQNF5F  PP38VJKODGT5  3XDN27US2BUE  TQ7YM7UPK7UP
0YJC9AJTZ061  Y330LGPG85YX  DB16YFEVK2MS  2U3KP0PGLNJX
IC3VQ3M5WWE0  Y4KXJU435496  OSA6RPMSGFB0  NGMT0W0NEX21
NE261ICP1F5C  KFSH9XP23S5T  6XTZ4MTBY7WD  LYMRFL13DJNT
H04OKT2458F3  N45AG3FO08M8  WW4VZJ6N91PA  P08ZZWYEGC1D
MDMGNK41MBS2  DXYP3RZ5INL0  ZV9HP622IGNX  TXYH70F6SMN8
VA5A6W66CYE8  CU60HCSHUOQ5  ILG4PDZ3YATY  FDDN3GIN6PJW
ADCJ251350M6  OISG4AX8FDNV  Q96C2ZN5BW25  FKYN84YA4UWP
0LT1AU6DOJZ8  HPTHTCQQTBO2  SYOT1EA9G2A5  3J24Q3DNKNT6
PKH3VG3HMSFH  2YJYTM3SAHX6  MLVH2JU2K59F  JJ4XTX5VDX39
91406FFY5QYR  Y6143XSNTOYW  H075DFD7XGWZ  8KJI903EGXYW
BNBAY97C2340  CABY07B6KFYF  IFVUDGQOYUOC  R9ZU9C0WHOXE
OMWCX6OUZZA8  ILH44RU25ORR  VNK4LVA879V9  W3IJOULVWNK0
JOIH0N2YIYM0  HWP38QZ8V65O  YVAVECRLN8QN  22G6QBJG43B2
```

Each code grants 24-hour access.
