import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = useCallback((lng) => {
    if (lng === currentLanguage) return;

    i18n.changeLanguage(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lng);
    }
    setCurrentLanguage(lng);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== i18n.language) {
      changeLanguage(savedLanguage);
    }
  }, [changeLanguage, i18n.language]);

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {[
        { code: 'en', flag: 'gb.png', alt: 'English' },
        { code: 'de', flag: 'de.png', alt: 'Deutsch' },
        { code: 'el', flag: 'gr.png', alt: 'Ελληνικά' },
      ].map(({ code, flag, alt }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          disabled={currentLanguage === code}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: currentLanguage === code ? '2px solid blue' : 'none',
            cursor: 'pointer',
            background: 'none',
            padding: 0,
          }}
        >
          <Image
  src={`/flags/${flag}`}
  alt={alt}
  width={40}
  height={40}
  style={{
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  }}
/>



        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
