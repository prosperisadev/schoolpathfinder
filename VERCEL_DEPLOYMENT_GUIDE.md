# 🚀 Vercel Deployment Guide for PathFinder

This is a **step-by-step beginner's guide** to deploy your PathFinder app to Vercel.

---

## 📋 Prerequisites Checklist

Before you start, make sure you have:

1. ✅ A GitHub account (if you don't have one, create at https://github.com)
2. ✅ A Vercel account (create at https://vercel.com - you can sign up with GitHub)
3. ✅ Your Supabase DATABASE_URL (you already have this in your .env file)
4. ✅ Git installed on your computer

---

## 🔧 Step 1: Prepare Your Project

### 1.1 First, push your code to GitHub

Open your terminal in VS Code and run these commands one by one:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit - PathFinder app"
```

### 1.2 Create a GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `schoolpathfinder` (or any name you like)
3. Leave it as **Public** or select **Private** (your choice)
4. Click **"Create repository"**
5. **DON'T** check any of the initialization options

### 1.3 Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/schoolpathfinder.git

# Push your code
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Sign up/Login to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** (or "Login" if you have an account)
3. Select **"Continue with GitHub"** - this is the easiest way!
4. Authorize Vercel to access your GitHub

### 2.2 Import Your Project

1. After logging in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find `schoolpathfinder` and click **"Import"**

### 2.3 Configure Your Project Settings

On the configuration page, set the following:

| Setting | Value |
|---------|-------|
| **Project Name** | schoolpathfinder (or any name) |
| **Framework Preset** | Vite |
| **Root Directory** | ./ (leave empty) |
| **Build Command** | `pnpm build` |
| **Output Directory** | `dist` |
| **Install Command** | `pnpm install` |

### 2.4 ⚠️ IMPORTANT: Add Environment Variables

Click **"Environment Variables"** to expand the section, then add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Supabase connection string (copy from your .env file) |

**Example format:**
```
postgresql://postgres.nwejjwafzscmttqxbrlj:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

⚠️ **Make sure to add this!** Without it, your API won't work.

### 2.5 Deploy!

Click **"Deploy"**

Vercel will now:
1. Clone your repository
2. Install dependencies
3. Build your frontend
4. Deploy your API functions
5. Give you a live URL!

This usually takes 1-3 minutes.

---

## ✅ Step 3: Verify Your Deployment

### 3.1 Check Your Site

After deployment, Vercel will show you a URL like:
- `https://schoolpathfinder.vercel.app`
- or `https://schoolpathfinder-abc123.vercel.app`

Click the URL to open your live site!

### 3.2 Test the API

Open a new browser tab and go to:
```
https://YOUR-VERCEL-URL.vercel.app/api/health
```

You should see:
```json
{"status":"ok","timestamp":"...","message":"PathFinder API is running on Vercel"}
```

### 3.3 Test Access Codes

1. Go to your live site
2. Start the assessment
3. Enter an access code (from your 100 codes)
4. It should work!

---

## 🗃️ Step 4: Seed Your Database (ONE TIME ONLY)

If your access codes aren't working, you need to seed the database with the codes and universities.

### Option A: Run Locally (Recommended for first time)

In VS Code terminal:

```bash
# Make sure DATABASE_URL is in your .env file
pnpm db:push
pnpm db:seed
```

### Option B: Use Supabase SQL Editor

If the above doesn't work:

1. Go to your Supabase Dashboard
2. Click **"SQL Editor"** in the sidebar
3. Copy and paste the contents of `drizzle/0000_hot_joystick.sql`
4. Click **"Run"**
5. Then run `pnpm db:seed` locally

---

## 🔄 Step 5: Future Updates

Whenever you make changes to your code:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Your message describing the changes"

# Push to GitHub
git push
```

**Vercel will automatically redeploy!** 🎉

---

## 🔧 Troubleshooting

### Problem: "Access code invalid"

**Solution:** Your database needs to be seeded. Run:
```bash
pnpm db:seed
```

### Problem: "Build failed on Vercel"

**Solutions:**
1. Check the build logs on Vercel dashboard
2. Make sure all dependencies are in package.json
3. Try building locally first: `pnpm build`

### Problem: "API returns 500 error"

**Solutions:**
1. Check that DATABASE_URL is set in Vercel environment variables
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Make sure the DATABASE_URL is correct

### Problem: "CORS error"

**Solution:** This shouldn't happen with our setup. If it does, check that vercel.json has the CORS headers configured.

### Problem: "Function timeout"

**Solution:** Database queries might be slow. Check your Supabase connection pool settings.

---

## 📱 Custom Domain (Optional)

Want a custom domain like `pathfinder.com`?

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow the DNS configuration instructions

---

## 🎉 Congratulations!

Your PathFinder app is now live on the internet! 

**Your URLs:**
- **Frontend**: `https://your-project.vercel.app`
- **API Health**: `https://your-project.vercel.app/api/health`
- **API Endpoints**:
  - POST `/api/validate-access-code`
  - POST `/api/sessions`
  - GET `/api/sessions/[token]`
  - PATCH `/api/sessions/[email]/share`
  - GET `/api/universities`
  - GET `/api/universities/[courseId]`

---

## 📞 Quick Reference Commands

```bash
# Build locally
pnpm build

# Push database schema
pnpm db:push

# Seed database with access codes
pnpm db:seed

# Run development (local)
pnpm dev:full

# Deploy to Vercel (push to GitHub)
git add . && git commit -m "update" && git push
```

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Drizzle Docs: https://orm.drizzle.team/docs
- Supabase Docs: https://supabase.com/docs
