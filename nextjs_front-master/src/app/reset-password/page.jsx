'use client'; // Important: ceci marque le composant comme un Client Component
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from 'i18n/LanguageContext'; // Importation du contexte de langue

export default function ResetPassword() {
  const { t } = useLanguage(); // Utilisation du hook de langue
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    setError('');
    setSuccessMessage('');

    if (!newPassword || !confirmPassword) {
      setError(t('common.enterNewPassword')); // Message traduit
      return;
    }

    if (newPassword.length < 8) {
      setError(t('common.passwordLengthError')); // Message traduit
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('common.passwordMismatch')); // Message traduit
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.password = newPassword;
      localStorage.setItem('user', JSON.stringify(user));
      setSuccessMessage(t('common.passwordResetSuccess')); // Message traduit
      setTimeout(() => {
        router.push('/pwd-reset-successfully');
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center mb-10">
          {t('common.setNewPassword')} 
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 text-black bg-[#B8EBC8] rounded-lg text-center">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.newPassword')}
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder={t('common.enterNewPassword')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {newPassword.length < 8 && newPassword.length > 0 && (
            <p className="text-red-500 text-sm">{t('common.passwordLengthError')}</p>
          )}
          {newPassword.length >= 8 && (
            <p className="text-green-500 text-sm">{t('common.passwordValid')}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.confirmPassword')}
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder={t('common.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPassword.length > 0 && newPassword !== confirmPassword && (
            <p className="text-red-500 text-sm">{t('common.passwordMismatch')}</p>
          )}
          {confirmPassword.length > 0 && newPassword === confirmPassword && (
            <p className="text-green-500 text-sm">{t('common.passwordMatch')}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleResetPassword}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {t('common.resetPassword')}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
