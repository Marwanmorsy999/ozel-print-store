import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Banknote, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export function CheckoutPage() {
  const { items, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('اتبعت الطلب بنجاح!');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 600 }}>إتمام الطلب</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card p-8 rounded-sm border border-border"
              >
                <h3 className="mb-6">بيانات الشحن</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input id="firstName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input id="lastName" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">رقم الموبايل</Label>
                    <Input id="phone" type="tel" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">المدينة</Label>
                    <Input id="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="postal">الرمز البريدي</Label>
                    <Input id="postal" className="mt-1" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card p-8 rounded-sm border border-border"
              >
                <h3 className="mb-6">طريقة الدفع</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-sm cursor-pointer hover:border-accent transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="w-5 h-5" />
                        <span>الدفع عند الاستلام</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-sm cursor-pointer hover:border-accent transition-colors">
                      <RadioGroupItem value="fawry" id="fawry" />
                      <Label htmlFor="fawry" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Wallet className="w-5 h-5" />
                        <span>فوري</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-sm cursor-pointer hover:border-accent transition-colors">
                      <RadioGroupItem value="valu" id="valu" />
                      <Label htmlFor="valu" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5" />
                        <span>تقسيط فاليو</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-card p-8 rounded-sm border border-border space-y-6">
                <h3>ملخص الطلب</h3>

                <div className="space-y-3">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
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

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider"
                >
                  تأكيد الطلب
                </Button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}