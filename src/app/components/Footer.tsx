import { Link } from 'react-router';
import { Instagram, Mail } from 'lucide-react';
import logoImage from '../../imports/WhatsApp_Image_2026-06-03_at_1.33.15_PM.jpeg';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logoImage}
                alt="ÖZEL - Made with good hands"
                className="h-24 w-auto"
              />
            </Link>
          </div>

          <div>
            <h4 className="uppercase tracking-wider mb-4 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop/uniform" className="hover:text-foreground transition-colors">Uniform</Link></li>
              <li><Link to="/shop/summer-2026" className="hover:text-foreground transition-colors">Summer 2026</Link></li>
              <li><Link to="/shop/winter-2026" className="hover:text-foreground transition-colors">Winter 2026</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-wider mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-foreground transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-wider mb-4 text-sm">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/ozel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@ozel.eg"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ÖZEL. Egyptian Craftsmanship, Global Standards.</p>
        </div>
      </div>
    </footer>
  );
}
