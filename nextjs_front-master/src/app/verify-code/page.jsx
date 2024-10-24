'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from 'i18n/LanguageContext'; // Assurez-vous d'importer le contexte de langue

export default function VerifyCode() {
  const { t } = useLanguage();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [correctCode, setCorrectCode] = useState('');
  const [email, setEmail] = useState('');
  const [resendAttempts, setResendAttempts] = useState(3);
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedCode = localStorage.getItem('verificationCode');
    const storedAttempts = parseInt(localStorage.getItem(`${storedEmail}_resendAttempts`)) || 3;
    const storedCooldown = parseInt(localStorage.getItem(`${storedEmail}_cooldown`)) || 0;

    if (storedCode && storedEmail) {
      setCorrectCode(storedCode.trim());
      setEmail(storedEmail);
      setResendAttempts(storedAttempts);

      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = storedCooldown - currentTime;

      if (remainingTime > 0) {
        setCooldown(remainingTime);
        const timerId = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timerId);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timerId);
      }
    } else {
      router.push('/send-verification-code');
    }
  }, [router]);

  const handleVerifyCode = () => {
    const inputCode = code.join('');
    if (inputCode === correctCode) {
      router.push('/reset-password');
    } else {
      alert(t('common.incorrectVerificationCode'));
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== '' && index < 5) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleResendCode = () => {
    if (resendAttempts > 0) {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setCorrectCode(newCode);
      localStorage.setItem('verificationCode', newCode);

      alert(`${t('common.newCodeSent')} ${email}.`);

      const newAttempts = resendAttempts - 1;
      setResendAttempts(newAttempts);
      localStorage.setItem(`${email}_resendAttempts`, newAttempts);

      if (newAttempts === 0) {
        const cooldownEndTime = Math.floor(Date.now() / 1000) + 3600;
        setCooldown(3600);
        localStorage.setItem(`${email}_cooldown`, cooldownEndTime);
      }
    } else {
      alert(t('common.exhaustedAttempts'));
    }
  };

  const formatCooldown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-8 rounded-lg w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-center mb-3">
          {t('common.enterVerificationCode')}
        </h1>
        <h4 className="text-sm font-normal text-center mb-4 text-grey">
          {t('common.codeSentMessage')}
        </h4>

        <div className="flex justify-center mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 mx-1 text-center text-2xl border border-gray-300 rounded-lg"
              autoComplete="off"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleVerifyCode}
          className="w-full bg-black text-white p-3 rounded-lg mb-4"
        >
          {t('common.verifyCode')}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {t('common.didntGetCode')}{' '}
            <button
              onClick={handleResendCode}
              className={`text-blue-500 hover:underline cursor-pointer ${
                cooldown > 0 ? 'disabled' : ''
              }`}
              disabled={cooldown > 0}
            >
              {t('common.resendCode')}
            </button>
          </p>
          <p className="text-sm text-gray-600">
            {t('common.resendAttemptsLeft')}: {resendAttempts}
          </p>
          {cooldown > 0 && (
            <p className="text-red-500">
              {t('common.waitBeforeResending')} {formatCooldown(cooldown)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
