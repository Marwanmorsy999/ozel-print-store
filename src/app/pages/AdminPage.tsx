import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Package,
  DollarSign,
  Lock,
  CheckCircle,
  Printer,
  Box,
  Truck,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useOrders, Order } from '../../lib/useOrders';

const ADMIN_PASSWORD = 'ozel2026';

const statusConfig = {
  pending: { label: 'Pending', icon: Box, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  printing: { label: 'Printing', icon: Printer, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ready: { label: 'Ready', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
} as const;

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { orders, loading, updateOrderStatus } = useOrders();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Wrong password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card p-8 rounded-sm border border-border">
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 mx-auto text-accent mb-4" />
              <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                Admin Access
              </h1>
              <p className="text-muted-foreground">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider">
                Login
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-500' },
    {
      title: 'Total Revenue',
      value: `${orders.reduce((sum, o) => sum + Number(o.total_price || 0), 0).toFixed(0)} EGP`,
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Pending Orders',
      value: orders.filter((o) => o.status === 'pending').length,
      icon: Box,
      color: 'text-yellow-500',
    },
    {
      title: 'Paid Orders',
      value: orders.filter((o) => o.payment_status === 'paid').length,
      icon: CheckCircle,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '3rem', fontWeight: 600 }}>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Manage your ÖZEL store orders</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm uppercase tracking-wider">{stat.title}</CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="bg-card rounded-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="uppercase tracking-wider">Recent Orders</h3>
            </div>

            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No orders yet. When customers place orders, they&apos;ll appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="text-left text-sm uppercase tracking-wider text-muted-foreground">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-4 text-sm font-mono">{order.id.slice(0, 8)}...</td>
                        <td className="p-4">
                          <div>{order.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                        </td>
                        <td className="p-4 text-sm">
                          {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                        </td>
                        <td className="p-4 font-medium">{order.total_price} EGP</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}
                          >
                            {statusConfig[order.status].label}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.payment_status === 'paid'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                          >
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="p-4">
                          <Select
                            value={order.status}
                            onValueChange={(val) => updateOrderStatus(order.id, val as Order['status'])}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(([key, config]) => (
                                <SelectItem key={key} value={key}>
                                  {config.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}