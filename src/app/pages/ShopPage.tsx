import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Filter } from 'lucide-react';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function ShopPage() {
  const { collection } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    if (collection && product.collection !== collection) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (priceRange === 'under-500' && product.price >= 500) return false;
    if (priceRange === '500-700' && (product.price < 500 || product.price >= 700)) return false;
    if (priceRange === 'over-700' && product.price < 700) return false;
    return true;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const collectionTitle = collection
    ? collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'All Products';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '3rem', fontWeight: 600 }}>
            {collectionTitle}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-64 space-y-6"
          >
            <div className="bg-card p-6 rounded-sm border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4" />
                <h3 className="uppercase tracking-wider">Filters</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm uppercase tracking-wider mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm uppercase tracking-wider mb-2 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-500">Under 500 EGP</SelectItem>
                      <SelectItem value="500-700">500 - 700 EGP</SelectItem>
                      <SelectItem value="over-700">Over 700 EGP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(selectedCategory !== 'all' || priceRange !== 'all') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange('all');
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-card p-6 rounded-sm border border-border">
              <h3 className="uppercase tracking-wider mb-4 text-sm">Collections</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop/uniform" className="text-muted-foreground hover:text-foreground transition-colors">
                    Uniform
                  </Link>
                </li>
                <li>
                  <Link to="/shop/summer-2026" className="text-muted-foreground hover:text-foreground transition-colors">
                    Summer 2026
                  </Link>
                </li>
                <li>
                  <Link to="/shop/winter-2026" className="text-muted-foreground hover:text-foreground transition-colors">
                    Winter 2026
                  </Link>
                </li>
              </ul>
            </div>
          </motion.aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link to={`/product/${product.id}`} className="group">
                    <div className="relative aspect-[3/4] bg-card rounded-sm overflow-hidden mb-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-6xl opacity-20">{product.category[0]}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="uppercase tracking-wider text-sm group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <p className="font-medium">{product.price} EGP</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-muted-foreground">No products found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
