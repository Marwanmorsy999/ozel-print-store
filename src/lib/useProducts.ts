import { useEffect, useState } from 'react';
import { supabase } from './supabase';

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
  featured?: boolean;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProducts((data as Product[]) || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'> & { id?: string }) => {
    const id = product.id || product.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const { error } = await supabase.from('products').insert([{ ...product, id }]);
    if (!error) fetchProducts();
    return error;
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
    return error;
  };

  return { products, loading, addProduct, deleteProduct, refetch: fetchProducts };
}