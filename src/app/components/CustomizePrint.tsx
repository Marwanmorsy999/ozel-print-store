import { useRef, useState, useCallback } from 'react';
import { Upload, Trash2, RotateCcw, Sparkles, ImageIcon, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../../lib/useProducts';

interface CustomizePrintProps {
  product: Product;
  onAddCustomized?: () => void;
}

export function CustomizePrint({ product, onAddCustomized }: CustomizePrintProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draggingRef = useRef(false);

  const [design, setDesign] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 45 }); // percentage within preview
  const [scale, setScale] = useState(35); // width as % of container
  const [rotation, setRotation] = useState(0);

  const baseImage = product.images?.[0];

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('من فضلك ارفع صورة (PNG أو JPG)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('حجم الصورة كبير. أقصى حجم 8 ميجا.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDesign(reader.result as string);
      setPos({ x: 50, y: 45 });
      setScale(35);
      setRotation(0);
      toast.success('تم رفع التصميم! حركه وكبّره على القطعة.');
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
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const reset = () => {
    setPos({ x: 50, y: 45 });
    setScale(35);
    setRotation(0);
  };
  const removeDesign = () => {
    setDesign(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-accent" />
        <p className="eyebrow text-accent">خصّص طباعتك</p>
      </div>
      <h2 className="font-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
        ارفع تصميمك وشوف المعاينة
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        ارفع اللوجو أو التصميم بتاعك، حركه بإصبعك أو بالماوس على القطعة، وكبّره أو لفّه.
        المعاينة دي بتوريك شكل الطباعة قبل ما تطلب.
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
            <img
              src={design}
              alt="تصميمك"
              draggable={false}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${scale}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
              className="pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
            />
          )}

          {!design && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/55 backdrop-blur-[1px]">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">ارفع تصميمك عشان تشوف المعاينة</p>
            </div>
          )}

          <span className="absolute top-3 start-3 text-[10px] eyebrow bg-background/70 text-muted-foreground px-2 py-1 rounded">
            معاينة
          </span>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />

          {!design ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border hover:border-accent rounded-lg p-10 flex flex-col items-center justify-center gap-3 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Upload className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold">ارفع تصميمك</span>
              <span className="text-xs text-muted-foreground">PNG أو JPG — حتى 8 ميجا. يفضّل PNG بخلفية شفافة.</span>
            </button>
          ) : (
            <>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4" /> غيّر التصميم
                </Button>
                <Button variant="outline" onClick={reset} aria-label="إعادة الضبط">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={removeDesign} aria-label="حذف التصميم">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-semibold">الحجم</label>
                  <span className="text-muted-foreground">{scale}%</span>
                </div>
                <Slider value={[scale]} onValueChange={([v]) => setScale(v)} min={10} max={80} step={1} />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-semibold">الدوران</label>
                  <span className="text-muted-foreground">{rotation}°</span>
                </div>
                <Slider value={[rotation]} onValueChange={([v]) => setRotation(v)} min={-180} max={180} step={1} />
              </div>

              <p className="text-xs text-muted-foreground">
                تلميح: اسحب التصميم على القطعة عشان تظبط مكانه.
              </p>
            </>
          )}

          <Button
            size="lg"
            disabled={!design}
            onClick={() => {
              onAddCustomized?.();
            }}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 disabled:opacity-50"
          >
            <ShoppingBag className="w-5 h-5" /> ضيف للعربية مع الطباعة
          </Button>
        </div>
      </div>
    </section>
  );
}
