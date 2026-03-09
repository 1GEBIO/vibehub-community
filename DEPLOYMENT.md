# Deployment Guide for VibeHub

This guide details how to deploy VibeHub to either Vercel (Recommended for Next.js) or Netlify.

The application has been successfully built (`npm run build`) and is production-ready.

---

## 🚀 Option 1: Deploy to Vercel (Recommended)

Since VibeHub is built with Next.js (App Router), Vercel provides the fastest and most seamless deployment experience.

### Prerequisites
- A GitHub, GitLab, or Bitbucket account linked to [Vercel](https://vercel.com/new)
- Vercel CLI (optional, but convenient)

### Deployment Steps

**Method A: Via Vercel CLI (Fastest from Terminal)**
1. Install the Vercel CLI globally (if you haven't already):
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command in the project root:
   ```bash
   vercel
   ```
3. Follow the prompts:
   - *Set up and deploy?* `yes`
   - *Which scope doing you want to deploy to?* (Select your account)
   - *Link to existing project?* `no`
   - *What's your project's name?* `vibehub`
   - *In which directory is your code located?* `./`

4. To deploy to **Production**, run:
   ```bash
   vercel --prod
   ```

**Method B: Via GitHub Dashboard**
1. Push your code to a GitHub repository:
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. Leave the default build command (`npm run build`) and output directory (`.next`).
5. Click **Deploy**.

---

## 🌐 Option 2: Deploy to Netlify

Netlify is also a great option and fully supports Next.js.

### Prerequisites
- A [Netlify account](https://app.netlify.com/signup)
- Netlify CLI (optional)

### Deployment Steps

**Method A: Via Netlify CLI**
1. Install the Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```
2. Run the deployment command:
   ```bash
   netlify deploy
   ```
3. Follow the CLI prompts to link to a new or existing site. The Build Command is `npm run build` and the Publish Directory is `.next`.
4. Run a production deployment:
   ```bash
   netlify deploy --prod
   ```

**Method B: Via GitHub Dashboard**
1. Push your code to a GitHub repository.
2. Go to your [Netlify Dashboard](https://app.netlify.com/).
3. Click **Add new site** > **Import an existing project**.
4. Authorize with GitHub and select your repository.
5. Build settings:
   - Build Command: `npm run build`
   - Publish directory: `.next`
6. Click **Deploy Site**.

---

## 🔒 Environment Variables Configuration

Currently, the app primarily uses mock data (`src/lib/data.ts` and `src/lib/platforms.ts`), so strict environment variables for APIs are not immediately mandatory to load the UI.

However, to prepare the application for a real backend (e.g., Supabase, Clerk auth, real OAuth configs), you would need to set up an `.env.local` locally and set the corresponding variables in your Vercel/Netlify dashboard.

### Future Environment Variables Needed
When you move to real APIs, you will need to add these to the **Settings > Environment Variables** tab in your Vercel or Netlify dashboard:

```env
# Example Future Env Vars

# Database (e.g., Supabase, PostgreSQL)
DATABASE_URL="postgres://user:password@db.supabase.co:5432/postgres"

# Authentication (e.g., Clerk, NextAuth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# OAuth Apps (For the Platform Connections feature)
GITHUB_CLIENT_ID="xxx"
GITHUB_CLIENT_SECRET="xxx"
HUGGINGFACE_CLIENT_ID="xxx"
HUGGINGFACE_CLIENT_SECRET="xxx"

# External APIs
OPENAI_API_KEY="sk-..."  # If AI tag suggestions move to backend
```

## ✅ Post-Deployment Checks

1. **Routing check:** Ensure `/explore`, `/leaderboard`, `/submit`, and `/settings/connections` load correctly.
2. **Speed:** Experience the fast loading times enabled by the production Next.js build.
3. **Responsive UI:** Verify the CSS layout looks correct on mobile screens via your deployed URL.
