import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, DollarSign, Lock, CheckCircle, Printer, Box, Truck, ShoppingBag, Plus, Trash2, Upload, X, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useOrders, Order } from '../../lib/useOrders';
import { useProducts } from '../../lib/useProducts';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'ozel2026';

const statusConfig = {
  pending: { label: 'Pending', icon: Box, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  printing: { label: 'Printing', icon: Printer, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ready: { label: 'Ready', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
} as const;

const emptyForm = { name: '', price: '', description: '', collection: 'uniform', category: '', images: '', sizes: '', colors: '', featured: false };

function OrderModal({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h2>
              <p className="text-sm text-muted-foreground">{order.customer_name} - {order.customer_phone}</p>
              <p className="text-xs text-muted-foreground">{order.city} - {order.shipping_address}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Items Ordered</h3>
            {(order.items || []).map((item: any, i: number) => (
              <div key={i} className="bg-background border border-border rounded-lg p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted border border-border">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl opacity-20">
                        {item.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium mt-1">{item.price * item.quantity} EGP</p>
                  </div>
                </div>

                {item.custom && (
                  <div className="border border-accent/30 rounded-lg p-4 bg-accent/5 space-y-3">
                    <p className="text-sm font-bold text-accent flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Custom Print Details
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Scale: <span className="text-foreground font-medium">{item.custom.scale}%</span></p>
                      <p>Position: X={Math.round(item.custom.x)}px Y={Math.round(item.custom.y)}px</p>
                      <p>Print fee: <span className="text-accent font-bold">+{item.custom.fee} EGP</span></p>
                    </div>
                    {item.custom.design ? (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Design File</p>
                        <div className="bg-white rounded-lg p-4 flex items-center justify-center border border-border">
                          <img
                            src={item.custom.design}
                            alt="Customer design"
                            className="max-h-64 max-w-full object-contain"
                          />
                        </div>
                        <a
                          <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = item.custom.design;
                            link.download = ['design', order.id.slice(0, 8), 'item' + String(i + 1)].join('-') + '.png';
                            link.click();
                          }}
                          className="inline-flex items-center gap-2 text-xs text-accent hover:underline font-medium"
                        >
                          Download design file
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">No design file saved</p>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-border pt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Payment: <span className="font-medium text-foreground">{order.payment_method}</span>
                {' - '}
                <span className={order.payment_status === 'paid' ? 'text-green-500' : 'text-yellow-500'}>
                  {order.payment_status}
                </span>
              </div>
              <p className="font-bold text-lg">{order.total_price} EGP</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { products, loading: productsLoading, addProduct, deleteProduct } = useProducts();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { setIsAuthenticated(true); setAuthError(''); }
    else setAuthError('Wrong password');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingImages(true);
    try {
      const urls = await Promise.all(files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );
        const data = await res.json();
        return data.secure_url as string;
      }));
      const existing = form.images ? form.images.split(',').filter(Boolean) : [];
      setForm({ ...form, images: [...existing, ...urls].join(',') });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    const imgs = form.images.split(',').filter((_, i) => i !== index).join(',');
    setForm({ ...form, images: imgs });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    const sizes = form.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const images = form.images.split(',').map(s => s.trim()).filter(Boolean);
    const colors = form.colors.split(',').map(s => {
      const parts = s.trim().split(':');
      return { name: parts[0].trim(), value: parts[1]?.trim() || '#000000' };
    }).filter(c => c.name);
    const error = await addProduct({
      name: form.name, price: Number(form.price), description: form.description,
      collection: form.collection as any, category: form.category,
      images, sizes, colors, featured: form.featured,
    });
    setSaving(false);
    if (error) setSaveMsg('Error: ' + error.message);
    else { setSaveMsg('Product added!'); setForm(emptyForm); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    const error = await deleteProduct(id);
    if (error) toast.error('Error: ' + error.message);
    else toast.success('Product deleted');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card p-8 rounded-sm border border-border">
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 mx-auto text-accent mb-4" />
              <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Admin Access</h1>
              <p className="text-muted-foreground">Enter password to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1" autoFocus />
              </div>
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider">Login</Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-500' },
    { title: 'Total Revenue', value: `${orders.reduce((s, o) => s + Number(o.total_price || 0), 0).toFixed(0)} EGP`, icon: DollarSign, color: 'text-green-500' },
    { title: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: Box, color: 'text-yellow-500' },
    { title: 'Products', value: products.length, icon: ShoppingBag, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="uppercase tracking-[0.2em] mb-2" style={{ fontSize: '3rem', fontWeight: 600 }}>Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your OZEL store</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm uppercase tracking-wider">{stat.title}</CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent><div className="text-2xl font-bold">{stat.value}</div></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mb-8 border-b border-border">
            {[
              { key: 'orders', label: 'Orders', icon: Package },
              { key: 'products', label: 'Products', icon: ShoppingBag },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 uppercase tracking-wider text-sm transition-colors flex items-center gap-2 ${activeTab === tab.key ? 'border-b-2 border-accent text-accent' : 'text-muted-foreground hover:text-foreground'}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'orders' && (
            <div className="bg-card rounded-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="uppercase tracking-wider">Orders</h3>
                <p className="text-xs text-muted-foreground mt-1">Click any row to view order details</p>
              </div>
              {ordersLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No orders yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left text-sm uppercase tracking-wider text-muted-foreground">
                        <th className="p-4">ID</th><th className="p-4">Customer</th><th className="p-4">Items</th>
                        <th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Payment</th><th className="p-4">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr
                          key={order.id}
                          className="border-b border-border hover:bg-muted/50 cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="p-4 text-sm font-mono">{order.id.slice(0, 8)}...</td>
                          <td className="p-4">
                            <div>{order.customer_name}</div>
                            <div className="text-xs text-muted-foreground">{order.customer_phone}</div>
                            <div className="text-xs text-muted-foreground">{order.city}</div>
                          </td>
                          <td className="p-4 text-sm">{order.items?.length || 0} items</td>
                          <td className="p-4 font-medium">{order.total_price} EGP</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                              {statusConfig[order.status].label}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${order.payment_status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {order.payment_status}
                            </span>
                          </td>
                          <td className="p-4" onClick={e => e.stopPropagation()}>
                            <Select value={order.status} onValueChange={val => updateOrderStatus(order.id, val as Order['status'])}>
                              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {Object.entries(statusConfig).map(([key, config]) => (
                                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
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
          )}

          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="bg-card rounded-sm border border-border p-8 max-w-2xl">
                <h3 className="uppercase tracking-wider mb-6 flex items-center gap-2"><Plus className="w-4 h-4" />Add New Product</h3>
                <form onSubmit={handleAddProduct} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Product Name</Label>
                      <Input className="mt-1" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Classic Polo" />
                    </div>
                    <div>
                      <Label>Price (EGP)</Label>
                      <Input className="mt-1" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="450" />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input className="mt-1" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Premium cotton..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Collection</Label>
                      <Select value={form.collection} onValueChange={val => setForm({...form, collection: val})}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uniform">Uniform</SelectItem>
                          <SelectItem value="summer-2026">Summer 2026</SelectItem>
                          <SelectItem value="winter-2026">Winter 2026</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input className="mt-1" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required placeholder="Shirts" />
                    </div>
                  </div>
                  <div>
                    <Label>Sizes <span className="text-muted-foreground text-xs">(comma separated)</span></Label>
                    <Input className="mt-1" value={form.sizes} onChange={e => setForm({...form, sizes: e.target.value})} placeholder="S, M, L, XL, XXL" />
                  </div>
                  <div>
                    <Label>Colors <span className="text-muted-foreground text-xs">(Name:#hex)</span></Label>
                    <Input className="mt-1" value={form.colors} onChange={e => setForm({...form, colors: e.target.value})} placeholder="Black:#000000, White:#ffffff" />
                  </div>
                  <div>
                    <Label>Product Images</Label>
                    <div className="mt-1 space-y-3">
                      <label className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-border rounded-sm cursor-pointer hover:border-accent transition-colors">
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {uploadingImages ? 'Uploading...' : 'Click to upload images'}
                        </span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploadingImages} />
                      </label>
                      {form.images && (
                        <div className="flex flex-wrap gap-2">
                          {form.images.split(',').filter(Boolean).map((url, i) => (
                            <div key={i} className="relative w-20 h-20 group">
                              <img src={url.trim()} alt="" className="w-full h-full object-cover rounded-sm" />
                              <button type="button" onClick={() => removeImage(i)}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">x</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 accent-red-600" />
                    <Label htmlFor="featured">Featured on homepage</Label>
                  </div>
                  {saveMsg && <p className={`text-sm ${saveMsg.startsWith('Product') ? 'text-green-500' : 'text-red-500'}`}>{saveMsg}</p>}
                  <Button type="submit" disabled={saving || uploadingImages} className="w-full bg-accent hover:bg-accent/90 uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" />{saving ? 'Saving...' : 'Add Product'}
                  </Button>
                </form>
              </div>

              <div className="bg-card rounded-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border"><h3 className="uppercase tracking-wider">All Products ({products.length})</h3></div>
                {productsLoading ? (
                  <div className="p-8 text-center text-muted-foreground">Loading...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr className="text-left text-sm uppercase tracking-wider text-muted-foreground">
                          <th className="p-4">Image</th><th className="p-4">Name</th><th className="p-4">Category</th>
                          <th className="p-4">Collection</th><th className="p-4">Price</th><th className="p-4">Featured</th><th className="p-4">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                            <td className="p-4">
                              {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-sm" />
                              ) : (
                                <div className="w-12 h-12 bg-muted rounded-sm flex items-center justify-center text-xs text-muted-foreground">No img</div>
                              )}
                            </td>
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                            <td className="p-4 text-sm text-muted-foreground">{product.collection}</td>
                            <td className="p-4">{product.price} EGP</td>
                            <td className="p-4">
                              {product.featured ? <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Featured</span> : <span className="text-muted-foreground text-xs">-</span>}
                            </td>
                            <td className="p-4">
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(product.id, product.name)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}

