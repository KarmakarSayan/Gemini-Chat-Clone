import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import useAppStore from '../store/appStore';
import { getCountryCodes } from '../api/countryService';
import styles from './LoginPage.module.css';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
// --- NEW --- Import all necessary icons
import { MessageCircle, Sun, Moon } from 'lucide-react';

const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Please select a country code'),
  phoneNumber: z.string().min(8, 'Please enter a valid phone number').max(15),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const LoginPage = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');
  const navigate = useNavigate();
  // --- NEW --- Get theme and toggleTheme from the store
  const { login, theme, toggleTheme } = useAppStore();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountryCodes();
        setCountries(data);
      } catch (error) {
        toast.error('Could not fetch country data.');
      }
    };
    fetchCountries();
  }, []);

  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm({ resolver: zodResolver(phoneSchema) });

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({ resolver: zodResolver(otpSchema) });

  const onPhoneSubmit = (data) => {
    setIsLoading(true);
    setFullPhoneNumber(`${data.countryCode}${data.phoneNumber}`);
    toast.success('Simulating OTP send...');
    
    setTimeout(() => {
      setShowOtp(true);
      setIsLoading(false);
      toast.success(`OTP sent! (Hint: it's 123456)`);
    }, 2000);
  };

  const onOtpSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      if (data.otp === '123456') {
        toast.success('Login successful!');
        login(fullPhoneNumber);
        navigate('/');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* --- NEW --- Add the theme toggle button here */}
      <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
        {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
      </button>

      <div className={styles.loginBox}>
        <div className={styles.iconWrapper}>
          <MessageCircle size={32} />
        </div>
        <h1 className={styles.title}>Welcome to Gemini</h1>
        <p className={styles.subtitle}>
          {!showOtp ? 'Sign in with your phone number' : `Enter the OTP sent to ${fullPhoneNumber}`}
        </p>

        {!showOtp ? (
          <form onSubmit={handlePhoneSubmit(onPhoneSubmit)} className={styles.form}>
            <div className={styles.phoneInputContainer}>
              <select {...registerPhone('countryCode')} className={styles.countrySelect}>
                <option value="">Code</option>
                {countries.map((c) => (
                  <option key={c.name} value={c.code}>{`${c.name} (${c.code})`}</option>
                ))}
              </select>
              <Input
                type="tel"
                placeholder="Phone Number"
                {...registerPhone('phoneNumber')}
                error={phoneErrors.phoneNumber}
              />
            </div>
            {phoneErrors.countryCode && <p className={styles.errorText}>{phoneErrors.countryCode.message}</p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send OTP'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit(onOtpSubmit)} className={styles.form}>
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              {...registerOtp('otp')}
              error={otpErrors.otp}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;