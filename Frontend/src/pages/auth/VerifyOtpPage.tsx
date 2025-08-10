import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, RefreshCw } from 'lucide-react';
import { useVerifyOtpMutation, useResendOtpMutation } from '../../store/api/authApi';
import { useAppDispatch } from '../../hooks/redux';
import { setCredentials } from '../../store/slices/authSlice';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState<number>(0);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
      return;
    }
    
    // Start countdown for resend OTP
    setCountdown(60);
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!otp) {
      newErrors.otp = 'OTP is required';
    } else if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'OTP must contain only numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await verifyOtp({ email, otp }).unwrap();
      dispatch(setCredentials({ user: result.data!.user, token: result.data!.token }));
      navigate('/dashboard');
    } catch (error: any) {
      setErrors({ submit: error.data?.message || 'OTP verification failed. Please try again.' });
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    try {
      await resendOtp({ email }).unwrap();
      setCountdown(60);
      setErrors({});
    } catch (error: any) {
      setErrors({ resend: error.data?.message || 'Failed to resend OTP. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                }}
                error={errors.otp}
                placeholder="123456"
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
              <p className="mt-2 text-xs text-gray-500 text-center">
                For demo purposes, enter any 6-digit number
              </p>
            </div>

            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{errors.submit}</div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isVerifying}
            >
              Verify Email
            </Button>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?
              </p>
              {countdown > 0 ? (
                <p className="text-sm text-gray-500 mt-1">
                  Resend in {countdown} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                >
                  {isResending && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>Resend OTP</span>
                </button>
              )}
            </div>

            {errors.resend && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{errors.resend}</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};