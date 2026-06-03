import { motion } from 'motion/react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="uppercase tracking-[0.2em] mb-4" style={{ fontSize: '3rem', fontWeight: 600 }}>
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or want to collaborate? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-sm border border-border">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} required className="mt-1" />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider"
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-sm border border-border">
              <h3 className="uppercase tracking-wider mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                    <a href="mailto:hello@ozel.eg" className="hover:text-accent transition-colors">
                      hello@ozel.eg
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+201234567890" className="hover:text-accent transition-colors">
                      +20 123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Location</p>
                    <p>Cairo, Egypt</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Instagram</p>
                    <a
                      href="https://instagram.com/ozel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      @ozel
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-sm border border-border">
              <h3 className="uppercase tracking-wider mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday - Thursday</span>
                  <span>9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friday</span>
                  <span>2:00 PM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
