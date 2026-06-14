import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, Check, Minus, Plus, Truck, ShieldCheck, Factory } from 'lucide-react';
import { useProducts } from '../../lib/useProducts';
import { useCart, CUSTOM_PRINT_FEE, type CustomPrint } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CustomizePrint } from '../components/CustomizePrint';
import { toast } from 'sonner';

export function ProductPage() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">جاري التحميل...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المنتج مش موجود</h2>
          <Button asChild variant="outline"><Link to="/shop">ارجع للمتجر</Link></Button>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];

  const requireSelection = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('اختار المقاس واللون الأول');
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireSelection()) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        basePrice: product.price,
        image: images[0] || '',
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    setAddedToCart(true);
    toast.success('اتضاف للعربية');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddCustomized = (custom: CustomPrint): boolean => {
    if (!requireSelection()) return false;
    addItem({
      id: `${product.id}-custom`,
      name: `${product.name} — مخصص بطباعة`,
      basePrice: product.price,
      image: images[0] || '',
      size: selectedSize,
      color: selectedColor,
      custom,
    });
    toast.success(`اتضافت القطعة المخصصة للعربية (+${CUSTOM_PRINT_FEE} جنيه طباعة)`);
    return true;
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
          <ArrowRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">المتجر</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="aspect-square bg-card rounded-lg overflow-hidden border border-border flex items-center justify-center">
              {images[activeImage] ? (
                <ImageWithFallback src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10rem] opacity-20 font-display">{product.category[0]}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-accent' : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <ImageWithFallback src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-7">
            <div>
              <p className="eyebrow text-gold mb-2">{product.collection}</p>
              <h1 className="font-bold mb-3" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>{product.name}</h1>
              <p className="font-display text-3xl font-semibold mb-5">{product.price} <span className="text-base text-muted-foreground">جنيه</span></p>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Size */}
            <div>
              <label className="text-sm font-semibold mb-3 block">المقاس {selectedSize && <span className="text-accent">— {selectedSize}</span>}</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-11 px-4 py-2 rounded-md border font-semibold transition-colors text-sm ${
                      selectedSize === size ? 'border-accent bg-accent text-accent-foreground' : 'border-border hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="text-sm font-semibold mb-3 block">اللون {selectedColor && <span className="text-accent">— {selectedColor}</span>}</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`group relative w-11 h-11 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-accent scale-110' : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <span className="absolute inset-1 rounded-full" style={{ backgroundColor: color.value }} />
                    {selectedColor === color.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-5 h-5 text-accent drop-shadow-lg" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-border rounded-md h-12">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 h-full hover:text-accent transition-colors" aria-label="نقص">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-display font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 h-full hover:text-accent transition-colors" aria-label="زود">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={addedToCart}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12"
              >
                {addedToCart ? <><Check className="w-5 h-5" /> اتضاف للعربية</> : <><ShoppingBag className="w-5 h-5" /> ضيف للعربية</>}
              </Button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Factory, label: 'مباشرة من المصنع' },
                { icon: ShieldCheck, label: 'جودة مضمونة' },
                { icon: Truck, label: 'تسليم سريع' },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center text-center gap-2 p-3 rounded-md bg-card border border-border">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="text-[11px] text-muted-foreground leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">النوع</span><span>{product.category}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">الخامة</span><span>{product.material ?? 'قطن بريميوم'}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">الصنع</span><span>مصر</span></div>
            </div>
          </motion.div>
        </div>

        {/* Customize with print */}
        <CustomizePrint product={product} onAddCustomized={handleAddCustomized} />
      </div>
    </div>
  );
}
