import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';

export function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl uppercase tracking-wider mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-8">Add some premium pieces to get started</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 uppercase tracking-wider">
            <Link to="/shop">
              Start Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '3rem', fontWeight: 600 }}>
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card p-6 rounded-sm border border-border flex gap-6"
              >
                <div className="w-24 h-24 bg-muted rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl opacity-20">{item.name[0]}</span>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="uppercase tracking-wider mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} • Color: {item.color}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-medium">{item.price * item.quantity} EGP</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-card p-8 rounded-sm border border-border space-y-6">
              <h3 className="uppercase tracking-wider text-lg">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{total} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{total} EGP</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider">
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full uppercase tracking-wider">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
