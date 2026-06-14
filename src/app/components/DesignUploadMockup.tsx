import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, RotateCcw, ZoomIn, ZoomOut, Move, Download, X } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export interface PrintArea {
  /** Left offset as % of image width (0-100) */
  left: number;
  /** Top offset as % of image height (0-100) */
  top: number;
  /** Width as % of image width (0-100) */
  width: number;
  /** Height as % of image height (0-100) */
  height: number;
}

interface DesignUploadMockupProps {
  productImage: string | undefined;
  productColor?: string;
  printArea: PrintArea;
  productName?: string;
  /** Fallback letter when no image */
  fallbackLetter?: string;
}

interface DesignState {
  src: string;
  scale: number;
  offsetX: number; // percentage offset within print area (-50 to 50)
  offsetY: number;
}

/** Check if a hex color is light (for contrast decisions) */
function isLightColor(color?: string): boolean {
  if (!color) return false;
  const hex = color.replace('#', '');
  if (hex.length < 6) return false;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Perceived luminance
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export function DesignUploadMockup({
  productImage,
  productColor,
  printArea,
  productName,
  fallbackLetter,
}: DesignUploadMockupProps) {
  const [design, setDesign] = useState<DesignState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, origOffsetX: 0, origOffsetY: 0 });

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setDesign({
        src: e.target?.result as string,
        scale: 80,
        offsetX: 0,
        offsetY: 0,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsHoveringDrop(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsHoveringDrop(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDrop(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Mouse drag to reposition design within print area
  const handleDesignMouseDown = (e: React.MouseEvent) => {
    if (!design) return;
    e.preventDefault();
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origOffsetX: design.offsetX,
      origOffsetY: design.offsetY,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartRef.current.x;
      const dy = ev.clientY - dragStartRef.current.y;
      // Convert pixel movement to percentage of container
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pctX = (dx / rect.width) * 100;
      const pctY = (dy / rect.height) * 100;
      setDesign(prev => prev ? ({
        ...prev,
        offsetX: Math.max(-50, Math.min(50, dragStartRef.current.origOffsetX + pctX)),
        offsetY: Math.max(-50, Math.min(50, dragStartRef.current.origOffsetY + pctY)),
      }) : null);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resetDesign = () => setDesign(null);

  const updateScale = (val: number[]) => {
    setDesign(prev => prev ? { ...prev, scale: val[0] } : null);
  };

  // Export mockup as image using canvas
  const exportMockup = () => {
    if (!design || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * 2; // 2x for quality
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(2, 2);

    // Draw product image or color background
    if (productImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        drawDesignOnCanvas(ctx, rect.width, rect.height);
        downloadCanvas(canvas);
      };
      img.src = productImage;
    } else {
      ctx.fillStyle = productColor || '#333';
      ctx.fillRect(0, 0, rect.width, rect.height);
      drawDesignOnCanvas(ctx, rect.width, rect.height);
      downloadCanvas(canvas);
    }
  };

  const drawDesignOnCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    if (!design) return;
    const designImg = new Image();
    designImg.crossOrigin = 'anonymous';
    designImg.onload = () => {
      const paLeft = (printArea.left / 100) * w;
      const paTop = (printArea.top / 100) * h;
      const paWidth = (printArea.width / 100) * w;
      const paHeight = (printArea.height / 100) * h;

      const scaleF = design.scale / 100;
      const designW = paWidth * scaleF;
      const designH = (designImg.height / designImg.width) * designW;

      const cx = paLeft + paWidth / 2 + (design.offsetX / 100) * w;
      const cy = paTop + paHeight / 2 + (design.offsetY / 100) * h;

      ctx.globalAlpha = 0.92;
      ctx.drawImage(designImg, cx - designW / 2, cy - designH / 2, designW, designH);
      downloadCanvas(ctx.canvas);
    };
    designImg.src = design.src;
  };

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `${productName || 'mockup'}-preview.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Touch support for mobile drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!design) return;
    const touch = e.touches[0];
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      origOffsetX: design.offsetX,
      origOffsetY: design.offsetY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!design) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pctX = (dx / rect.width) * 100;
    const pctY = (dy / rect.height) * 100;
    setDesign(prev => prev ? ({
      ...prev,
      offsetX: Math.max(-50, Math.min(50, dragStartRef.current.origOffsetX + pctX)),
      offsetY: Math.max(-50, Math.min(50, dragStartRef.current.origOffsetY + pctY)),
    }) : null);
  };

  return (
    <div className="space-y-4">
      {/* Mockup Preview Area */}
      <div
        ref={containerRef}
        className="relative aspect-square bg-card rounded-sm overflow-hidden flex items-center justify-center select-none"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Product Image / Placeholder */}
        {productImage ? (
          <img src={productImage} alt={productName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-border/30" style={{ backgroundColor: productColor || '#1a1a1a' }}>
            <span className="text-[12rem] opacity-10" style={{ color: isLightColor(productColor) ? '#000' : '#fff' }}>{fallbackLetter}</span>
          </div>
        )}

        {/* Print Area Guide (toggleable) */}
        {showGuide && (
          <div
            className="absolute border-2 border-dashed border-accent/40 pointer-events-none z-10"
            style={{
              left: `${printArea.left}%`,
              top: `${printArea.top}%`,
              width: `${printArea.width}%`,
              height: `${printArea.height}%`,
            }}
          >
            <span className="absolute -top-5 left-0 text-[10px] text-accent/60 uppercase tracking-wider">Print Area</span>
          </div>
        )}

        {/* Uploaded Design Overlay — looks PRINTED */}
        {design && (
          <div
            className="absolute z-20 cursor-move"
            style={{
              left: `${printArea.left}%`,
              top: `${printArea.top}%`,
              width: `${printArea.width}%`,
              height: `${printArea.height}%`,
            }}
            onMouseDown={handleDesignMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              style={{
                transform: `translate(${design.offsetX}%, ${design.offsetY}%)`,
              }}
            >
              <img
                src={design.src}
                alt="Your design"
                draggable={false}
                className="max-w-full max-h-full object-contain"
                style={{
                  width: `${design.scale}%`,
                  // MULTIPLY blend — the magic that makes it look printed
                  // White/transparent areas become invisible, colors blend with fabric
                  mixBlendMode: 'multiply',
                  opacity: 0.92,
                  // Slight contrast to simulate ink on fabric
                  filter: 'contrast(1.05) brightness(0.98)',
                }}
              />
            </div>
          </div>
        )}

        {/* Drop Zone Overlay */}
        {!design && isHoveringDrop && (
          <div className="absolute inset-0 z-30 bg-accent/10 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-accent rounded-sm">
            <div className="text-center">
              <Upload className="w-10 h-10 mx-auto mb-2 text-accent" />
              <p className="text-accent font-medium">سيب التصميم هنا</p>
            </div>
          </div>
        )}

        {/* Remove Design Button */}
        {design && (
          <button
            onClick={resetDesign}
            className="absolute top-3 right-3 z-30 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Upload Button */}
        {!design ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-border rounded-sm cursor-pointer hover:border-accent transition-colors group"
          >
            <Upload className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            <div className="text-center">
              <p className="text-sm font-medium group-hover:text-accent transition-colors">
                ارفع تصميمك هنا
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG شفاف · JPG · SVG · أو اسحب وسيب
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Scale Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <ZoomIn className="w-3.5 h-3.5" />
                  حجم التصميم
                </label>
                <span className="text-xs text-muted-foreground">{design.scale}%</span>
              </div>
              <Slider
                value={[design.scale]}
                onValueChange={updateScale}
                min={20}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGuide(!showGuide)}
                className="flex-1"
              >
                <Move className="w-3.5 h-3.5 mr-1.5" />
                {showGuide ? 'اخفي الإرشاد' : 'إرشاد الطباعة'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDesign}
                className="flex-1"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                غيّر التصميم
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportMockup}
                className="flex-1"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                حمّل الصورة
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              اسحب التصميم عشان تحركه · استخدم الشريط عشان تكبر أو تصغر
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
