import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/201044892192"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}