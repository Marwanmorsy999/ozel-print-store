import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useArabic } from './context/useArabic';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  useArabic();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
      <WhatsAppFloat />
      <Analytics />
    </>
  );
}