---
name: testing-cart-checkout
description: Test the ÖZEL cart + checkout flow end-to-end (add-to-cart, cart drawer, custom-print pricing/design, checkout validation + success, localStorage persistence). Use when verifying Phase 2 cart/checkout UI or API changes.
---

# Testing ÖZEL Cart + Checkout

The app is a Vite + React (TypeScript) e-commerce site, Arabic/RTL, dark streetwear theme. Cart state lives in `src/app/context/CartContext.tsx` and persists to `localStorage` under key `ozel-cart`.

## Running locally
- `npm install` then `npm run dev` → serves at `http://localhost:5173`.
- `npm run build` does an implicit TS typecheck (repo has no separate `lint`/`typecheck` scripts).
- The Vercel preview is typically behind **Deployment Protection**, so test on localhost with the branch code instead.

## Test setup / reset
- Reset the cart before a clean run by clearing storage in the browser console: `localStorage.removeItem('ozel-cart'); location.reload();`
- A test image for the custom-print upload lives at `/home/ubuntu/test-logo.png` (any small PNG works). The native file picker opens when clicking the upload button; double-click the file to select it.

## How to reach the features
- Product page: `/product/summer-tee-001` (Summer Essential Tee, 280 EGP). Must select **size + color** before add-to-cart buttons enable.
- Cart drawer: click the bag/cart icon top-left in the nav (it does NOT auto-open after add-to-cart; a toast confirms instead).
- Checkout: `/checkout` (or "إتمام الطلب" button in drawer).

## Key UI labels (Arabic)
- Add to cart: `ضيف للعربية`; added toast: `اتضاف للعربية`.
- Custom-print fee constant = **75 EGP** (`CUSTOM_PRINT_FEE` in CartContext). Breakdown shows `سعر القطعة` + `رسوم الطباعة المخصصة +75` = `الإجمالي للقطعة`.
- Custom line badge in cart: `طباعة مخصصة +75 ج`; print-fees summary row: `رسوم الطباعة`.
- Checkout phone validation error: `رقم موبايل مصري غير صحيح`; generic form error toast: `من فضلك صحّح البيانات المطلوبة`.
- Success screen: `تم استلام طلبك!` with order number `#OZ-<timestamp>`.

## What to verify (golden path)
1. **Regular item**: add qty 2 → drawer shows correct line + subtotal/total, NO print-fee row. Trash icon removes line → empty state `العربية فاضية`.
2. **Custom item**: upload design → it overlays on the mockup with size/rotation controls. Adding it creates a NEW distinct cart line (never merges with the regular item) with the design thumbnail + 75 fee. Totals: subtotal = sum of base prices, print fees row = sum of fees, total = subtotal + fees.
3. **Checkout validation**: invalid Egyptian phone (e.g. `12345`) blocks submit with inline error + toast. Valid phone matches `01[0-2,5][0-9]{8}` (e.g. `01044892192`).
4. **Success**: valid submit shows success screen with order number and clears the cart badge.
5. **Persistence**: add item, full page reload → cart still populated (localStorage).

## Caveats / known limits
- Checkout is **mock**: without Supabase env vars, order submission is simulated (no real Fawry/valU/payment processing — those are UI selection only). Don't expect a real order to be persisted unless Supabase env is configured.
- Because the cart auto-persists, always reset localStorage between runs or earlier test items may linger.
- If the cart drawer doesn't open on add, that's expected — open it manually via the nav cart icon.

## Devin Secrets Needed
- None for local testing (catalog has a static fallback; checkout is mocked). Supabase env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) would only be needed to test real order persistence.
