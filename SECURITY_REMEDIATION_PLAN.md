# Security Remediation Plan

**Status:** Review & Approval Pending — No changes applied yet

---

## Overview
This document outlines all security fixes needed. Once you approve, these changes will be implemented and pushed to your repo.

---

## 🔴 Critical Issues & Fixes

### Issue 1: Hardcoded Admin Password in Source Code
**File:** `src/app/pages/AdminPage.tsx` (Line 12)
**Problem:** Password is visible in source code and bundled JavaScript
**Risk:** Anyone can access admin panel

**Current:**
```typescript
const ADMIN_PASSWORD = 'ozel2026';
```

**After Fix:**
```typescript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';
```

**Action Required:**
- Add `VITE_ADMIN_PASSWORD=ozel2026` to your Vercel environment variables (Project Settings → Environment Variables)
- Password stays protected and not in source code

---

### Issue 2: Secrets Committed to Git Repository
**Files:** `.env`, `.env.local`
**Problem:** These contain:
- `VITE_SUPABASE_ANON_KEY` (JWT token)
- `VITE_CLOUDINARY_CLOUD_NAME` (public ID)
- `VITE_CLOUDINARY_UPLOAD_PRESET` (public preset)
- `VERCEL_OIDC_TOKEN` (deployment token)

**Risk:** Exposed in repo history, visible in deployed bundle

**Fix 1: Add to `.gitignore`**
Current file (incomplete):
```
# (no .env entries currently)
```

After Fix:
```
.env
.env.local
.env.*.local
```

**Fix 2: Remove from repo** (manual git command needed)
```bash
git rm --cached .env .env.local
git commit -m "Remove committed secrets from repo"
git push
```

**Action Required:**
- These files stay on your machine for local dev
- Vercel reads env vars from its dashboard, not `.env` files
- Add all env vars to Vercel's Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `VITE_CLOUDINARY_UPLOAD_PRESET`
  - `VITE_ADMIN_PASSWORD`

---

### Issue 3: Exposed Cloudinary Upload Preset
**File:** `src/lib/useProducts.ts` (used in AdminPage.tsx)
**Problem:** Preset is public; anyone can upload images to your account

**Current (in AdminPage.tsx):**
```typescript
formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
```

**Recommended Fix:**
Replace client-side Cloudinary upload with server-side signed upload or use authenticated endpoint.

**Quick Fix (less secure but immediate):**
- In Cloudinary dashboard: regenerate or restrict the upload preset to specific file types/sizes
- Consider adding upload authentication token

---

### Issue 4: dangerouslySetInnerHTML Usage
**File:** `src/app/components/ui/chart.tsx` (Line 83)
**Problem:** Injecting CSS styles via HTML; could be XSS vector if config is compromised

**Current:**
```typescript
<style
  dangerouslySetInnerHTML={{
    __html: Object.entries(THEMES)
      .map(([theme, prefix]) => `...`)
      .join("\n"),
  }}
/>
```

**After Fix:**
Create a proper CSS module or use `<style>` tag directly (no dangerouslySetInnerHTML)

```typescript
// chart.tsx - replace dangerouslySetInnerHTML with direct style
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  const styleContent = Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
    )
    .join("\n");

  return <style>{styleContent}</style>;
};
```

---

## 🟡 Medium Priority Issues

### Issue 5: Client-Side Supabase Operations
**Files:** `src/lib/useOrders.ts`, `src/lib/useProducts.ts`, `src/app/pages/CheckoutPage.tsx`
**Problem:** Direct database access from client using anon key — relies on Row-Level Security (RLS) policies

**Current State:** Acceptable IF Supabase RLS is properly configured
**Recommendation:** Verify Supabase policies are enforcing:
- Only admins can update order status
- Only users can view/create their own orders
- Products can be read by all but only edited by admin

**Action Required:**
- Review Supabase dashboard → Authentication → Policies for each table
- Ensure RLS is enabled and properly restricts access

---

### Issue 6: Missing Environment Variable Validation
**File:** `src/lib/supabase.ts`
**Problem:** No error if env vars are missing

**Current:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

**After Fix:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
```

---

## 🟢 Low Priority (Best Practices)

### Issue 7: Dependency Audit
**Recommendation:** Run `pnpm audit` to check for known vulnerabilities in dependencies

```bash
pnpm audit
```

---

## Implementation Sequence

### Phase 1: Code Changes (Safe, No Deployment Impact)
1. ✅ Update `AdminPage.tsx` to use `VITE_ADMIN_PASSWORD` env var
2. ✅ Update `supabase.ts` to validate env vars
3. ✅ Fix `chart.tsx` to remove dangerouslySetInnerHTML
4. ✅ Add `.env` and `.env.local` to `.gitignore`

### Phase 2: Git Cleanup (Important)
5. ✅ Remove `.env` and `.env.local` from git history
6. ✅ Push changes to repo → Vercel auto-rebuilds

### Phase 3: Vercel Configuration (Manual, Must Do Before/After Push)
7. Set env vars in Vercel dashboard:
   - `VITE_ADMIN_PASSWORD=ozel2026`
   - `VITE_SUPABASE_URL=...`
   - `VITE_SUPABASE_ANON_KEY=...`
   - `VITE_CLOUDINARY_CLOUD_NAME=...`
   - `VITE_CLOUDINARY_UPLOAD_PRESET=...`

### Phase 4: Key Rotation (Critical!)
8. Rotate exposed keys:
   - Generate new Supabase anon key (keep in Vercel env only)
   - Regenerate Cloudinary upload preset
   - Remove old keys from anywhere they appear

### Phase 5: Verification (Post-Deployment)
9. Test deployed site works with new env vars
10. Verify admin login works with new password mechanism

---

## Impact Assessment

| Change | Local Dev | Deployed Site | Breaking? |
|--------|-----------|---------------|-----------|
| Admin password to env var | ✅ Works if `.env.local` set | ✅ Works if Vercel env set | ❌ No |
| Remove `.env` from git | ✅ Still works locally | ✅ Vercel reads from dashboard | ❌ No |
| Fix dangerouslySetInnerHTML | ✅ No visual change | ✅ No visual change | ❌ No |
| Add env validation | ✅ Works | ✅ Catches missing vars | ❌ No |

**Conclusion:** All changes are safe and non-breaking. Once applied and pushed, Vercel will rebuild with the new env vars.

---

## Next Steps

1. **You review this plan** ← You are here
2. **Approve** → I implement all code changes
3. **You verify locally** → `pnpm dev` and test admin login
4. **You set Vercel env vars** → Go to Project Settings → Environment Variables
5. **You push to repo** → `git push` → Vercel auto-deploys
6. **You rotate keys** → Update Supabase and Cloudinary
7. **Test deployed site** → Verify admin panel works

---

## Questions Before Proceeding?

- Any env var names you want changed?
- Prefer different implementation for admin auth?
- Want me to also handle the Cloudinary upload security upgrade?

