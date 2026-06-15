import { useRef, useState, useCallback } from 'react';
import { Upload, Trash2, RotateCcw, Sparkles, ImageIcon, ShoppingBag, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CUSTOM_PRINT_FEE, type CustomPrint } from '../context/CartContext';
import type { Product } from '../../lib/useProducts';

interface CustomizePrintProps {
  product: Product;
  onAddCustomized?: (custom: CustomPrint) => boolean | void;
}

function PinterestButton() {
  return (
    <a
      href="https://www.pinterest.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full flex items-center gap-4 overflow-hidden rounded-xl border border-[#E60023]/30 bg-gradient-to-l from-[#E60023]/10 via-background to-background hover:from-[#E60023]/20 hover:border-[#E60023]/60 transition-all duration-300 p-4"
    >
      {/* Pinterest P logo */}
      <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-[#E60023] flex items-center justify-center shadow-lg shadow-[#E60023]/30 group-hover:scale-110 transition-transform duration-300">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-bold text-base text-foreground">ط§ط³طھظ„ظ‡ظ… ظ…ظ† Pinterest</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#E60023] transition-colors" />
        </div>
        <p className="text-xs text-muted-foreground leading-snug">
          ط¯ظˆط± ط¹ظ„ظ‰ طھطµط§ظ…ظٹظ… ظˆط£ظپظƒط§ط± ط·ط¨ط§ط¹ط© طھط¹ط¬ط¨ظƒ â€” ط«ظ… ط§ط±ظپط¹ظ‡ط§ ظ‡ظ†ط§
        </p>
      </div>

      {/* Animated accent dots */}
      <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-[#E60023]/5 group-hover:bg-[#E60023]/10 transition-colors" />
      <div className="absolute -bottom-4 -left-1 w-10 h-10 rounded-full bg-[#E60023]/5 group-hover:bg-[#E60023]/10 transition-colors" />
    </a>
  );
}

export function CustomizePrint({ product, onAddCustomized }: CustomizePrintProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draggingRef = useRef(false);

  const [design, setDesign] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const [scale, setScale] = useState(35);
  const [rotation, setRotation] = useState(0);
  const [added, setAdded] = useState(false);

  const baseImage = product.images?.[0];
  const totalPrice = product.price + CUSTOM_PRINT_FEE;

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('ظ…ظ† ظپط¶ظ„ظƒ ط§ط±ظپط¹ طµظˆط±ط© (PNG ط£ظˆ JPG)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('ط­ط¬ظ… ط§ظ„طµظˆط±ط© ظƒط¨ظٹط±. ط£ظ‚طµظ‰ ط­ط¬ظ… 8 ظ…ظٹط¬ط§.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDesign(reader.result as string);
      setPos({ x: 50, y: 45 });
      setScale(35);
      setRotation(0);
      toast.success('طھظ… ط±ظپط¹ ط§ظ„طھطµظ…ظٹظ…! ط­ط±ظƒظ‡ ظˆظƒط¨ظ‘ط±ظ‡ ط¹ظ„ظ‰ ط§ظ„ظ‚ط·ط¹ط©.');
    };
    reader.readAsDataURL(file);
  }, []);

  const updatePosFromEvent = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPos({
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!design) return;
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosFromEvent(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updatePosFromEvent(e.clientX, e.clientY);
  };
  const onPointerUp = () => { draggingRef.current = false; };

  const reset = () => { setPos({ x: 50, y: 45 }); setScale(35); setRotation(0); };
  const removeDesign = () => { setDesign(null); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const handleAdd = () => {
    if (!design) return;
    const ok = onAddCustomized?.({ design, x: pos.x, y: pos.y, scale, rotation, fee: CUSTOM_PRINT_FEE });
    if (ok === false) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-accent" />
        <p className="eyebrow text-accent">ط®طµظ‘طµ ط·ط¨ط§ط¹طھظƒ</p>
      </div>
      <h2 className="font-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
        ط§ط±ظپط¹ طھطµظ…ظٹظ…ظƒ ظˆط´ظˆظپ ط§ظ„ظ…ط¹ط§ظٹظ†ط©
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        ط§ط±ظپط¹ ط§ظ„ظ„ظˆط¬ظˆ ط£ظˆ ط§ظ„طھطµظ…ظٹظ… ط¨طھط§ط¹ظƒطŒ ط­ط±ظƒظ‡ ط¨ط¥طµط¨ط¹ظƒ ط£ظˆ ط¨ط§ظ„ظ…ط§ظˆط³ ط¹ظ„ظ‰ ط§ظ„ظ‚ط·ط¹ط©طŒ ظˆظƒط¨ظ‘ط±ظ‡ ط£ظˆ ظ„ظپظ‘ظ‡.
        ط§ظ„ظ…ط¹ط§ظٹظ†ط© ط¯ظٹ ط¨طھظˆط±ظٹظƒ ط´ظƒظ„ ط§ظ„ط·ط¨ط§ط¹ط© ظ‚ط¨ظ„ ظ…ط§ طھط·ظ„ط¨.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Live preview */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className={`relative aspect-square rounded-lg overflow-hidden border border-border bg-card select-none ${
            design ? 'cursor-move touch-none' : ''
          }`}
        >
          {baseImage ? (
            <ImageWithFallback src={baseImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 font-display">
              {product.category[0]}
            </div>
          )}

          {design && (
            <div className="absolute inset-x-[22%] inset-y-[20%] border border-dashed border-white/30 rounded-md pointer-events-none" />
          )}

          {design && (
            <div
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${scale}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
              className="pointer-events-none"
            >
              <img
                src={design}
                alt="طھطµظ…ظٹظ…ظƒ"
                draggable={false}
                className="w-full h-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                style={{ mixBlendMode: 'multiply' }}
              />
              <span className="absolute -inset-2 border border-accent/60 rounded-md" />
            </div>
          )}

          {!design && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/55 backdrop-blur-[1px]">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">ط§ط±ظپط¹ طھطµظ…ظٹظ…ظƒ ط¹ط´ط§ظ† طھط´ظˆظپ ط§ظ„ظ…ط¹ط§ظٹظ†ط©</p>
            </div>
          )}

          <span className="absolute top-3 start-3 text-[10px] eyebrow bg-background/70 text-muted-foreground px-2 py-1 rounded">
            ظ…ط¹ط§ظٹظ†ط© ط­ظٹط©
          </span>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />

          {/* Price breakdown */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ط³ط¹ط± ط§ظ„ظ‚ط·ط¹ط©</span>
              <span>{product.price} ط¬ظ†ظٹظ‡</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> ط±ط³ظˆظ… ط§ظ„ط·ط¨ط§ط¹ط© ط§ظ„ظ…ط®طµطµط©
              </span>
              <span className="text-accent font-semibold">+{CUSTOM_PRINT_FEE} ط¬ظ†ظٹظ‡</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
              <span>ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ ظ„ظ„ظ‚ط·ط¹ط©</span>
              <span className="font-display">{totalPrice} ط¬ظ†ظٹظ‡</span>
            </div>
          </div>

          {/* Pinterest inspiration button â€” always visible */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ظ…ط­طھط§ط¬ ط¥ظ„ظ‡ط§ظ…طں</p>
            <PinterestButton />
          </div>

          {/* Upload / controls */}
          {!design ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border hover:border-accent rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <div className="text-center">
                <p className="font-bold text-base mb-1">ط§ط±ظپط¹ طھطµظ…ظٹظ…ظƒ</p>
                <p className="text-xs text-muted-foreground">PNG ط£ظˆ JPG â€” ط­طھظ‰ 8 ظ…ظٹط¬ط§. ظٹظپط¶ظ‘ظ„ PNG ط¨ط®ظ„ظپظٹط© ط´ظپط§ظپط©.</p>
              </div>
            </button>
          ) : (
            <>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4" /> ط؛ظٹظ‘ط± ط§ظ„طھطµظ…ظٹظ…
                </Button>
                <Button variant="outline" onClick={reset} aria-label="ط¥ط¹ط§ط¯ط© ط§ظ„ط¶ط¨ط·">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={removeDesign} aria-label="ط­ط°ظپ ط§ظ„طھطµظ…ظٹظ…">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-semibold">ط§ظ„ط­ط¬ظ…</label>
                  <span className="text-muted-foreground">{scale}%</span>
                </div>
                <Slider value={[scale]} onValueChange={([v]) => setScale(v)} min={10} max={80} step={1} />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-semibold">ط§ظ„ط¯ظˆط±ط§ظ†</label>
                  <span className="text-muted-foreground">{rotation}آ°</span>
                </div>
                <Slider value={[rotation]} onValueChange={([v]) => setRotation(v)} min={-180} max={180} step={1} />
              </div>

              <p className="text-xs text-muted-foreground">
                طھظ„ظ…ظٹط­: ط§ط³ط­ط¨ ط§ظ„طھطµظ…ظٹظ… ط¹ظ„ظ‰ ط§ظ„ظ‚ط·ط¹ط© ط¹ط´ط§ظ† طھط¶ط¨ط· ظ…ظƒط§ظ†ظ‡. ط§ط®طھط§ط± ط§ظ„ظ…ظ‚ط§ط³ ظˆط§ظ„ظ„ظˆظ† ظپظˆظ‚ ظ‚ط¨ظ„ ط§ظ„ط¥ط¶ط§ظپط©.
              </p>
            </>
          )}

          <Button
            size="lg"
            disabled={!design || added}
            onClick={handleAdd}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 disabled:opacity-50"
          >
            {added ? (
              <><Check className="w-5 h-5" /> ط§طھط¶ط§ظپطھ ظ„ظ„ط¹ط±ط¨ظٹط©</>
            ) : (
              <><ShoppingBag className="w-5 h-5" /> ط¶ظٹظپ ظ„ظ„ط¹ط±ط¨ظٹط© ظ…ط¹ ط§ظ„ط·ط¨ط§ط¹ط© â€” {totalPrice} ط¬ظ†ظٹظ‡</>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

