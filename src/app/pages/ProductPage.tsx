import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Button asChild variant="outline">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: '',
      size: selectedSize,
      color: selectedColor,
    });

    setAddedToCart(true);
    toast.success('Added to cart');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-square bg-card rounded-sm flex items-center justify-center"
          >
            <span className="text-[12rem] opacity-20">{product.category[0]}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </p>
              <h1 className="uppercase tracking-wider mb-4" style={{ fontSize: '2.5rem', fontWeight: 600 }}>
                {product.name}
              </h1>
              <p className="text-3xl font-medium mb-6">{product.price} EGP</p>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm uppercase tracking-wider mb-3 block">
                  Select Size {selectedSize && `- ${selectedSize}`}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border transition-colors uppercase text-sm ${
                        selectedSize === size
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm uppercase tracking-wider mb-3 block">
                  Select Color {selectedColor && `- ${selectedColor}`}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-accent scale-110'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div
                        className="absolute inset-1 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-5 h-5 text-accent drop-shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={addedToCart}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-wider"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            <div className="border-t border-border pt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material</span>
                <span>Premium Cotton</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Made In</span>
                <span>Egypt</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
