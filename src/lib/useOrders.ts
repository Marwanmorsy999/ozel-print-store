import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  customer_whatsapp?: string | null;
  items: any[];
  total_price: number;
  currency: string;
  status: 'pending' | 'printing' | 'ready' | 'shipped' | 'completed';
  notes?: string | null;
  shipping_address?: string | null;
  city?: string | null;
  payment_method: string;
  payment_status: 'unpaid' | 'paid' | 'refunded';
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!supabase) {
      setOrders([]);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders((data as Order[]) || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (!error) fetchOrders();
  };

  return { orders, loading, updateOrderStatus, refetch: fetchOrders };
}