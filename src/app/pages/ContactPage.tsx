import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert([{
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        status: 'new',
      }]);
      if (error) throw error;
      toast.success('اتبعتت رسالتك بنجاح!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error('في مشكلة في إرسال الرسالة. حاول تاني.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4" style={{ fontSize: '3rem', fontWeight: 600 }}>تواصل معنا</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            عندك سؤال عن منتجاتنا أو عايز تتعاون معنا؟ إحنا هنا.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-sm border border-border">
              <div>
                <Label htmlFor="name">الاسم</Label>
                <Input id="name" required className="mt-1" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" required className="mt-1" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="subject">الموضوع</Label>
                <Input id="subject" required className="mt-1" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="message">الرسالة</Label>
                <Textarea id="message" rows={6} required className="mt-1" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider">
                {submitting ? 'جاري الإرسال...' : 'ابعت الرسالة'}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-sm border border-border">
              <h3 className="mb-6">بيانات التواصل</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">البريد الإلكتروني</p>
                    <a href="mailto:hello@ozel.eg" className="hover:text-accent transition-colors">hello@ozel.eg</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">الموبايل</p>
                    <a href="tel:+201044892192" className="hover:text-accent transition-colors">01044892192</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">الموقع</p>
                    <p>بنها، الفلل، الميدان<br />أمام أفريقيا ستور</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">إنستجرام</p>
                    <a href="https://www.instagram.com/ozel_print" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@ozel_print</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-sm border border-border">
              <h3 className="mb-4">مواعيد العمل</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">السبت - الخميس</span>
                  <span>9 ص - 9 م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الجمعة</span>
                  <span>2 م - 10 م</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}