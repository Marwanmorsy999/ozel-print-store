import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { products as staticProducts } from '../app/data/products';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  collection: string;
  category: string;
  images: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
  material?: string;
  featured?: boolean;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    // No Supabase configured (local/preview) -> use bundled catalog.
    if (!supabase) {
      setProducts(staticProducts as Product[]);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      // Fall back to bundled catalog if the table is empty.
      setProducts(data && data.length ? (data as Product[]) : (staticProducts as Product[]));
    } catch (err) {
      console.error('Error fetching products, falling back to static catalog:', err);
      setProducts(staticProducts as Product[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'> & { id?: string }) => {
    if (!supabase) return new Error('Supabase not configured');
    const id = product.id || product.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const { error } = await supabase.from('products').insert([{ ...product, id }]);
    if (!error) fetchProducts();
    return error;
  };

  const deleteProduct = async (id: string) => {
    if (!supabase) return new Error('Supabase not configured');
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
    return error;
  };

  return { products, loading, addProduct, deleteProduct, refetch: fetchProducts };
}
