# 🎯 NEON DATABASE SETUP - COMPLETE SOLUTION

## ❌ Problem Identified

**Root Cause**: The `access_codes_bank` table had RLS (Row-Level Security) enabled but was **missing the INSERT policy**. This prevented inserting the 100 access codes into the database.

**Error you were seeing**: `new row violates row-level security policy for table "access_codes_bank"`

## ✅ Solution Implemented

### Files Created/Updated:

1. **`supabase/migrations/00_COMPLETE_NEON_SETUP.sql`** ⭐ **RUN THIS FIRST**
   - Complete setup script that creates all tables
   - Includes ALL RLS policies (INSERT, SELECT, UPDATE)
   - Inserts all 100 access codes
   - Includes verification checks

2. **`supabase/migrations/20260107_fix_rls_and_insert_codes.sql`**
   - Adds the missing INSERT policy
   - Inserts all access codes with conflict handling

3. **`supabase/migrations/20260107_add_access_codes_and_universities.sql`** (Updated)
   - Now includes the INSERT policy that was missing

4. **`NEON_DEPLOYMENT_FIX.md`**
   - Complete deployment guide
   - Step-by-step instructions
   - Verification queries
   - Troubleshooting tips

5. **`ACCESS_CODES_REFERENCE.md`**
   - List of all 100 codes
   - Testing instructions
   - Distribution strategies

6. **`supabase/migrations/verify_neon_setup.sql`**
   - Quick verification script to check everything is working

## 🚀 Quick Start (3 Steps)

### Step 1: Log into Neon Console
Go to: https://console.neon.tech

### Step 2: Run the Complete Setup Script
1. Open SQL Editor in Neon
2. Copy/paste the contents of: `supabase/migrations/00_COMPLETE_NEON_SETUP.sql`
3. Click "Run"
4. Check the output - you should see: `✓✓✓ DATABASE SETUP COMPLETE! ✓✓✓`

### Step 3: Insert Nigerian Universities
1. In the same SQL Editor
2. Copy/paste: `supabase/migrations/20260107_insert_nigerian_universities.sql`
3. Click "Run"

## 🧪 Verify Everything Works

Run this in Neon SQL Editor:
```sql
-- Should return 100
SELECT COUNT(*) FROM access_codes_bank;

-- Should show 3 policies: INSERT, SELECT, UPDATE
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'access_codes_bank';

-- Test a code
SELECT * FROM access_codes_bank WHERE code = 'TE3BWHHULREV';
```

## 🔧 What Was Fixed

### Before (Broken):
```sql
-- ❌ Missing INSERT policy
ALTER TABLE access_codes_bank ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can check code validity" -- SELECT only
CREATE POLICY "Service role can update codes"  -- UPDATE only
-- ❌ NO INSERT POLICY = Can't insert codes!
```

### After (Fixed):
```sql
-- ✅ Complete policy set
ALTER TABLE access_codes_bank ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can check code validity"  -- SELECT
CREATE POLICY "Service role can insert codes"   -- INSERT ✅ NEW!
CREATE POLICY "Service role can update codes"   -- UPDATE
```

## 📋 Complete Table Structure

### Tables Created:
1. ✅ `access_codes_bank` - 100 one-time use codes
2. ✅ `assessment_sessions` - User sessions and payment tracking
3. ✅ `universities_comprehensive` - University data with rankings
4. ✅ `university_course_offerings` - Course availability by university

### All RLS Policies:
- **access_codes_bank**: INSERT, SELECT, UPDATE (3 policies)
- **assessment_sessions**: INSERT, SELECT, UPDATE (3 policies)
- **universities_comprehensive**: SELECT (1 policy)
- **university_course_offerings**: SELECT (1 policy)

## 🎯 Testing Access Code API

After deployment to Vercel:

```bash
curl -X POST https://your-app.vercel.app/api/validate-access-code \
  -H "Content-Type: application/json" \
  -d '{"code":"TE3BWHHULREV","email":"test@example.com"}'
```

Expected response:
```json
{
  "valid": true,
  "expiresAt": "2026-01-08T12:00:00.000Z",
  "message": "Access code validated successfully"
}
```

## 🔍 Common Issues & Solutions

### Issue: "Permission denied for table access_codes_bank"
**Solution**: Run the `00_COMPLETE_NEON_SETUP.sql` script - RLS policies are missing

### Issue: "Relation 'access_codes_bank' does not exist"
**Solution**: Table not created - run the complete setup script

### Issue: "Duplicate key value violates unique constraint"
**Solution**: Already handled with `ON CONFLICT (code) DO NOTHING` - safe to rerun

### Issue: Still getting RLS errors after running scripts
**Solution**: Make sure you're using the service role or the policies allow your operation

## 🌐 Environment Variables

Update your `.env` and Vercel environment variables:

```env
# Neon Database
DATABASE_URL=postgresql://[user]:[password]@[host].neon.tech/[db]?sslmode=require

# Optional (if using Supabase frontend SDK)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Monitor Usage

Check code usage in Neon SQL Editor:
```sql
SELECT 
  COUNT(*) FILTER (WHERE is_used = false) as available,
  COUNT(*) FILTER (WHERE is_used = true) as used,
  COUNT(*) FILTER (WHERE is_used = true AND expires_at > NOW()) as active
FROM access_codes_bank;
```

## ✨ What's Next?

1. ✅ Database is set up
2. ✅ Access codes are inserted
3. ✅ RLS policies are correct
4. 🔄 Deploy to Vercel (if not already done)
5. 🔄 Update Vercel environment variables
6. 🧪 Test the access code validation
7. 🚀 Go live!

## 📞 Support

If you run into issues:
1. Check `NEON_DEPLOYMENT_FIX.md` for detailed troubleshooting
2. Run `verify_neon_setup.sql` to diagnose issues
3. Verify DATABASE_URL is correctly set in .env and Vercel

---

**Status**: ✅ READY TO DEPLOY

The missing INSERT policy was the blocker - now fixed!
