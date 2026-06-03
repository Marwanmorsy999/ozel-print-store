import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useArabic } from './context/useArabic';

export default function App() {
  useArabic();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
      <WhatsAppFloat />
    </>
  );
}