import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Printer, ShoppingBag, Upload, Sparkles, BadgeCheck, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../../lib/useProducts';

const collections = [
  {
    slug: 'uniform',
    title: 'يونيفورم',
    desc: 'شركات • مدارس • فرق',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80&auto=format&fit=crop',
  },
  {
    slug: 'summer-2026',
    title: 'صيف 2026',
    desc: 'تيشيرتات • شورتات',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80&auto=format&fit=crop',
  },
  {
    slug: 'winter-2026',
    title: 'شتا 2026',
    desc: 'هوديز • جواكت',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&q=80&auto=format&fit=crop',
  },
];

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
            <span className="eyebrow text-accent">مصنع طباعة مخصص — مصر</span>
          </motion.div>

          <h1
            className="mb-6 font-extrabold"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 5.5rem)', lineHeight: 1.05 }}
          >
            اختار قطعتك
            <br />
            وضيف <span className="text-gradient-premium">طباعتك</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            طباعة مخصصة ويونيفورم مباشرة من المصنع. اختار أي قطعة فاضية، ارفع تصميمك، وشوف
            المعاينة قبل ما تطلب. أي كمية من قطعة لـ 1000+.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wide h-12 px-8">
              <Link to="/shop">
                <ShoppingBag className="w-5 h-5" />
                اختار قطعة فاضية
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold tracking-wide h-12 px-8 border-foreground/20 hover:border-gold hover:text-gold">
              <a href="https://wa.me/201044892192" target="_blank" rel="noopener noreferrer">
                سعر أوردر جملة
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
              <p className="eyebrow text-gold mb-2">الكولكشنات</p>
              <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>اختار من الكتالوج</h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
              <Link to="/shop">كل القطع <ArrowLeft className="w-4 h-4" /></Link>
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
                      تسوق الآن <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
                  <Sparkles className="w-4 h-4" /> خصّص طباعتك
                </p>
                <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                  ارفع تصميمك وشوف المعاينة لحظياً
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  اختار أي قطعة، ارفع اللوجو أو التصميم بتاعك، وحركه وكبّره على القطعة قبل ما تطلب.
                  معاينة فورية تريك شكل الطباعة النهائي.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 px-8">
                  <Link to="/shop"><Upload className="w-5 h-5" /> ابدأ التخصيص</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-xl bg-background border border-border flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format&fit=crop" alt="معاينة" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-90" />
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
            <p className="eyebrow text-gold mb-2">القطع الفاضية المتاحة</p>
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>الأكثر طلباً</h2>
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
              <Link to="/shop">شوف كل القطع <ArrowLeft className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-16 px-4 border-t border-border bg-card">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { icon: ShoppingBag, title: 'أي كمية', desc: 'من قطعة واحدة لـ 1000+. من غير حد أدنى.' },
            { icon: BadgeCheck, title: 'أسعار المصنع', desc: 'مباشرة من المنتج. من غير هامش وسيط.' },
            { icon: Truck, title: 'تسليم سريع', desc: 'طباعة بجودة عالية وتسليم في الموعد.' },
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
