import { Link } from 'react-router';
import { Instagram, Mail, MessageCircle, MapPin } from 'lucide-react';
import logoImage from '../../imports/WhatsApp_Image_2026-06-03_at_1.33.15_PM.jpeg';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImage} alt="ÖZEL" className="h-14 w-auto" />
              <span className="font-display text-2xl font-bold tracking-[0.2em]">ÖZEL</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              مصنع طباعة مخصص ويونيفورم في مصر. اختار قطعتك وضيف طباعتك. أي كمية من قطعة لـ 1000+.
            </p>
          </div>

          <div>
            <h4 className="font-bold tracking-wide mb-4 text-sm">المتجر</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground transition-colors">كل المنتجات</Link></li>
              <li><Link to="/shop/uniform" className="hover:text-foreground transition-colors">يونيفورم</Link></li>
              <li><Link to="/shop/summer-2026" className="hover:text-foreground transition-colors">صيف 2026</Link></li>
              <li><Link to="/shop/winter-2026" className="hover:text-foreground transition-colors">شتا 2026</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold tracking-wide mb-4 text-sm">الشركة</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">تواصل معنا</Link></li>
              <li>
                <a href="https://wa.me/201044892192" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  أسعار الجملة
                </a>
              </li>
              <li><Link to="/admin" className="hover:text-foreground transition-colors">Admin</Link></li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> القاهرة، مصر</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold tracking-wide mb-4 text-sm">تواصل</h4>
            <div className="flex gap-3">
              <a href="https://wa.me/201044892192" target="_blank" rel="noopener noreferrer" aria-label="واتساب" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/ozel" target="_blank" rel="noopener noreferrer" aria-label="انستجرام" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:hello@ozel.eg" aria-label="إيميل" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ÖZEL — Made with good hands. صناعة مصرية بمعايير عالمية.</p>
        </div>
      </div>
    </footer>
  );
}
