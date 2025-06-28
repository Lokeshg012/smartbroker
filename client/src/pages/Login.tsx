
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Login to Smart Broker</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="bg-gray-200 rounded-2xl p-12 mb-8 text-center">
            <div className="w-16 h-16 bg-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-600 font-medium">
              Your trusted AI<br />
              companion for finding<br />
              homes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-2">Welcome back 👋</h2>
            
            <div className="space-y-4">
              {/* Email/Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Phone
                </label>
                <Input
                  type="text"
                  placeholder="your@example.com or 000-000-000"
                  className="w-full"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3">
                {isSignUp ? 'Sign Up' : 'Login'}
              </Button>

              {/* Divider */}
              <div className="text-center text-gray-500">or</div>

              {/* Google Button */}
              <Button variant="outline" className="w-full py-3">
                Continue with Google
              </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <a href="#" className="text-teal-500 text-sm">
                  Forgot Password?
                </a>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-teal-500 font-medium"
                >
                  {isSignUp ? 'Login' : 'Sign Up'}
                </button>
              </div>

              {/* Security Text */}
              <div className="text-center text-xs text-gray-500 mt-4">
                🔒 100% secure • No spam • Trusted by 50K+ users.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
