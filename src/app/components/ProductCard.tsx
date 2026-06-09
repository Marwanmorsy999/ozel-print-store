import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../../lib/useProducts';

const collectionLabels: Record<string, string> = {
  uniform: 'يونيفورم',
  'summer-2026': 'صيف 2026',
  'winter-2026': 'شتا 2026',
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] bg-card rounded-md overflow-hidden border border-border">
          {product.images?.[0] ? (
            <ImageWithFallback
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <span className="text-6xl opacity-20 font-display">{product.category[0]}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.featured && (
            <span className="absolute top-3 start-3 inline-flex items-center gap-1 bg-accent/90 text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              <Sparkles className="w-3 h-3" /> مميز
            </span>
          )}

          <span className="absolute bottom-3 start-3 end-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center bg-foreground text-background text-xs font-bold uppercase tracking-widest py-2 rounded">
            شوف التفاصيل
          </span>
        </div>

        <div className="pt-3 space-y-1">
          <p className="text-[11px] eyebrow text-gold">{collectionLabels[product.collection] ?? product.collection}</p>
          <h3 className="text-sm font-bold tracking-wide group-hover:text-accent transition-colors">{product.name}</h3>
          <p className="font-display text-base font-semibold">{product.price} <span className="text-xs text-muted-foreground">جنيه</span></p>
        </div>
      </Link>
    </motion.div>
  );
}
