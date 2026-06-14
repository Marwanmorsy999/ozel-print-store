# Detailed Code Changes (Before → After)

This document shows the exact changes that will be made to your files.

---

## File 1: `src/app/pages/AdminPage.tsx`

### Change: Move hardcoded password to environment variable

**Lines 1-15 BEFORE:**
```typescript
import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, DollarSign, Lock, CheckCircle, Printer, Box, Truck, ShoppingBag, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useOrders, Order } from '../../lib/useOrders';
import { useProducts } from '../../lib/useProducts';

const ADMIN_PASSWORD = 'ozel2026';

const statusConfig = {
  pending: { label: 'Pending', icon: Box, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
```

**Lines 1-15 AFTER:**
```typescript
import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, DollarSign, Lock, CheckCircle, Printer, Box, Truck, ShoppingBag, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useOrders, Order } from '../../lib/useOrders';
import { useProducts } from '../../lib/useProducts';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

const statusConfig = {
  pending: { label: 'Pending', icon: Box, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
```

**Summary:** Line 12 changes from hardcoded string to environment variable.

---

## File 2: `src/lib/supabase.ts`

### Change: Add validation for missing environment variables

**BEFORE:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**AFTER:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Summary:** Added validation to catch missing env vars early.

---

## File 3: `src/app/components/ui/chart.tsx`

### Change: Remove dangerouslySetInnerHTML, use safe style tag

**Lines 70-85 BEFORE:**
```typescript
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
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
          .join("\n"),
      }}
    />
  );
};
```

**Lines 70-98 AFTER:**
```typescript
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

**Summary:** Removed `dangerouslySetInnerHTML` wrapper; style content is now passed directly (safe because it's computed from trusted config).

---

## File 4: `.gitignore`

### Change: Add environment files

**BEFORE:**
```
(no .env entries currently)
```

**AFTER:**
```
# Environment variables
.env
.env.local
.env.*.local
```

**Summary:** Prevents `.env` files from being committed to git.

---

## Manual Git Cleanup Command

After the code changes are applied, run this to remove the secrets from git history:

```bash
# Remove .env and .env.local from git (but keep locally)
git rm --cached .env .env.local

# Commit the removal
git commit -m "Remove committed environment files and secrets from git history"

# Push to repo
git push
```

---

## Vercel Environment Variables to Add

After pushing to git, add these to Vercel:

**Project Settings → Environment Variables**

| Name | Value | Environments |
|------|-------|---|
| `VITE_ADMIN_PASSWORD` | `ozel2026` | Production, Preview, Development |
| `VITE_SUPABASE_URL` | `https://rmocqpytnepbkusbwpcd.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `[your current anon key]` | Production, Preview, Development |
| `VITE_CLOUDINARY_CLOUD_NAME` | `dnggmrgmu` | Production, Preview, Development |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | `q3al6e3i` | Production, Preview, Development |

**Note:** After Vercel redeploys, rotate these keys in their respective dashboards (Supabase, Cloudinary).

---

## Testing Checklist After Implementation

- [ ] Run `pnpm dev` locally — site loads without errors
- [ ] Admin login works with password from `.env.local`
- [ ] Products page loads and displays data
- [ ] Orders page accessible and displays orders
- [ ] Image upload works (Cloudinary integration)
- [ ] After push to git: Vercel deploys successfully
- [ ] After Vercel redeploys: Admin login works with password from Vercel env
- [ ] No console errors in browser

---

## Summary of All Changes

| File | Type | Changes |
|------|------|---------|
| `src/app/pages/AdminPage.tsx` | Code | Hardcoded password → env var |
| `src/lib/supabase.ts` | Code | Added env var validation |
| `src/app/components/ui/chart.tsx` | Code | Removed dangerouslySetInnerHTML |
| `.gitignore` | Config | Added .env entries |
| (Git cleanup) | Repo | Remove .env/.env.local from history |

**Total affected files:** 4 code/config files
**Lines changed:** ~10 lines total
**Breaking changes:** None
**Risk level:** Very Low

---

## Ready to Apply?

Once you review and approve this plan, I will:
1. Apply all code changes automatically
2. Provide the git cleanup commands for you to run
3. Guide you through Vercel configuration

Do you want to proceed, or do you have questions/changes first?
