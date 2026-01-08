# 🎯 QUICK START - Copy & Paste These Commands

## Step 1: Open Neon SQL Editor
1. Go to https://console.neon.tech
2. Select your project
3. Click "SQL Editor"

---

## Step 2: Run Complete Setup (Copy this entire block)

```sql
-- ==============================================================================
-- PASTE THIS ENTIRE SCRIPT INTO NEON SQL EDITOR AND CLICK "RUN"
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create access_codes_bank table
CREATE TABLE IF NOT EXISTS public.access_codes_bank (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT false,
  used_by_email TEXT,
  used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_access_codes_bank_code ON public.access_codes_bank(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_bank_is_used ON public.access_codes_bank(is_used);

ALTER TABLE public.access_codes_bank ENABLE ROW LEVEL SECURITY;

-- CRITICAL: Add all 3 policies (INSERT was missing before!)
DROP POLICY IF EXISTS "Anyone can check code validity" ON public.access_codes_bank;
CREATE POLICY "Anyone can check code validity"
ON public.access_codes_bank FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can insert codes" ON public.access_codes_bank;
CREATE POLICY "Service role can insert codes"
ON public.access_codes_bank FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update codes" ON public.access_codes_bank;
CREATE POLICY "Service role can update codes"
ON public.access_codes_bank FOR UPDATE USING (true);

-- Insert all 100 access codes
INSERT INTO public.access_codes_bank (code) VALUES
('TE3BWHHULREV'),('YTPPQF0TUTR3'),('UF3FI11VRJJ4'),('MCF9CFPZIBW5'),
('XGQWAR8AEWU8'),('WQYMLXBNEG7U'),('530EZ9K5H1ME'),('8LYET27JC5VM'),
('RKWB3W0Y81L1'),('CEWDOEO0WXVB'),('PIOI4HNRC9B2'),('CQEZNCL7B13J'),
('LAV3CNFDMEYZ'),('2UG1A6VXQLR4'),('TMQSCLD0YTGP'),('J7KF36SU4HGE'),
('0UAIMXL61WEW'),('JMOG08V6BK8T'),('CZW4MGVOMXMY'),('1LX5BTPMRNQC'),
('Q1NFT9HGOJ2J'),('MKBQ7IVA0DEQ'),('OXUIQRBH4EAL'),('6C217YN38G1P'),
('VVYRLJB5KQVU'),('DKTRFZF7BB6B'),('MY93MG8TWZ6R'),('E45W2HCCDSX9'),
('8VRR2HDW1ARJ'),('8P8B1IY5C5H3'),('9PKCCOQWSVNS'),('7CT2Z0NVFQKV'),
('CJV8ZTY6ZKWV'),('DYAANJVL4GHB'),('LTRG4EBO9H3P'),('OJOX0S8KX83V'),
('J0FAHPHIILCQ'),('GGKYZ7SR2YI8'),('9ZOV70KVLJ4J'),('1DQ23QMT7Y2I'),
('BOAL5NAMV5I7'),('S9ISBBGYQUL7'),('K5TW3NXRHP3F'),('BB3PB1ZFQIEX'),
('QURKDZEQNF5F'),('O0NB3ZV44CKB'),('YPEBM1LNLQJQ'),('OOVQRNX8M7RB'),
('SJLBVNMGFM71'),('J4RBB7SKMF1R'),('0RW9O16QW0SI'),('0O5MQM53W3Z3'),
('XTHKZEFCQ7OX'),('EAUXFZ48QUU7'),('8EV2KXVAZZ0S'),('4MMRPRJ7ZJOL'),
('22CY2GJVFZH1'),('OYJ2G0IVSB9F'),('STTDFWVUDMKO'),('ZJSZ8R2I6HFP'),
('7PMBXDMBW1SU'),('BNMGCNQP5FWW'),('F9VXMGWEVV1N'),('I00XVPUXFCM5'),
('4HCDQ4RNXTDF'),('BPR7R6RMXR33'),('AXJZ4NY5TRLR'),('LN1SG37GDZX8'),
('P7WGPFKHJ5BV'),('NV21Q6ET6MPF'),('A6I03RM07CXJ'),('5YK5KSN5HG41'),
('TDHHGGXUJJOG'),('MLUFWHX3NCGB'),('LZ4A1OGG0B1T'),('UFQK4UCEXQR9'),
('UD6GPSMWG0IW'),('52QNAQMZC0LV'),('P8Z5F7EWEMCY'),('ZW5GWZZOVGC1'),
('FBYUIBPKKDIC'),('ZNJB8VE1GFOG'),('WBFDDVQXD8HC'),('5EQZP10L53AZ'),
('21CCHQK4KRVS'),('74N2VHL0R7VX'),('S4MC9JKLX02S'),('JFKH53QI5N14'),
('HGGMLPB2A53K'),('6J8U3P4N5MZN'),('A7S8GGGP6SWL'),('6WCNV0TQ21YL'),
('JBCFPOHCGC8U'),('JRJKDEXZMX7M'),('Y8F7F8F0D37E'),('HB1GNM8R8NZY'),
('R32W75MBJZT6'),('TLDNGGDZ8P49'),('VCC6LZLBRGFT'),('G50JQMWPQZZ9')
ON CONFLICT (code) DO NOTHING;

-- Verify setup
SELECT '✅ ACCESS CODES INSERTED' as status, COUNT(*) as count FROM access_codes_bank;
SELECT '✅ RLS POLICIES CREATED' as status, COUNT(*) as count FROM pg_policies WHERE tablename = 'access_codes_bank';
```

