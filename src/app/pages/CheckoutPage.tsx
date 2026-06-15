import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { CreditCard, Banknote, Wallet, Sparkles, Loader2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { CartItemImage } from '../components/CartItemImage';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

const PAYMENT_METHODS = [
  { value: 'cod', icon: Banknote, label: 'الدفع عند الاستلام', desc: 'ادفع كاش لما يوصلك الطلب' },
  { value: 'fawry', icon: Wallet, label: 'فوري', desc: 'ادفع من أي منفذ فوري بكود الطلب' },
  { value: 'valu', icon: CreditCard, label: 'تقسيط valU', desc: 'قسّط طلبك على دفعات مع valU' },
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
}

export function CheckoutPage() {
  const { items, subtotal, printFees, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{ id: string; method: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postal: '',
  });

  const setField = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'مطلوب';
    if (!form.lastName.trim()) newErrors.lastName = 'مطلوب';
    if (!form.email.trim()) newErrors.email = 'مطلوب';
    if (!form.phone.trim()) newErrors.phone = 'مطلوب';
    if (!form.address.trim()) newErrors.address = 'مطلوب';
    if (!form.city.trim()) newErrors.city = 'مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('من فضلك صحّح البيانات المطلوبة');
      return;
    }
    setSubmitting(true);
    try {
      const orderPayload = {
        customer_name: `${form.firstName} ${form.lastName}`,
        customer_email: form.email,
        customer_phone: form.phone,
        items,
        total_price: total,
        currency: 'EGP',
        status: 'pending' as const,
        shipping_address: form.address,
        city: form.city,
        payment_method: paymentMethod,
        payment_status: 'unpaid' as const,
      };

      let orderId = `OZ-${Date.now().toString().slice(-6)}`;

      if (supabase) {
        const { data, error } = await supabase.from('orders').insert([orderPayload]).select('id').single();
        if (error) throw error;
        if (data?.id) orderId = String(data.id);
      } else {
        await new Promise(res => setTimeout(res, 700));
      }

      clearCart();
      setPlacedOrder({ id: orderId, method: paymentMethod });
      toast.success('اتبعت الطلب بنجاح!');
    } catch (err) {
      toast.error('في مشكلة. حاول تاني.');
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    const method = PAYMENT_METHODS.find(m => m.value === placedOrder.method);
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md bg-card border border-border rounded-xl p-8 sm:p-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 className="w-9 h-9 text-green-500" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">تم استلام طلبك!</h1>
          <p className="text-muted-foreground mb-1">رقم الطلب</p>
          <p className="text-lg font-bold mb-5">#{placedOrder.id}</p>
          <p className="text-sm text-muted-foreground mb-6">
            هنتواصل معاك على {form.phone} لتأكيد الطلب{method ? ` — طريقة الدفع: ${method.label}` : ''}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Link to="/shop">كمّل التسوق</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">الرئيسية</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4">مفيش حاجة في العربية</h2>
          <p className="text-muted-foreground mb-8">ضيف قطع الأول عشان تكمّل الطلب</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link to="/shop">ابدأ التسوق</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>إتمام الطلب</h1>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-card p-6 sm:p-8 rounded-lg border border-border">
                <h3 className="mb-6 font-bold text-lg">بيانات الشحن</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field id="firstName" label="الاسم الأول" value={form.firstName} error={errors.firstName} onChange={v => setField('firstName', v)} />
                  <Field id="lastName" label="الاسم الأخير" value={form.lastName} error={errors.lastName} onChange={v => setField('lastName', v)} />
                  <div className="md:col-span-2">
                    <Field id="email" type="email" label="البريد الإلكتروني" value={form.email} error={errors.email} onChange={v => setField('email', v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field id="phone" type="tel" label="رقم الموبايل" placeholder="01XXXXXXXXX" value={form.phone} error={errors.phone} onChange={v => setField('phone', v)} />
                  </div>
                  <div className="md:col-span-2">
                    <Field id="address" label="العنوان" value={form.address} error={errors.address} onChange={v => setField('address', v)} />
                  </div>
                  <Field id="city" label="المدينة" value={form.city} error={errors.city} onChange={v => setField('city', v)} />
                  <Field id="postal" label="الرمز البريدي (اختياري)" value={form.postal} onChange={v => setField('postal', v)} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-card p-6 sm:p-8 rounded-lg border border-border">
                <h3 className="mb-6 font-bold text-lg">طريقة الدفع</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map(opt => (
                      <label
                        key={opt.value}
                        htmlFor={opt.value}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === opt.value ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <opt.icon className="w-5 h-5 text-accent flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card p-6 sm:p-8 rounded-lg border border-border space-y-6">
                <h3 className="font-bold text-lg">ملخص الطلب</h3>
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.key} className="flex gap-3">
                      <CartItemImage item={item} className="w-14 h-14 rounded-md border border-border flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.color} • ×{item.quantity}
                        </p>
                        {item.custom && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-accent">
                            <Sparkles className="w-3 h-3" /> طباعة مخصصة +{item.custom.fee} ج
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-semibold whitespace-nowrap">{item.price * item.quantity} ج</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{subtotal} جنيه</span>
                  </div>
                  {printFees > 0 && (
                    <div className="flex justify-between text-accent">
                      <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> رسوم الطباعة</span>
                      <span>+{printFees} جنيه</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الشحن</span>
                    <span>مجاني</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>الإجمالي</span>
                    <span>{total} جنيه</span>
                  </div>
                </div>

                <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> جاري الإرسال...</>
                  ) : (
                    'تأكيد الطلب'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">بتأكيدك الطلب فإنك توافق على شروط ÖZEL.</p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}

function Field({ id, label, value, onChange, type = 'text', placeholder, error }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`mt-1 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}