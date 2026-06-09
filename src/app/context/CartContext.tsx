import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Extra fee (EGP) added per unit for a custom-printed garment.
export const CUSTOM_PRINT_FEE = 75;

export interface CustomPrint {
  /** Data URL of the uploaded design (saved with the order). */
  design: string;
  /** Position of the design within the mockup, as percentages. */
  x: number;
  y: number;
  /** Design width as a percentage of the garment width. */
  scale: number;
  /** Rotation in degrees. */
  rotation: number;
  /** Print fee per unit. */
  fee: number;
}

export interface CartItem {
  /** Unique per cart line. Regular items merge by id+size+color; custom items are always distinct. */
  key: string;
  id: string;
  name: string;
  /** Unit price including any custom-print fee. */
  price: number;
  /** Garment price before the custom-print fee. */
  basePrice: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  custom?: CustomPrint;
}

export type NewCartItem = Omit<CartItem, 'key' | 'quantity' | 'price'> & {
  price?: number;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: NewCartItem, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  printFees: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ozel-cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / serialization errors */
    }
  }, [items]);

  const addItem = (newItem: NewCartItem, quantity = 1) => {
    const basePrice = newItem.basePrice;
    const unitPrice = newItem.price ?? basePrice + (newItem.custom?.fee ?? 0);

    setItems(prev => {
      // Custom items are always a new line so different designs never merge.
      if (!newItem.custom) {
        const existingIndex = prev.findIndex(
          item =>
            !item.custom &&
            item.id === newItem.id &&
            item.size === newItem.size &&
            item.color === newItem.color
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
      }

      const key =
        `${newItem.id}|${newItem.size}|${newItem.color}` +
        (newItem.custom ? `|custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` : '');

      return [...prev, { ...newItem, key, price: unitPrice, basePrice, quantity }];
    });
  };

  const removeItem = (key: string) => {
    setItems(prev => prev.filter(item => item.key !== key));
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(key);
      return;
    }
    setItems(prev => prev.map(item => (item.key === key ? { ...item, quantity } : item)));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.basePrice * item.quantity, 0);
  const printFees = items.reduce((sum, item) => sum + (item.custom?.fee ?? 0) * item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, printFees, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
