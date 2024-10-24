"use client";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useLanguage } from 'i18n/LanguageContext';

export default function SignUp() {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({}); 
  const [signupSuccess, setSignupSuccess] = useState(null);
  const router = useRouter();

  const handleSignUp = () => {
    let hasErrors = false;
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = 'Required';
      hasErrors = true;
    }
    if (!lastName) {
      newErrors.lastName = 'Required';
      hasErrors = true;
    }
    if (!email) {
      newErrors.email = 'Required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
        newErrors.email = 'Email is not valid';
        hasErrors = true;
    }

    if (!password) {
        newErrors.password = 'Required';
        hasErrors = true;
    } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
        hasErrors = true;
    }
    /* 
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Required';
      hasErrors = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    } */

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const user = { firstName, lastName, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    setSignupSuccess(true);
    alert('Your signup request has been sent.');

    router.push('/Confirmation');
  };

  return (
    
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="bg-white p-3 rounded-lg w-full max-w-3xl">
      <h1 className="text-3xl font-semibold text-center mb-10 mt-0">{t('common.signup')}</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.firstName')}
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.lastName')}
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('common.password')}
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

          {/* <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div> */}

        <button
          type="button"
          onClick={handleSignUp}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {t('common.signup')}
        </button>

        <p className="text-center text-sm text-blue-500 mt-4">
          <a href="/signin" className="text-blue-500 hover:underline">
          {t('common.alreadyHaveAccount')} {t('common.signin')}
          </a>
        </p>
      </div>
    </div>
  );
}
