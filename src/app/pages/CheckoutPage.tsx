import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CreditCard, Banknote, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postal: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!supabase) {
        // Preview/local mode without a backend: simulate a successful order.
        clearCart();
        toast.success('اتبعت الطلب بنجاح!');
        navigate('/');
        return;
      }
      const { error } = await supabase.from('orders').insert([{
        customer_name: `${form.firstName} ${form.lastName}`,
        customer_email: form.email,
        customer_phone: form.phone,
        items,
        total_price: total,
        currency: 'EGP',
        status: 'pending',
        shipping_address: form.address,
        city: form.city,
        payment_method: paymentMethod,
        payment_status: 'unpaid',
      }]);
      if (error) throw error;
      clearCart();
      toast.success('اتبعت الطلب بنجاح!');
      navigate('/');
    } catch (err) {
      toast.error('في مشكلة. حاول تاني.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 style={{ fontSize: '3rem', fontWeight: 600 }}>إتمام الطلب</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-card p-8 rounded-sm border border-border">
                <h3 className="mb-6">بيانات الشحن</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input id="firstName" required className="mt-1" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input id="lastName" required className="mt-1" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" required className="mt-1" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">رقم الموبايل</Label>
                    <Input id="phone" type="tel" required className="mt-1" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input id="address" required className="mt-1" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="city">المدينة</Label>
                    <Input id="city" required className="mt-1" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="postal">الرمز البريدي</Label>
                    <Input id="postal" className="mt-1" value={form.postal} onChange={e => setForm({...form, postal: e.target.value})} />
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-card p-8 rounded-sm border border-border">
                <h3 className="mb-6">طريقة الدفع</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    {[
                      { value: 'cod', icon: Banknote, label: 'الدفع عند الاستلام' },
                      { value: 'fawry', icon: Wallet, label: 'فوري' },
                      { value: 'valu', icon: CreditCard, label: 'تقسيط فاليو' },
                    ].map(opt => (
                      <div key={opt.value} className="flex items-center space-x-3 p-4 border border-border rounded-sm cursor-pointer hover:border-accent transition-colors">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="flex items-center gap-3 cursor-pointer flex-1">
                          <opt.icon className="w-5 h-5" />
                          <span>{opt.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card p-8 rounded-sm border border-border space-y-6">
                <h3>ملخص الطلب</h3>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span>{item.price * item.quantity} جنيه</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{total} جنيه</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الشحن</span>
                    <span>مجاني</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-2">
                    <span>الإجمالي</span>
                    <span>{total} جنيه</span>
                  </div>
                </div>
                <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider">
                  {submitting ? 'جاري الإرسال...' : 'تأكيد الطلب'}
                </Button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}