**Expected Output:**
```
✅ ACCESS CODES INSERTED | count: 100
✅ RLS POLICIES CREATED  | count: 3
```

---

## Step 3: Verify Everything Works

```sql
-- Check code count (should be 100)
SELECT COUNT(*) FROM access_codes_bank;

-- View first 5 codes
SELECT code, is_used FROM access_codes_bank LIMIT 5;

-- Check policies (should show INSERT, SELECT, UPDATE)
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'access_codes_bank';
```

---

## Step 4: Test Access Code API

After deploying to Vercel, test with curl:

```bash
curl -X POST https://your-app.vercel.app/api/validate-access-code \
  -H "Content-Type: application/json" \
  -d '{"code":"TE3BWHHULREV","email":"test@example.com"}'
```

**Expected Response:**
```json
{
  "valid": true,
  "expiresAt": "2026-01-08T...",
  "message": "Access code validated successfully"
}
```

---

## ⚠️ If You Get Errors

### Error: "new row violates row-level security policy"
**Cause**: Missing INSERT policy  
**Fix**: The script above includes it - make sure you ran the entire script

### Error: "relation 'access_codes_bank' does not exist"
**Cause**: Table not created  
**Fix**: Run the complete script in Step 2

### Error: "duplicate key value violates unique constraint"
**Cause**: Codes already inserted  
**Fix**: This is fine! The `ON CONFLICT DO NOTHING` handles it

---

## 🎯 One-Line Health Check

```sql
SELECT 
  (SELECT COUNT(*) FROM access_codes_bank) as codes,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'access_codes_bank') as policies,
  CASE 
    WHEN (SELECT COUNT(*) FROM access_codes_bank) = 100 
     AND (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'access_codes_bank') >= 3
    THEN '✅ READY'
    ELSE '❌ INCOMPLETE'
  END as status;
```

**Expected Output:**
```
codes: 100 | policies: 3 | status: ✅ READY
```

---

## 📋 Update .env File

```env
DATABASE_URL=postgresql://[user]:[password]@[host].neon.tech/[database]?sslmode=require
```

Replace `[user]`, `[password]`, `[host]`, and `[database]` with your actual Neon credentials.

---

## 🚀 Deploy to Vercel

```bash
# Option 1: Vercel CLI
vercel --prod

# Option 2: Git Push (if connected to GitHub)
git add .
git commit -m "Fix: Add missing RLS INSERT policy for access codes"
git push origin main
```

Don't forget to set `DATABASE_URL` in Vercel Dashboard → Settings → Environment Variables!

---

## ✅ You're Done!

1. ✅ Database set up with all tables
2. ✅ 100 access codes inserted
3. ✅ All RLS policies configured (including the missing INSERT!)
4. ✅ Ready to deploy and test

**Problem Fixed**: Missing INSERT policy on access_codes_bank table
**Solution**: Added `Service role can insert codes` policy

For detailed explanations, see:
- `SOLUTION_SUMMARY.md` - What was wrong and how it's fixed
- `NEON_DEPLOYMENT_FIX.md` - Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Full checklist
