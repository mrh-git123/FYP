import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import adminApi from '../api/client';
import type { Product } from '../types';

// Categories must match backend seed data
const categories = [
  'Bags',
  'Electronics',
  'Home',
  'Shoes'
];

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  salePrice: '',
  category: '',
  stock: '',
  images: '',
  tags: '',
  isFeatured: false,
};

type FormValues = typeof emptyProduct;

const ProductsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [generatingDesc, setGeneratingDesc] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data: response } = await adminApi.get<{ products: Product[] }>('/products', {
        params: { limit: 100 },
      });
      return response.products;
    },
  });

  const form = useForm<FormValues>({ defaultValues: emptyProduct });

  const saveProduct = useMutation({
    mutationFn: (payload: Partial<Product>) =>
      editing ? adminApi.put(`/products/${editing._id}`, payload) : adminApi.post('/products', payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setDrawerOpen(false);
      setEditing(null);
      form.reset(emptyProduct);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const openDrawer = (product?: Product) => {
    if (product) {
      setEditing(product);
      form.reset({
        name: product.name,
        description: product.description,
        price: String(product.price),
        salePrice: product.salePrice ? String(product.salePrice) : '',
        category: product.category ?? '',
        stock: String(product.stock ?? 0),
        images: product.images?.join(', ') ?? '',
        tags: product.tags?.join(', ') ?? '',
        isFeatured: Boolean(product.isFeatured),
      });
    } else {
      setEditing(null);
      form.reset(emptyProduct);
    }
    setDrawerOpen(true);
  };

  const generateDescription = async () => {
    const name = form.getValues('name');
    const category = form.getValues('category');
    const tags = form.getValues('tags');

    if (!name) {
      alert('Please enter a product name first');
      return;
    }

    setGeneratingDesc(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Write a compelling product description for an e-commerce website.

Product Name: ${name}
Category: ${category || 'General'}
Tags: ${tags || 'N/A'}

Requirements:
- 2-3 paragraphs (100-150 words total)
- Highlight key features and benefits
- Use persuasive, engaging language
- SEO-friendly with natural keywords
- Professional tone suitable for online shopping

Write only the description, no extra formatting or labels.`;

      const result = await model.generateContent(prompt);
      const description = result.response.text();
      form.setValue('description', description);
    } catch (error) {
      console.error('AI Generation Error:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      setGeneratingDesc(false);
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const payload: Partial<Product> = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      salePrice: values.salePrice ? Number(values.salePrice) : undefined,
      category: values.category,
      stock: Number(values.stock || 0),
      images: values.images ? values.images.split(',').map((img) => img.trim()).filter(Boolean) : [],
      tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      isFeatured: values.isFeatured,
    };
    await saveProduct.mutateAsync(payload);
  });

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Products</p>
          <h3>Catalog management</h3>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => openDrawer()}>
          <Plus size={16} />
          New product
        </button>
      </div>
      {isLoading ? (
        <div className="page-center">
          <div className="spinner" />
        </div>
      ) : (
        <div className="data-table product-table">
          <div className="table-head">
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Featured</span>
            <span>Actions</span>
          </div>
          {data?.map((product) => (
            <div key={product._id} className="table-row">
              <span>{product.name}</span>
              <span>{product.category}</span>
              <span>${product.salePrice ?? product.price}</span>
              <span>{product.stock}</span>
              <span>{product.isFeatured ? 'Yes' : 'No'}</span>
              <div className="row-actions">
                <button type="button" className="btn-icon" onClick={() => openDrawer(product)}>
                  <Pencil size={16} />
                </button>
                <button type="button" className="btn-icon" onClick={() => deleteProduct.mutate(product._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {drawerOpen && (
        <div className="drawer" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setDrawerOpen(false);
            setEditing(null);
            form.reset(emptyProduct);
          }
        }}>
          <div className="drawer-card card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{editing ? 'Edit product' : 'New product'}</p>
                <h3>{editing ? editing.name : 'Create a product'}</h3>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setDrawerOpen(false);
                  setEditing(null);
                  form.reset(emptyProduct);
                }}
              >
                Close
              </button>
            </div>
            <form onSubmit={onSubmit} className="product-form">
              <div className="form-section">
                <h4 className="form-section-title">Basic Information</h4>
                <div className="form-row">
                  <label className="form-field">
                    <span className="field-label">Product Name <span className="required">*</span></span>
                    <input type="text" placeholder="Enter product name" {...form.register('name')} required />
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-field full">
                    <div className="field-label-with-action">
                      <span className="field-label">Description</span>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-ai"
                        onClick={generateDescription}
                        disabled={generatingDesc}
                      >
                        <Sparkles size={14} />
                        {generatingDesc ? 'Generating...' : 'Generate with AI'}
                      </button>
                    </div>
                    <textarea rows={6} placeholder="Describe your product..." {...form.register('description')} />
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Pricing & Inventory</h4>
                <div className="form-row">
                  <label className="form-field">
                    <span className="field-label">Price <span className="required">*</span></span>
                    <input type="number" step="0.01" min="0" placeholder="0.00" {...form.register('price')} required />
                  </label>
                  <label className="form-field">
                    <span className="field-label">Sale Price</span>
                    <input type="number" step="0.01" min="0" placeholder="0.00" {...form.register('salePrice')} />
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-field">
                    <span className="field-label">Category</span>
                    <select {...form.register('category')}>
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-field">
                    <span className="field-label">Stock</span>
                    <input type="number" min="0" placeholder="0" {...form.register('stock')} />
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Media & Tags</h4>
                <div className="form-row">
                  <label className="form-field full">
                    <span className="field-label">Image URLs</span>
                    <textarea 
                      rows={3} 
                      placeholder="Enter image URLs separated by commas&#10;Example: https://image1.com, https://image2.com" 
                      {...form.register('images')} 
                    />
                    <span className="field-hint">Separate multiple URLs with commas</span>
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-field full">
                    <span className="field-label">Tags</span>
                    <input 
                      type="text" 
                      placeholder="trending, sale, new-arrival" 
                      {...form.register('tags')} 
                    />
                    <span className="field-hint">Separate tags with commas</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <label className="toggle-field">
                  <input type="checkbox" {...form.register('isFeatured')} />
                  <span className="toggle-label">
                    <strong>Mark as featured</strong>
                    <small>Featured products appear on the homepage</small>
                  </span>
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => {
                    setDrawerOpen(false);
                    setEditing(null);
                    form.reset(emptyProduct);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saveProduct.isPending}>
                  {saveProduct.isPending ? 'Saving…' : (editing ? 'Update Product' : 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
