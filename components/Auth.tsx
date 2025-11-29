import React, { useState } from 'react';
import { UserRole } from '../types';
import { Mail, Lock, User, ArrowRight, Loader2, FileText } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, name: string) => void;
  onSwitchToSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Mock user name based on email
      const name = email.split('@')[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      onLogin(email, formattedName);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText className="text-indigo-600 w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome Back</h2>
      <p className="text-slate-500 text-center mb-8">Sign in to access the conference portal</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToSignUp}
          className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          Sign up
        </button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
           Demo Hint: Use an email containing "admin" to sign in as an Administrator.
        </p>
      </div>
    </div>
  );
};

interface SignUpFormProps {
  onSignUp: (name: string, email: string, role: UserRole) => void;
  onSwitchToLogin: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PARTICIPANT);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onSignUp(name, email, role);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Create Account</h2>
      <p className="text-slate-500 text-center mb-8">Join the conference community</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">I am a...</label>
           <div className="grid grid-cols-2 gap-3">
             <button
                type="button"
                onClick={() => setRole(UserRole.PARTICIPANT)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    role === UserRole.PARTICIPANT 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
             >
                Participant
             </button>
             <button
                type="button"
                onClick={() => setRole(UserRole.ADMIN)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    role === UserRole.ADMIN 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
             >
                Organizer
             </button>
           </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};