import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Printer, Users, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { products } from '../data/products';

export function HomePage() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea5f8cf5?w=1920&q=80')] bg-cover bg-center opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full"
          >
            <Printer className="w-4 h-4 text-accent" />
            <span className="text-sm uppercase tracking-wider text-accent">Custom Printing Factory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 uppercase tracking-[0.3em]"
            style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Pick Your Piece<br />Add Your Print
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Factory direct custom printing & uniforms. Any quantity. From 1 piece to bulk orders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-wider">
              <Link to="/shop">
                Choose Blank Piece
                <ShoppingBag className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="uppercase tracking-wider">
              <a href="https://wa.me/201044892192" target="_blank" rel="noopener noreferrer">
                Bulk Order Quote
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="uppercase tracking-[0.2em] mb-4" style={{ fontSize: '2.5rem', fontWeight: 600 }}>
              What We Do
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional printing factory serving Egypt with quality craftsmanship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: 'Custom Printing',
                desc: 'Pick any blank piece from our shop and add your custom print. Any design, any color.'
              },
              {
                icon: Users,
                title: 'Uniforms & Bulk',
                desc: 'Corporate uniforms, school uniforms, team gear. Any quantity from 10 to 1000+ pieces.'
              },
              {
                icon: Printer,
                title: 'Factory Direct',
                desc: 'No middleman. Factory prices. Fast turnaround. Quality guaranteed.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-6 bg-card rounded-sm border border-border"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                <h3 className="uppercase tracking-wider mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="uppercase tracking-[0.2em] mb-4" style={{ fontSize: '2.5rem', fontWeight: 600 }}>
              Blank Pieces Available
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our catalog of premium blank clothing, then add your print
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={/product/} className="group">
                  <div className="relative aspect-[3/4] bg-card rounded-sm overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-6xl opacity-20">{product.category[0]}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="uppercase tracking-wider group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="font-medium">{product.price} EGP</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg" className="uppercase tracking-wider">
              <Link to="/shop">
                View All Blank Pieces
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Any Quantity', desc: 'From 1 piece to 1000+. No minimum order.' },
              { title: 'Factory Prices', desc: 'Direct from manufacturer. No middleman markup.' },
              { title: 'Fast Turnaround', desc: 'Quality printing delivered on time.' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <h3 className="uppercase tracking-wider mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}