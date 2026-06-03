import { Outlet } from 'react-router';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import { CartProvider } from '../../context/CartContext';
import { LanguageProvider } from '../../context/LanguageContext';

export function RootLayout() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}