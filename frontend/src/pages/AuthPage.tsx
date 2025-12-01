import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthMode = 'login' | 'register';

const AuthForm = ({ mode, setMode }: { mode: AuthMode; setMode: React.Dispatch<React.SetStateAction<AuthMode>> }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onSubmit',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (mode === 'login') {
        await login({ email: values.email, password: values.password });
      } else {
        if (!values.name) {
          form.setError('name', { message: 'Name is required' });
          return;
        }
        await registerUser({ name: values.name, email: values.email, password: values.password });
      }

      const redirect = (location.state as { from?: Location })?.from?.pathname ?? '/';
      navigate(redirect, { replace: true });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Authentication failed. Please check your credentials.';
      form.setError('root', { message });
    }
  });

  return (
    <div className="card auth-card">
      <div className="auth-header">
        <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <p>
          {mode === 'login'
            ? 'Sign in to continue where you left off and pick up your saved carts.'
            : 'Join Stellar to access concierge support, curated drops, and tracked deliveries.'}
        </p>
      </div>
      <form onSubmit={onSubmit}>
        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Jane Doe"
              {...form.register('name')}
            />
            {form.formState.errors.name && <small className="error-message">{form.formState.errors.name.message}</small>}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="name@example.com"
            {...form.register('email')}
          />
          {form.formState.errors.email && <small className="error-message">{form.formState.errors.email.message}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            {...form.register('password')}
          />
          {form.formState.errors.password && <small className="error-message">{form.formState.errors.password.message}</small>}
        </div>
        {form.formState.errors.root && (
          <div className="error-alert">
            {form.formState.errors.root.message}
          </div>
        )}
        <button type="submit" className="btn btn-primary btn-block" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      <div className="auth-footer">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setMode((current) => (current === 'login' ? 'register' : 'login'))}
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Already a member? Sign in'}
        </button>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <main className="page auth-page">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <p className="eyebrow">Members</p>
          <h1>Checkout twice as fast and keep every order in sync.</h1>
          <p>
            Accounts unlock saved addresses, synchronized carts, and transparent tracking. Admins gain access to fulfillment metrics and
            live customer intel.
          </p>
        </div>
      </div>
      <AuthForm key={mode} mode={mode} setMode={setMode} />
    </main>
  );
};

export default AuthPage;
