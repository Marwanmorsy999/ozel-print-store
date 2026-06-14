---
name: testing-ozel-storefront
description: End-to-end UI testing for the ÖZEL streetwear storefront (Vite + React + React Router, Arabic/RTL). Use when verifying Home, Shop filters/search/sort, Product detail (gallery, size/color, add-to-cart), Customize-with-Print upload, or mobile responsiveness.
---

# Testing the ÖZEL storefront

Vite + React 18 SPA, React Router v7, Tailwind v4, shadcn/ui, Framer Motion. UI is Arabic/RTL (`html lang="ar" dir="rtl"`). Data layer falls back to a bundled static catalog (10 products) when Supabase env vars are missing, so the app is fully testable with no backend.

## Where to test

- **Local dev server (preferred for testing):** `npm install && npm run dev` → http://localhost:5173/. Make sure you're on the PR branch first (`git branch --show-current`). This runs the exact PR code.
- **Vercel preview may be blocked:** preview deployments are often behind **Vercel Authentication (Deployment Protection)**, which redirects to a Vercel login. If you hit a Vercel login page, you cannot test the preview without credentials — fall back to testing the same branch on localhost and note this. To unblock the public preview, the owner can disable Settings → Deployment Protection.
- Browser autocomplete in the address bar can hijack a typed URL (e.g. truncate it or jump to a previously-visited localhost URL). Clear the bar (Ctrl+L → Ctrl+A → Delete) and press Delete once after typing to dismiss the autocomplete suggestion before Enter.

## Routes

- `/` HomePage, `/shop` ShopPage, `/shop/:collection` (uniform | summer-2026 | winter-2026), `/product/:id` ProductPage, `/cart`, `/checkout`.
- Product IDs follow `uniform-shirt-001`, `winter-hoodie-001`, etc.

## Golden-path checks (with concrete assertions)

1. **Home:** gradient hero headline + badge + dual CTAs; 3 collection cards with real photos; featured grid of 6 product cards with real Unsplash images (not placeholders).
2. **Shop filters/search/sort:** `/shop` shows "10 منتج"; clicking the يونيفورم collection pill → "3 منتج"; search "hoodie" → 1 result; sort "السعر: الأقل للأعلى" orders cheapest-first (220 → 950). The product count text is the high-signal assertion.
3. **Product detail:** clicking a thumbnail swaps the main image; add-to-cart button ("ضيف للعربية") is blocked until BOTH size and color are chosen — it shows toast "اختار المقاس واللون الأول"; after selecting size + color and qty, clicking it shows toast "اتضاف للعربية" and the nav cart badge reflects the quantity.
4. **Customize with Print (headline feature):** the "ضيف للعربية مع الطباعة" button is disabled until a design is uploaded. Click the dashed upload dropzone (NOT the disabled button below it) to open the file chooser. Upload a PNG → it overlays on the garment; the size (الحجم) and rotation (الدوران) sliders appear; drag the overlay to reposition; drag the size slider to resize live; clicking add → toast "اتضافت القطعة المخصصة للعربية" and the cart badge increments by 1 (customized item is a distinct line item from a plain add).
5. **Mobile (regression):** at ~400px width, the nav collapses to a hamburger (aria-label "القائمة"), the product grid is 2 columns, and a "فلتر" button opens a slide-in filter drawer (Sheet) titled "فلتر المنتجات".

## File upload (Customize feature)

The file input is hidden; clicking the dropzone opens a **native GTK "Open File" dialog**. Steps that work:
- Pre-create a test image on disk (e.g. with PIL) before opening the dialog.
- Click the dropzone area, then in the native dialog double-click the file (Home dir is the default location). The dialog renders in screenshots and is clickable via the computer tool.
- Playwright/CDP file-set is NOT needed and `playwright` is not installed in the repo — the native dialog approach is sufficient.

## Useful RTL/Arabic strings to assert

- Add to cart: `ضيف للعربية` / success `اتضاف للعربية` / needs selection `اختار المقاس واللون الأول`
- Customize add: `ضيف للعربية مع الطباعة` / success `اتضافت القطعة المخصصة للعربية` / upload success `تم رفع التصميم`
- Shop count format: `<n> منتج`; sort options: `المميز أولاً`, `السعر: الأقل للأعلى`, `السعر: الأعلى للأقل`, `الاسم`

## Devin Secrets Needed

- None for local testing (no backend required; static catalog fallback).
- To test the live Vercel preview when Deployment Protection is on, you'd need Vercel access (not currently provisioned).
