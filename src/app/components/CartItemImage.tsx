import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CartItem } from '../context/CartContext';

interface CartItemImageProps {
  item: CartItem;
  className?: string;
}

/**
 * Renders a cart line's garment image, with the uploaded custom design
 * overlaid (mirroring the live mockup) when the item is a custom print.
 */
export function CartItemImage({ item, className = '' }: CartItemImageProps) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {item.image ? (
        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl opacity-20 font-display">{item.name[0]}</span>
        </div>
      )}

      {item.custom?.design && (
        <img
          src={item.custom.design}
          alt="التصميم المخصص"
          draggable={false}
          style={{
            position: 'absolute',
            left: `${item.custom.x}%`,
            top: `${item.custom.y}%`,
            width: `${item.custom.scale}%`,
            transform: `translate(-50%, -50%) rotate(${item.custom.rotation}deg)`,
            mixBlendMode: 'multiply',
          }}
          className="pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
        />
      )}
    </div>
  );
}
