import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let identifier = formData.emailOrPhone.trim();
      let isEmail = identifier.includes('@');

      let authPayload = {};
      
      if (isEmail) {
        authPayload = { email: identifier, password: formData.password };
      } else {
        // User entered a normal name or phone number. Supabase Auth requires an email,
        // and Phone signups are disabled in Supabase, so we generate a virtual one
        const virtualEmail = `${identifier.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}@photostudio.local`;
        authPayload = { email: virtualEmail, password: formData.password };
      }

      let data, error;

      if (isLogin) {
        // Sign In
        const response = await supabase.auth.signInWithPassword(authPayload);
        data = response.data;
        error = response.error;
      } else {
        // Sign Up
        const signUpPayload = { ...authPayload };
        if (formData.username) {
          signUpPayload.options = { data: { username: formData.username } };
        }
        const response = await supabase.auth.signUp(signUpPayload);
        data = response.data;
        error = response.error;
      }

      if (error) {
        throw error;
      }

      // Store in simple format to keep compatibility with Navbar code
      const userInfo = {
        _id: data.user.id,
        emailOrPhone: formData.emailOrPhone,
        username: data.user.user_metadata?.username || formData.username,
        token: data.session?.access_token
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-10 relative z-10 shadow-xl">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-700 font-semibold font-mono">
            Hariom Studio
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
            {isLogin ? 'Client Portal' : 'Create Account'}
          </h2>
          <p className="text-xs text-stone-500 mt-1.5">
            {isLogin 
              ? 'Sign in to review your bookings and photography orders' 
              : 'Register to manage session inquiries and wedding dates'}
          </p>
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-6 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2 font-mono">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all text-sm"
                placeholder="Aditya Kumar"
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2 font-mono">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all text-sm"
              placeholder="name@example.com / 9876543210"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2 font-mono">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-gold w-full py-3.5 rounded-xl font-bold tracking-wide flex justify-center items-center shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-[0.99] transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Studio Account')}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-stone-100">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-xs sm:text-sm text-stone-500 hover:text-stone-900 font-medium transition-colors"
          >
            {isLogin 
              ? "Don't have an account yet? Register here" 
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
