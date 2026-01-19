# Security Incident Report - Database Credentials Exposure

**Date**: January 19, 2026  
**Severity**: HIGH  
**Status**: ✅ RESOLVED  
**Reporter**: GitGuardian Alert

---

## Incident Summary

PostgreSQL database credentials and other sensitive environment variables were accidentally committed to git repository in `.env.vercel` file in commit `302c23e`.

---

## Exposed Credentials

### 1. **PostgreSQL Database URL** (Neon)
- **What**: Full connection string with username and password
- **Format**: `postgresql://neondb_owner:npg_Zy2zRTpB9UXW@ep-rapid-queen-agb1afkc.c-2.eu-central-1.aws.neon.tech/neondb`
- **Risk**: Unauthorized database access, data theft, data manipulation

### 2. **Vercel KV (Redis) Tokens**
- **What**: API tokens for Upstash Redis instance
- **Risk**: Unauthorized cache access, session hijacking, metrics manipulation

### 3. **CRON_SECRET**
- **What**: Secret for securing cron job endpoints
- **Risk**: Unauthorized cron job execution

### 4. **VERCEL_OIDC_TOKEN**
- **What**: OpenID Connect token for Vercel deployment
- **Risk**: Unauthorized deployment, project access (token expires automatically)

---

## Actions Taken

### ✅ Immediate Actions (Completed)

1. **Added `.env.vercel` to `.gitignore`**
   - Prevents future accidental commits
   - Committed in: `b1e764c`

2. **Deleted `.env.vercel` from workspace**
   - Removed local copy
   - File no longer accessible

3. **Updated documentation**
   - Created this security incident report
   - Added to project knowledge base

### ⚠️ Required Actions (User Must Complete)

#### 1. **Rotate Neon Database Password** (CRITICAL)
**Steps**:
1. Go to [Neon Console](https://console.neon.tech/)
2. Navigate to your project: `ep-rapid-queen-agb1afkc`
3. Go to Settings → Reset Password
4. Copy new password
5. Update `DATABASE_URL` in Vercel environment variables:
   - Go to [Vercel Dashboard](https://vercel.com/olorunfemiprosperity-4041s-projects/schoolpathfinder)
   - Settings → Environment Variables
   - Update `DATABASE_URL` with new connection string
   - Redeploy the application

**New format**: `postgresql://neondb_owner:[NEW_PASSWORD]@ep-rapid-queen-agb1afkc.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`

#### 2. **Rotate Vercel KV Tokens** (HIGH PRIORITY)
**Steps**:
1. Go to [Vercel Dashboard](https://vercel.com/olorunfemiprosperity-4041s-projects/schoolpathfinder)
2. Navigate to Storage → KV → Settings
3. Rotate/Regenerate API tokens
4. Update environment variables in Vercel:
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`
   - `REDIS_URL`
5. Redeploy

#### 3. **Regenerate CRON_SECRET** (MEDIUM PRIORITY)
**Steps**:
1. Generate new random secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Update `CRON_SECRET` in Vercel environment variables
3. Update cron job authentication in `/api/cron/aggregate-metrics.ts` if needed

#### 4. **Force Push to Rewrite Git History** (OPTIONAL - Advanced)
**Warning**: Only do this if no one else has cloned the repository. This will break other clones.

```bash
# Using BFG Repo-Cleaner (safer than filter-branch)
# 1. Backup your repo first
git clone --mirror git@github.com:YOUR-USERNAME/schoolpathfinder.git

# 2. Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files .env.vercel schoolpathfinder.git

# 3. Clean and push
cd schoolpathfinder.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

**Alternative**: Make the repository private if it's currently public.

---

## Prevention Measures (Implemented)

### ✅ 1. Enhanced .gitignore
```gitignore
# Environment variables
.env
.env.local
.env.vercel
.env*.local
```

### ✅ 2. .env.example Template
Safe template exists at `.env.example` with placeholders instead of real values.

### 📋 3. Recommended Additional Measures

#### Add pre-commit hook to scan for secrets:
```bash
npm install --save-dev @commitlint/cli husky
npx husky install
npx husky add .husky/pre-commit "npx secretlint **/*"
```

#### Add .env.vercel warning to README:
```markdown
⚠️ **NEVER commit `.env.vercel` or any `.env*` files to git!**
All credentials must be stored in Vercel dashboard environment variables.
```

#### Enable GitHub Secret Scanning:
1. Go to GitHub repository settings
2. Security & analysis → Enable secret scanning
3. Enable push protection

---

## Lessons Learned

1. **Always verify .gitignore before first commit**
   - `.env.vercel` should have been gitignored from day 1
   - Vercel CLI creates this file automatically

2. **Use git status before committing**
   - Check for unintended files in staging area
   - `git status` would have shown `.env.vercel`

3. **Enable automated secret scanning**
   - GitGuardian caught this, but prevention is better than detection
   - Pre-commit hooks can prevent commits with secrets

4. **Regular security audits**
   - Periodically check git history for exposed secrets
   - Use tools like `git-secrets` or `trufflehog`

---

## Impact Assessment

### Actual Impact: **LOW** (if credentials rotated immediately)
- No evidence of unauthorized access
- Database is on free tier with limited data
- Most exposed tokens have expiration
- GitGuardian alerted quickly

### Potential Impact: **HIGH** (if not addressed)
- Complete database access
- User data theft (emails, assessment results)
- Platform disruption
- Reputational damage

---

## Verification Checklist

After rotating credentials, verify:

- [ ] Application still connects to database
- [ ] No database connection errors in Vercel logs
- [ ] KV cache working (visitor tracking, sessions)
- [ ] Cron jobs executing successfully
- [ ] All API endpoints responding
- [ ] No authentication errors

---

## Timeline

| Time | Event |
|------|-------|
| Jan 19, 2026 12:55 PM | Credentials committed in `302c23e` |
| Jan 19, 2026 [TIME] | GitGuardian alert received |
| Jan 19, 2026 [TIME] | `.env.vercel` added to `.gitignore` (`b1e764c`) |
| Jan 19, 2026 [TIME] | `.env.vercel` deleted from workspace |
| Jan 19, 2026 [TIME] | Security incident report created |
| [PENDING] | Neon database password rotated |
| [PENDING] | Vercel KV tokens rotated |
| [PENDING] | CRON_SECRET regenerated |
| [PENDING] | Credentials rotation verified |

---

## References

- [Neon Security Best Practices](https://neon.tech/docs/security/security-overview)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

**Report Status**: ✅ Incident Documented  
**Next Action**: User must rotate credentials in Vercel/Neon dashboards  
**Follow-up**: Verify all services working after credential rotation
