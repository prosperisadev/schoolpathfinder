# Neon Database Deployment Guide - COMPLETE FIX

## Issue Identified
The `access_codes_bank` table had RLS enabled but was **missing the INSERT policy**, which prevented inserting the 100 access codes. This is now fixed.

## Steps to Deploy to Your Neon Database

### Option 1: Using Neon SQL Editor (Recommended)

1. **Log into Neon Console**: https://console.neon.tech
2. **Select your project**
3. **Go to SQL Editor**
4. **Run migrations in this exact order**:

#### Step 1: Run the base migration
```sql
-- Copy and paste the contents of:
-- supabase/migrations/20260107_add_access_codes_and_universities.sql
```

#### Step 2: Insert Nigerian universities
```sql
-- Copy and paste the contents of:
-- supabase/migrations/20260107_insert_nigerian_universities.sql
```

#### Step 3: Fix RLS and insert all 100 access codes
```sql
-- Copy and paste the contents of:
-- supabase/migrations/20260107_fix_rls_and_insert_codes.sql
```

### Option 2: Using psql Command Line

If you have the Neon connection string:

```bash
# Export your DATABASE_URL
export DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb"

# Run migrations in order
psql $DATABASE_URL -f supabase/migrations/20260107_add_access_codes_and_universities.sql
psql $DATABASE_URL -f supabase/migrations/20260107_insert_nigerian_universities.sql
psql $DATABASE_URL -f supabase/migrations/20260107_fix_rls_and_insert_codes.sql
```

### Option 3: Using Drizzle Push (Alternative)

If you prefer to use Drizzle:

```bash
# Make sure your .env has DATABASE_URL set to your Neon connection string
npm run db:push
```

Then manually run the insert scripts via SQL editor.

## Verification Steps

After running the migrations, verify everything is working:

### 1. Check Access Codes
```sql
-- Should return 100
SELECT COUNT(*) FROM access_codes_bank;

-- Should return all 100 codes
SELECT code, is_used FROM access_codes_bank ORDER BY created_at;
```

### 2. Check RLS Policies
```sql
-- Should show INSERT, SELECT, and UPDATE policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies 
WHERE tablename = 'access_codes_bank';
```

Expected policies:
- `Anyone can check code validity` (SELECT)
- `Service role can insert codes` (INSERT) ← **This was missing!**
- `Service role can update codes` (UPDATE)

### 3. Check Universities
```sql
-- Should return all Nigerian universities
SELECT COUNT(*) FROM universities_comprehensive;
SELECT name, country, ranking_score FROM universities_comprehensive LIMIT 10;
```

### 4. Test Access Code Validation

Test your API endpoint:
```bash
curl -X POST https://your-domain.vercel.app/api/validate-access-code \
  -H "Content-Type: application/json" \
  -d '{"code":"TE3BWHHULREV","email":"test@example.com"}'
```

Should return:
```json
{
  "valid": true,
  "expiresAt": "2026-01-08T...",
  "message": "Access code validated successfully"
}
```

## What Was Fixed

### 1. **Missing INSERT Policy** (CRITICAL)
- **Problem**: Table had RLS enabled but no INSERT policy
- **Error**: `new row violates row-level security policy`
- **Solution**: Added `Service role can insert codes` policy

### 2. **Complete RLS Policy Set**
All tables now have proper policies:
- `access_codes_bank`: INSERT, SELECT, UPDATE
- `universities_comprehensive`: SELECT
- `university_course_offerings`: SELECT
- `assessment_sessions`: INSERT, SELECT, UPDATE (with proper constraints)

### 3. **Idempotent Migrations**
All migrations use:
- `CREATE TABLE IF NOT EXISTS`
- `DROP POLICY IF EXISTS` before `CREATE POLICY`
- `ON CONFLICT DO NOTHING` for inserts

This means you can run them multiple times safely.

## Environment Variables Required

Make sure your `.env` file has:

```env
# Neon Database Connection
DATABASE_URL=postgresql://[user]:[password]@[host].neon.tech/[dbname]?sslmode=require

# Vercel Environment Variables (set these in Vercel dashboard)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Common Errors & Solutions

### Error: "permission denied for table access_codes_bank"
**Solution**: Run the RLS policy migrations. The table exists but policies are missing.

### Error: "new row violates row-level security policy"
**Solution**: This was the main issue - missing INSERT policy. Now fixed in `20260107_fix_rls_and_insert_codes.sql`

### Error: "relation 'access_codes_bank' does not exist"
**Solution**: Run `20260107_add_access_codes_and_universities.sql` first.

### Error: Duplicate key violations when inserting codes
**Solution**: Already handled with `ON CONFLICT (code) DO NOTHING`

## Migration File Order

Execute in this sequence:
1. ✅ `20260103113425_67278f4a-0e60-4c10-9f94-b116f229918c.sql` (assessment_sessions base)
2. ✅ `20260104120034_3da4f764-4e12-478c-bdf4-5732fade75a9.sql` (add columns)
3. ✅ `20260105072623_3666d27c-9c1f-492b-91a5-4c94d7ecb188.sql` (security updates)
4. ✅ `20260107_add_access_codes_and_universities.sql` (create new tables) ← **UPDATED**
5. ✅ `20260107_insert_nigerian_universities.sql` (seed universities)
6. ✅ `20260107_fix_rls_and_insert_codes.sql` (fix RLS + insert codes) ← **NEW**

## Next Steps

1. Run the migrations on your Neon database
2. Verify using the verification steps above
3. Test the access code validation API
4. Deploy your frontend to Vercel
5. Update Vercel environment variables with your Neon DATABASE_URL

## Support

If you encounter any issues:
1. Check the Neon SQL Editor for error messages
2. Verify RLS policies are created: `SELECT * FROM pg_policies;`
3. Check table existence: `\dt` in psql or use Neon's table browser
4. Ensure your DATABASE_URL in .env is correct
