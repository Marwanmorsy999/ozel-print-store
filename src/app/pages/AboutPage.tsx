import { motion } from 'motion/react';
import { Heart, Sparkles, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="uppercase tracking-[0.2em] mb-6" style={{ fontSize: '3rem', fontWeight: 600 }}>
              Made with Good Hands
            </h1>
            <p className="text-xl text-muted-foreground italic">
              Egyptian craftsmanship meets global standards
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              ÖZEL is more than a clothing brand. We are a movement of Egyptian artisans, designers, and creators
              who believe in the power of quality craftsmanship. Every piece we create carries the spirit of our
              heritage and the precision of modern design.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              From professional uniforms to contemporary streetwear, each garment is made with good hands—
              hands that care about every stitch, every detail, every customer. We take pride in creating
              pieces that last, pieces that matter, pieces that tell your story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Heart,
                title: 'Crafted with Care',
                desc: 'Every piece is made with attention to detail and genuine care for quality'
              },
              {
                icon: Sparkles,
                title: 'Egyptian Pride',
                desc: 'Proudly designed and manufactured in Egypt with local expertise'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                desc: 'We never compromise on materials or craftsmanship'
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
                <item.icon className="w-8 h-8 mx-auto mb-4 text-accent" />
                <h3 className="uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="uppercase tracking-[0.2em] mb-6" style={{ fontSize: '2rem', fontWeight: 600 }}>
              Our Promise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We promise to deliver premium quality clothing that reflects the best of Egyptian craftsmanship.
              Every piece is made with good hands, honest work, and a commitment to excellence that you can
              feel the moment you wear it.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
