'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import mailEnvelopeImage from '../images/mail-envelope.png'; // Mise à jour de l'image
import { useRouter } from 'next/navigation';
import { useLanguage } from 'i18n/LanguageContext'; // Hook de langue

export default function Confirmation() {
  const router = useRouter();
  const { t } = useLanguage(); // Utilisation du hook pour la traduction

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin'); // Redirection après 3 secondes
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E1EFFF]">
      <Image 
        src={mailEnvelopeImage} 
        alt={t('common.requestSent')} 
        width={100} 
        height={100} 
        className="mb-4" 
      />
      <h1 className="text-2xl font-semibold text-blue-600 mb-2">
        {t('common.requestSentTitle')}
      </h1>
      <p className="text-center text-gray-800 mb-4">
        {t('common.requestApprovalMessage')}
      </p>
      <h3 className="text-gray-500">
        {t('common.redirectMessage')}
      </h3>
    </div>
  );
}
