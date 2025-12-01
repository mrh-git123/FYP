export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  category?: string;
  tags?: string[];
  images: string[];
  stock: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: Address;
};

export type Address = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type CartProduct = Pick<Product, '_id' | 'name' | 'price' | 'salePrice' | 'images' | 'stock'>;

export type CartItem = {
  product: CartProduct;
  quantity: number;
  lineTotal: number;
};

export type CartResponse = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export type OrderItem = {
  product: string | CartProduct;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentStatus: string;
  status: string;
  trackingNumber?: string;
  createdAt: string;
  statusTimeline: { status: string; note?: string; changedAt: string }[];
};
