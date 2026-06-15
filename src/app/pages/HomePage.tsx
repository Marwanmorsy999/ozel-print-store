import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Printer, ShoppingBag, Upload, Sparkles, BadgeCheck, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../../lib/useProducts';

const collections = [
  {
    slug: 'summer-2026',
    title: 'طµظٹظپ 2026',
    desc: 'طھظٹط´ظٹط±طھط§طھ â€¢ ط´ظˆط±طھط§طھ',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80&auto=format&fit=crop',
  },
];

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#E60023] flex-shrink-0">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export function HomePage() {
  const { products, loading } = useProducts();
  const featuredProducts = (products || []).filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea5f8cf5?w=1920&q=80')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full"
          >
            <Printer className="w-4 h-4 text-accent" />
            <span className="eyebrow text-accent">ظ…طµظ†ط¹ ط·ط¨ط§ط¹ط© ظˆطھط·ط±ظٹط² ظ…ط®طµطµ â€” ظ…طµط±</span>
          </motion.div>

          <h1
            className="mb-6 font-extrabold"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 5.5rem)', lineHeight: 1.05 }}
          >
            ط§ط®طھط§ط± ظ‚ط·ط¹طھظƒ
            <br />
            ظˆط¶ظٹظپ <span className="text-gradient-premium">ط·ط¨ط§ط¹طھظƒ</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            ط·ط¨ط§ط¹ط© ظˆطھط·ط±ظٹط² ظ…ط®طµطµ ظˆظٹظˆظ†ظٹظپظˆط±ظ… ظ…ط¨ط§ط´ط±ط© ظ…ظ† ط§ظ„ظ…طµظ†ط¹. ط§ط®طھط§ط± ط£ظٹ ظ‚ط·ط¹ط© ظپط§ط¶ظٹط©طŒ ط§ط±ظپط¹ طھطµظ…ظٹظ…ظƒطŒ ظˆط´ظˆظپ
            ط§ظ„ظ…ط¹ط§ظٹظ†ط© ظ‚ط¨ظ„ ظ…ط§ طھط·ظ„ط¨. ط£ظٹ ظƒظ…ظٹط© ظ…ظ† ظ‚ط·ط¹ط© ظ„ظ€ 1000+.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wide h-12 px-8">
              <Link to="/shop">
                <ShoppingBag className="w-5 h-5" />
                ط§ط®طھط§ط± ظ‚ط·ط¹ط© ظپط§ط¶ظٹط©
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold tracking-wide h-12 px-8 border-foreground/20 hover:border-gold hover:text-gold">
              <a href="https://wa.me/201044892192" target="_blank" rel="noopener noreferrer">
                ط³ط¹ط± ط£ظˆط±ط¯ط± ط¬ظ…ظ„ط©
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-20" />
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10 md:mb-14 gap-4">
            <div>
              <p className="eyebrow text-gold mb-2">ط§ظ„ظƒظˆظ„ظƒط´ظ†ط§طھ</p>
              <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>ط§ط®طھط§ط± ظ…ظ† ط§ظ„ظƒطھط§ظ„ظˆط¬</h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
              <Link to="/shop">ظƒظ„ ط§ظ„ظ‚ط·ط¹ <ArrowLeft className="w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {collections.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/shop/${c.slug}`} className="group relative block aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden border border-border">
                  <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <p className="text-sm text-gold mb-1">{c.desc}</p>
                    <h3 className="font-bold text-2xl mb-3">{c.title}</h3>
                    <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-foreground group-hover:text-accent transition-colors">
                      طھط³ظˆظ‚ ط§ظ„ط¢ظ† <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZE CTA */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-14">
            <div className="absolute -top-20 -start-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -end-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="eyebrow text-accent mb-3 inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ط®طµظ‘طµ ط·ط¨ط§ط¹طھظƒ
                </p>
                <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                  ط§ط±ظپط¹ طھطµظ…ظٹظ…ظƒ ظˆط´ظˆظپ ط§ظ„ظ…ط¹ط§ظٹظ†ط© ظ„ط­ط¸ظٹط§ظ‹
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  ط§ط®طھط§ط± ط£ظٹ ظ‚ط·ط¹ط©طŒ ط§ط±ظپط¹ ط§ظ„ظ„ظˆط¬ظˆ ط£ظˆ ط§ظ„طھطµظ…ظٹظ… ط¨طھط§ط¹ظƒطŒ ظˆط­ط±ظƒظ‡ ظˆظƒط¨ظ‘ط±ظ‡ ط¹ظ„ظ‰ ط§ظ„ظ‚ط·ط¹ط© ظ‚ط¨ظ„ ظ…ط§ طھط·ظ„ط¨.
                  ظ…ط¹ط§ظٹظ†ط© ظپظˆط±ظٹط© طھط±ظٹظƒ ط´ظƒظ„ ط§ظ„ط·ط¨ط§ط¹ط© ط§ظ„ظ†ظ‡ط§ط¦ظٹ.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 px-8">
                    <Link to="/shop">
                      <Upload className="w-5 h-5" /> ط§ط¨ط¯ط£ ط§ظ„طھط®طµظٹطµ
                    </Link>
                  </Button>
                  <a
                    href="https://www.pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 h-12 px-6 rounded-lg border border-[#E60023]/40 bg-[#E60023]/10 hover:bg-[#E60023]/20 hover:border-[#E60023]/70 transition-all font-bold text-sm"
                  >
                    <PinterestIcon />
                    ط§ط³طھظ„ظ‡ظ… ظ…ظ† Pinterest
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-xl bg-background border border-border flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format&fit=crop" alt="ظ…ط¹ط§ظٹظ†ط©" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-90" />
                  <div className="relative z-10 px-4 py-2 bg-accent text-accent-foreground font-display font-bold tracking-widest rounded shadow-lg rotate-[-6deg]">
                    YOUR PRINT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow text-gold mb-2">ط§ظ„ظ‚ط·ط¹ ط§ظ„ظپط§ط¶ظٹط© ط§ظ„ظ…طھط§ط­ط©</p>
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>ط§ظ„ط£ظƒط«ط± ط·ظ„ط¨ط§ظ‹</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-card rounded-md border border-border animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="font-bold tracking-wide h-12 px-8 hover:border-gold hover:text-gold">
              <Link to="/shop">ط´ظˆظپ ظƒظ„ ط§ظ„ظ‚ط·ط¹ <ArrowLeft className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-16 px-4 border-t border-border bg-card">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { icon: ShoppingBag, title: 'ط£ظٹ ظƒظ…ظٹط©', desc: 'ظ…ظ† ظ‚ط·ط¹ط© ظˆط§ط­ط¯ط© ظ„ظ€ 1000+. ظ…ظ† ط؛ظٹط± ط­ط¯ ط£ط¯ظ†ظ‰.' },
            { icon: BadgeCheck, title: 'ط£ط³ط¹ط§ط± ط§ظ„ظ…طµظ†ط¹', desc: 'ظ…ط¨ط§ط´ط±ط© ظ…ظ† ط§ظ„ظ…ظ†طھط¬. ظ…ظ† ط؛ظٹط± ظ‡ط§ظ…ط´ ظˆط³ظٹط·.' },
            { icon: Truck, title: 'طھط³ظ„ظٹظ… ط³ط±ظٹط¹', desc: 'ط·ط¨ط§ط¹ط© ط¨ط¬ظˆط¯ط© ط¹ط§ظ„ظٹط© ظˆطھط³ظ„ظٹظ… ظپظٹ ط§ظ„ظ…ظˆط¹ط¯.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

