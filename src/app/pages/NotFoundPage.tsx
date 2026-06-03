import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="mb-4" style={{ fontSize: '8rem', fontWeight: 700, lineHeight: 1 }}>404</h1>
        <h2 className="uppercase tracking-[0.2em] mb-4 text-2xl">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 uppercase tracking-wider">
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
