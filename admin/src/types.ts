export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt?: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category?: string;
  stock: number;
  images: string[];
  tags?: string[];
  isFeatured?: boolean;
  createdAt?: string;
};

export type OrderItem = {
  product: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  user: { _id: string; name: string; email: string } | string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  paymentStatus: string;
  trackingNumber?: string;
  createdAt: string;
};

export type DashboardOverview = {
  usersCount: number;
  productsCount: number;
  ordersCount: number;
  revenue: number;
  pendingOrders: number;
  recentOrders: Order[];
};
