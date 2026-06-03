import { motion } from 'motion/react';
import { Heart, Sparkles, Award } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export function AboutPage() {
  const { t } = useLang();

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
              {t('Made with Good Hands', 'مصنوع بإيدين أمينة')}
            </h1>
            <p className="text-xl text-muted-foreground italic">
              {t('Egyptian craftsmanship meets global standards', 'الصنعة المصرية بمعايير عالمية')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t(
                'ÖZEL is more than a clothing brand. We are a movement of Egyptian artisans, designers, and creators who believe in the power of quality craftsmanship. Every piece we create carries the spirit of our heritage and the precision of modern design.',
                'ÖZEL مش مجرد براند ملابس. إحنا حركة من الحرفيين والمصممين المصريين اللي بيؤمنوا بقوة الشغل الأصيل. كل قطعة بنعملها بتحمل روح تراثنا ودقة التصميم الحديث.'
              )}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {t(
                'From professional uniforms to contemporary streetwear, each garment is made with good hands — hands that care about every stitch, every detail, every customer.',
                'من اليونيفورم الاحترافي للستريتوير العصري، كل قطعة بتتعمل بإيدين أمينة — إيدين بتهتم بكل غرزة، كل تفصيلة، كل زبون.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Heart,
                title: t('Crafted with Care', 'مصنوع باهتمام'),
                desc: t(
                  'Every piece is made with attention to detail and genuine care for quality',
                  'كل قطعة بتتعمل باهتمام بالتفاصيل وحرص حقيقي على الجودة'
                )
              },
              {
                icon: Sparkles,
                title: t('Egyptian Pride', 'فخر مصري'),
                desc: t(
                  'Proudly designed and manufactured in Egypt with local expertise',
                  'مصمم ومصنوع في مصر بأيدي مصرية بكل فخر'
                )
              },
              {
                icon: Award,
                title: t('Premium Quality', 'جودة عالية'),
                desc: t(
                  'We never compromise on materials or craftsmanship',
                  'مش بنتنازل أبدًا عن الخامة ولا جودة التنفيذ'
                )
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
              {t('Our Promise', 'وعدنا ليك')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'We promise to deliver premium quality clothing that reflects the best of Egyptian craftsmanship. Every piece is made with good hands, honest work, and a commitment to excellence.',
                'بنوعدك إننا نوصّلك ملابس بجودة عالية تعكس أحسن ما في الصنعة المصرية. كل قطعة بتتعمل بإيدين أمينة، وشغل نضيف، والتزام بالتميز.'
              )}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}