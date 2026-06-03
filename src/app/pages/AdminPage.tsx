import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Package, TrendingUp, Users, DollarSign, Lock } from 'lucide-react';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const ADMIN_PASSWORD = 'ozel2026'; // Change this to your preferred password

export function AdminPage() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
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
            <p className="text-xs text-muted-foreground text-center mt-4">
              Default password: ozel2026 (change in code)
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500' },
    { title: 'Total Revenue', value: '15,750 EGP', icon: DollarSign, color: 'text-green-500' },
    { title: 'Total Orders', value: '23', icon: TrendingUp, color: 'text-accent' },
    { title: 'Customers', value: '18', icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '3rem', fontWeight: 600 }}>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Manage your ÖZEL store</p>
            </div>
            <Button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="bg-accent hover:bg-accent/90 uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
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
                    <stat.icon className={w-4 h-4 } />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {showAddProduct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-card p-8 rounded-sm border border-border mb-12"
            >
              <h3 className="uppercase tracking-wider mb-6">Add New Product</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Classic Uniform Shirt" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (EGP)</Label>
                    <Input id="price" type="number" placeholder="450" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={4} className="mt-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="collection">Collection</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select collection" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uniform">Uniform</SelectItem>
                        <SelectItem value="summer-2026">Summer 2026</SelectItem>
                        <SelectItem value="winter-2026">Winter 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Shirts" className="mt-1" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-accent hover:bg-accent/90 uppercase tracking-wider">
                    Add Product
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="bg-card rounded-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="uppercase tracking-wider">Product Inventory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left text-sm uppercase tracking-wider text-muted-foreground">
                    <th className="p-4">Product</th>
                    <th className="p-4">Collection</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">{product.name}</td>
                      <td className="p-4 text-sm text-muted-foreground capitalize">
                        {product.collection.replace('-', ' ')}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                      <td className="p-4">{product.price} EGP</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">
                          Active
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}