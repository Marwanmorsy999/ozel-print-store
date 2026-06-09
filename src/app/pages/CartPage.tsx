import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { CartItemImage } from '../components/CartItemImage';

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, printFees, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4">العربية فاضية</h2>
          <p className="text-muted-foreground mb-8">ضيف قطع من المتجر عشان تبدأ</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link to="/shop">
              ابدأ التسوق
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-bold mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>عربية التسوق</h1>
          <p className="text-muted-foreground">{itemCount} {itemCount === 1 ? 'قطعة' : 'قطع'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card p-4 sm:p-6 rounded-lg border border-border flex gap-4 sm:gap-6"
              >
                <CartItemImage item={item} className="w-24 h-24 sm:w-28 sm:h-28 rounded-md border border-border flex-shrink-0" />

                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-snug">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive flex-shrink-0 h-8 w-8"
                        onClick={() => removeItem(item.key)}
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      المقاس: {item.size} • اللون: {item.color}
                    </p>
                    {item.custom && (
                      <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-accent bg-accent/10 border border-accent/20 rounded px-2 py-0.5">
                        <Sparkles className="w-3 h-3" /> طباعة مخصصة (+{item.custom.fee} جنيه/قطعة)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center border border-border rounded-md h-9">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="px-3 h-full hover:text-accent transition-colors"
                        aria-label="نقص"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-display font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="px-3 h-full hover:text-accent transition-colors"
                        aria-label="زود"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-display font-semibold text-lg">{item.price * item.quantity} جنيه</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card p-6 sm:p-8 rounded-lg border border-border space-y-6">
              <h3 className="text-lg font-bold">ملخص الطلب</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>{subtotal} جنيه</span>
                </div>
                {printFees > 0 && (
                  <div className="flex justify-between text-accent">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> رسوم الطباعة المخصصة
                    </span>
                    <span>+{printFees} جنيه</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span>مجاني</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="font-display">{total} جنيه</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link to="/checkout">
                  إتمام الطلب
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/shop">كمّل التسوق</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
