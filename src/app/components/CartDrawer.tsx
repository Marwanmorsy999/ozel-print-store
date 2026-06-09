import { useNavigate } from 'react-router';
import { ShoppingBag, Plus, Minus, Trash2, Sparkles, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { CartItemImage } from './CartItemImage';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, printFees, total, itemCount } = useCart();
  const navigate = useNavigate();

  const go = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-start">
            <ShoppingBag className="w-5 h-5 text-accent" />
            عربية التسوق
            {itemCount > 0 && <span className="text-muted-foreground font-normal text-sm">({itemCount})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="w-14 h-14 text-muted-foreground" />
            <div>
              <p className="font-bold mb-1">العربية فاضية</p>
              <p className="text-sm text-muted-foreground">ضيف قطع من المتجر عشان تبدأ</p>
            </div>
            <Button onClick={() => go('/shop')} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              ابدأ التسوق
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => (
                <div key={item.key} className="flex gap-3">
                  <CartItemImage item={item} className="w-20 h-20 rounded-md border border-border flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold leading-snug line-clamp-2">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.size} • {item.color}
                    </p>

                    {item.custom && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 rounded px-1.5 py-0.5">
                        <Sparkles className="w-3 h-3" /> طباعة مخصصة +{item.custom.fee} ج
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-md h-8">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="px-2 h-full hover:text-accent transition-colors"
                          aria-label="نقص"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="px-2 h-full hover:text-accent transition-colors"
                          aria-label="زود"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-display font-semibold">{item.price * item.quantity} ج</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-4 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} جنيه</span>
                </div>
                {printFees > 0 && (
                  <div className="flex justify-between text-accent">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> رسوم الطباعة
                    </span>
                    <span>+{printFees} جنيه</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>الشحن</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1.5 border-t border-border">
                  <span>الإجمالي</span>
                  <span className="font-display">{total} جنيه</span>
                </div>
              </div>

              <Button
                onClick={() => go('/checkout')}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
              >
                إتمام الطلب <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button onClick={() => go('/cart')} variant="outline" className="w-full">
                عرض العربية
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
