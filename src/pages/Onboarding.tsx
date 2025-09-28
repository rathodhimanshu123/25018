import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HeartPulse, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Onboarding = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate authentication
      console.log(isLogin ? 'Login' : 'Signup', formData);
      navigate('/home');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo and Brand */}
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-slate-900 border-2 border-green-500/30 rounded-full">
                <HeartPulse className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-slate-50">
                NabhaCare
            </h1>
            <p className="text-slate-400 mt-2">
                Connecting Rural Communities to Quality Healthcare
            </p>
        </div>

        {/* Authentication Form */}
        <Card className="bg-slate-900 border-slate-800 rounded-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-50">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <p className="text-slate-400">
              {isLogin ? 'Sign in to continue to NabhaCare' : 'Join NabhaCare to access healthcare services'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for signup only */}
              {!isLogin && (
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 h-12 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                </div>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 h-12 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 h-12 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
              </div>

              {/* Confirm Password field for signup only */}
              {!isLogin && (
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 h-12 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {/* Toggle between Login and Signup */}
            <div className="text-center">
              <p className="text-slate-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleAuthMode}
                  className="ml-2 text-green-500 hover:text-green-400 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-center">
                <button className="text-green-500 hover:text-green-400 text-sm font-medium transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Onboarding;

