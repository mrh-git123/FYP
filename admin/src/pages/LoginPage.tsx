import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Credentials } from '../context/AuthContext';

const LoginPage = () => {
  const { login, user, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Credentials>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    try {
      await login(values);
      const redirect = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    }
  });

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') {
      navigate('/dashboard', { replace: true });
    }
  }, [authLoading, navigate, user]);

  return (
    <main className="login-screen">
      <div className="login-hero">
        <ShieldCheck size={32} />
        <h1>Stellar control center.</h1>
        <p>Manage catalog drops, fulfillment, and customers from a single pane of glass.</p>
      </div>
      <div className="card form-card">
        <h2>Admin login</h2>
        <p>Authenticate with your admin credentials.</p>
        <form onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input type="email" {...form.register('email', { required: true })} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" {...form.register('password', { required: true })} />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
