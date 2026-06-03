import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
      <WhatsAppFloat />
    </>
  );
}