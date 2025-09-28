import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HeartPulse, Phone, Hash, User, Stethoscope, Shield } from "lucide-react";

const Onboarding = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'healthcare'>('patient');
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
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

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate authentication
      console.log(isLogin ? 'Login' : 'Signup', { ...formData, role: userRole });
      navigate('/home');
    }
  };

  const handleSendOtp = () => {
    if (!formData.mobileNumber) {
      setErrors({ mobileNumber: 'Please enter mobile number first' });
      return;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setErrors({ mobileNumber: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    
    // Simulate sending OTP
    setIsOtpSent(true);
    console.log('OTP sent to:', formData.mobileNumber);
  };

  const handleResendOtp = () => {
    // Simulate resending OTP
    console.log('OTP resent to:', formData.mobileNumber);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', mobileNumber: '', otp: '' });
    setErrors({});
    setIsOtpSent(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo and Brand */}
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-orange-100 border-2 border-orange-200 rounded-full">
                <HeartPulse className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
                NabhaCare
            </h1>
            <p className="text-gray-600 mt-2">
                Connecting Rural Communities to Quality Healthcare
            </p>
        </div>

        {/* Authentication Form */}
        <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue to NabhaCare' : 'Join NabhaCare to access healthcare services'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Login as:</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserRole('patient')}
                    className={`p-3 rounded-xl border-2 transition-colors duration-200 flex flex-col items-center justify-center space-y-1 ${
                      userRole === 'patient'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-700">Patient</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setUserRole('doctor')}
                    className={`p-3 rounded-xl border-2 transition-colors duration-200 flex flex-col items-center justify-center space-y-1 ${
                      userRole === 'doctor'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Stethoscope className="h-5 w-5 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-700">Doctor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserRole('healthcare')}
                    className={`p-3 rounded-xl border-2 transition-colors duration-200 flex flex-col items-center justify-center space-y-1 ${
                      userRole === 'healthcare'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="h-5 w-5 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-700">Healthcare Provider</span>
                  </button>
                </div>
              </div>

              {/* Name field for signup only */}
              {!isLogin && (
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
              )}

              {/* Mobile Number field */}
              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    maxLength={10}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl"
                  />
                </div>
                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
              </div>

              {/* OTP field */}
              <div className="space-y-2">
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    maxLength={6}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl"
                  />
                </div>
                {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
              >
                Verify & Sign In
              </Button>
            </form>

            {/* Resend OTP Link */}
            <div className="text-center">
              <button 
                onClick={handleResendOtp}
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
              >
                Didn't receive OTP? Resend
              </button>
            </div>

            {/* Toggle between Login and Signup */}
            <div className="text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleAuthMode}
                  className="ml-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Onboarding;

