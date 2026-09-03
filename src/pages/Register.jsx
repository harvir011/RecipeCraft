import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/ui';
import Toast from '../components/Toast';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (name && name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    const result = await register(name, email, password);
    if (result.success) {
      setToast({ type: 'success', message: `Welcome to the kitchen, ${name}! 🎉` });
      setTimeout(() => navigate('/generate'), 1500);
    } else {
      setToast({ type: 'error', message: result.error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 inline-block">🍳</div>
          <h1 className="text-4xl font-bold font-header text-charcoal mb-2">
            Join the Kitchen!
          </h1>
          <p className="text-charcoal-light">
            Start creating amazing recipes with AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            placeholder="John Doe"
            disabled={loading}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            error={errors.confirmPassword}
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
            {!loading && <UserPlus size={20} />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-charcoal">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-fresh-green hover:text-fresh-green-dark transition-colors">
              Sign in here
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
