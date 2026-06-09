import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../../imports/WhatsApp_Image_2026-06-03_at_1.33.15_PM.jpeg';

const links = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/shop', label: 'المتجر' },
  { to: '/shop/uniform', label: 'يونيفورم' },
  { to: '/shop/winter-2026', label: 'شتا 2026' },
  { to: '/contact', label: 'تواصل' },
];

export function Navigation() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logoImage}
              alt="ÖZEL"
              className="h-11 w-auto transition-transform group-hover:scale-105"
            />
            <span className="hidden sm:block font-display text-2xl font-bold tracking-[0.2em] leading-none">
              ÖZEL
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative text-sm font-semibold tracking-wide transition-colors hover:text-foreground ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  } after:absolute after:-bottom-1.5 after:inset-x-0 after:h-px after:bg-accent after:transition-transform after:duration-300 ${
                    isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="العربية">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-semibold tracking-wide py-3 border-b border-border/50 last:border-0 transition-colors ${
                      isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
