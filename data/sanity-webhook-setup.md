# Sanity Webhook Setup for Auto-Revalidation

This guide explains how to set up automatic content revalidation when you publish changes in Sanity.

## How It Works

```
Sanity Publish → Webhook → Vercel API → Revalidate Page → Fresh Content (instant)
```

## Setup Steps

### Step 1: Generate a Secret Token

Generate a random secret string. You can use:
- https://generate-secret.vercel.app/32
- Or run: `openssl rand -base64 32`

Example: `mySuperSecretToken123abc`

### Step 2: Add Secret to Vercel

1. Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name:** `SANITY_REVALIDATE_SECRET`
   - **Value:** Your secret token from Step 1
   - **Environment:** Production, Preview, Development (all)
3. Click Save
4. **Redeploy** the project for the variable to take effect

### Step 3: Create Webhook in Sanity

1. Go to [Sanity Manage](https://sanity.io/manage) → Your Project → API → Webhooks
2. Click **Create Webhook**
3. Fill in:
   - **Name:** `Vercel Revalidation`
   - **URL:** `https://divitmindspace.com/api/revalidate`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** Leave empty (triggers for all document types)
   - **Projection:** `{_type, slug}`
   - **Secret:** Your secret token from Step 1 (same as Vercel)
   - **HTTP method:** POST
   - **API version:** Latest
4. Click **Save**

### Step 4: Test the Webhook

1. Go to Sanity Studio
2. Edit any document (e.g., a career post)
3. Click **Publish**
4. Check the website - changes should appear within seconds

## Troubleshooting

### Changes not appearing?

1. **Check Vercel Logs:**
   - Vercel Dashboard → Your Project → Deployments → Functions → `/api/revalidate`
   - Look for errors or "Invalid signature"

2. **Verify Secret Matches:**
   - Sanity webhook secret must match `SANITY_REVALIDATE_SECRET` in Vercel

3. **Check Webhook Status:**
   - Sanity Manage → Webhooks → Check delivery status
   - Look for failed deliveries

4. **Redeploy After Adding Env Var:**
   - New environment variables require a redeploy to take effect

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Invalid signature | Secret mismatch | Ensure same secret in Vercel and Sanity |
| 500 Missing secret | Env var not set | Add `SANITY_REVALIDATE_SECRET` to Vercel |
| Webhook not triggering | Filter too restrictive | Remove filter or use `{_type, slug}` projection |

## Document Types Covered

The revalidation API automatically handles these document types:

| Document Type | Pages Revalidated |
|---------------|-------------------|
| `career` | /careers |
| `services` | /services, /services/[slug] |
| `post` | /blogs, /blogs/[slug] |
| `review` | / (homepage) |
| `gallery` | /gallery |
| `aboutUs` | /about-us |
| `specialist` | /about-us |
| `siteSettings` | /, /contact-us, /services, /about-us |
| `promowebsite` | / (homepage) |
| `mindGym` | /mind-gym |

## Need Help?

If webhook isn't working after following all steps:
1. Check Vercel function logs for errors
2. Verify the webhook URL is correct (no typos)
3. Ensure the project has been redeployed after adding the environment variable
