import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../../lib/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

const collectionTitles: Record<string, string> = {
  uniform: 'يونيفورم',
  'summer-2026': 'صيف 2026',
  'winter-2026': 'شتا 2026',
};

const collectionLinks = [
  { slug: '', label: 'كل المنتجات' },
  { slug: 'uniform', label: 'يونيفورم' },
  { slug: 'summer-2026', label: 'صيف 2026' },
  { slug: 'winter-2026', label: 'شتا 2026' },
];

export function ShopPage() {
  const { collection } = useParams();
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  const filteredProducts = useMemo(() => {
    const list = products.filter(product => {
      if (collection && product.collection !== collection) return false;
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (priceRange === 'under-500' && product.price >= 500) return false;
      if (priceRange === '500-700' && (product.price < 500 || product.price >= 700)) return false;
      if (priceRange === 'over-700' && product.price < 700) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0));
    return sorted;
  }, [products, collection, selectedCategory, priceRange, sort, search]);

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || search !== '';
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setSearch('');
  };

  const title = collection ? collectionTitles[collection] ?? collection : 'كل المنتجات';

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-2 block">النوع</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأنواع</SelectItem>
            {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-semibold mb-2 block">نطاق السعر</label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأسعار</SelectItem>
            <SelectItem value="under-500">أقل من 500 جنيه</SelectItem>
            <SelectItem value="500-700">500 - 700 جنيه</SelectItem>
            <SelectItem value="over-700">أكتر من 700 جنيه</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4" /> مسح الفلاتر
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-10 md:py-14 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="eyebrow text-gold mb-2">المتجر</p>
          <h1 className="font-bold" style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)' }}>{title}</h1>
          <p className="text-muted-foreground mt-1">{filteredProducts.length} منتج</p>
        </motion.div>

        {/* Collection pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {collectionLinks.map(c => {
            const active = (c.slug === '' && !collection) || c.slug === collection;
            return (
              <Link
                key={c.slug || 'all'}
                to={c.slug ? `/shop/${c.slug}` : '/shop'}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  active
                    ? 'bg-accent border-accent text-accent-foreground'
                    : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block md:w-64 shrink-0 space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4 text-accent" />
                <h3 className="font-bold tracking-wide">فلتر</h3>
              </div>
              <FilterControls />
            </div>
            <div className="bg-card p-6 rounded-sm border border-border">
              <h3 className="mb-4 text-sm">الكولكشنات</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">كل المنتجات</Link></li>
                <li><Link to="/shop/uniform" className="text-muted-foreground hover:text-foreground transition-colors">يونيفورم</Link></li>
                <li><Link to="/shop/summer-2026" className="text-muted-foreground hover:text-foreground transition-colors">صيف 2026</Link></li>
                <li><Link to="/shop/winter-2026" className="text-muted-foreground hover:text-foreground transition-colors">شتا 2026</Link></li>
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            {/* Toolbar: search + sort + mobile filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="ابحث عن قطعة..."
                  className="ps-9"
                />
              </div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="sm:w-48"><SelectValue placeholder="ترتيب" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">المميز أولاً</SelectItem>
                  <SelectItem value="price-asc">السعر: الأقل للأعلى</SelectItem>
                  <SelectItem value="price-desc">السعر: الأعلى للأقل</SelectItem>
                  <SelectItem value="name">الاسم</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile filter drawer */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="w-4 h-4" /> فلتر
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>فلتر المنتجات</SheetTitle>
                  </SheetHeader>
                  <div className="px-4">
                    <FilterControls />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-card rounded-md border border-border animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground mb-4">مفيش منتجات بتطابق الفلتر ده</p>
                <Button variant="outline" onClick={clearFilters}>مسح الفلاتر</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
