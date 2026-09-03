import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/ui';
import Toast from '../components/Toast';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      setToast({ type: 'success', message: `Welcome back, Chef! 👨‍🍳` });
      setTimeout(() => navigate('/generate'), 1500);
    } else {
      setToast({ type: 'error', message: result.error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 inline-block">👨‍🍳</div>
          <h1 className="text-4xl font-bold font-header text-charcoal mb-2">
            Welcome Back!
          </h1>
          <p className="text-charcoal-light">
            Sign in to continue creating delicious recipes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            placeholder="you@example.com"
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            placeholder="••••••••"
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            loading={loading}
            disabled={loading}
          >
            {!loading && <LogIn size={20} />}
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-charcoal">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-fresh-green hover:text-fresh-green-dark transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </Card>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
