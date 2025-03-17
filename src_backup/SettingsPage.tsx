/** @jsxImportSource react */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import P5Background from './P5Background';
import SettingsCard from './SettingsCard';
import ToggleContainer from './ToggleContainer';
import SelectiveAttention from './SelectiveAttention';
import SelectiveAttentionNotification from './SelectiveAttentionNotification';

// Çeviriler - Türkçe ve İngilizce dil desteği
const translations = {
  tr: {
    settings: "Ayarlar",
    appearance: "Görünüm",
    notifications: "Bildirimler",
    security: "Güvenlik",
    privacy: "Gizlilik",
    accessibility: "Erişilebilirlik",
    minimalMode: "Sade Mod",
    minimalModeDescription: "Performans için basitleştirilmiş arayüz",
    appearanceSettings: "Görünüm Ayarları",
    themeSelection: "Tema Seçimi",
    themeSelectionDescription: "Uygulamanın görsel temasını tercihlerinize göre ayarlayın.",
    appTheme: "Uygulama teması:",
    light: "Açık",
    dark: "Koyu",
    system: "Sistem (otomatik)",
    notificationSettings: "Bildirim Ayarları",
    pushNotifications: "Push Bildirimleri",
    pushNotificationsDescription: "Anlık bildirim almak için etkinleştirin",
    emailNotifications: "E-posta Bildirimleri",
    emailNotificationsDescription: "Önemli güncellemeler için e-posta alın",
    sendTestNotification: "Test Bildirimi Gönder",
    securitySettings: "Güvenlik Ayarları",
    twoFactorAuth: "İki Faktörlü Kimlik Doğrulama",
    twoFactorAuthDescription: "Hesabınızı ekstra güvenlik katmanı ile koruyun",
    twoStepVerification: "İki Adımlı Doğrulama",
    twoStepVerificationDescription: "Ek güvenlik için iki faktörlü kimlik doğrulama",
    twoFactorEnabled: "İki faktörlü kimlik doğrulama etkinleştirildi. Bu ek güvenlik katmanı, hesabınızı yetkisiz erişimlere karşı korumaya yardımcı olur.",
    configure: "Yapılandır",
    privacySettings: "Gizlilik Ayarları",
    cookieAndTrackingPreferences: "Çerez ve İzleme Tercihleri",
    cookieAndTrackingDescription: "Web sitemizde hangi verilerinizin toplanacağını kontrol edin",
    necessaryCookies: "Gerekli Çerezler",
    necessaryCookiesDescription: "Temel site fonksiyonları için gerekli çerezler (devre dışı bırakılamaz)",
    preferenceCookies: "Tercih Çerezleri",
    preferenceCookiesDescription: "Dil ve görünüm tercihlerinizi hatırlayan çerezler",
    analyticsCookies: "Analitik Çerezler",
    analyticsCookiesDescription: "Site kullanımınız hakkında anonim veri toplar",
    marketingCookies: "Pazarlama Çerezleri",
    marketingCookiesDescription: "Reklamları kişiselleştirmek için kullanılan çerezler",
    dataSharing: "Veri Paylaşımı",
    dataSharingDescription: "Hangi verilerinizin bizimle paylaşılacağını kontrol edin",
    thirdPartyIntegrations: "Üçüncü Taraf Entegrasyonları",
    thirdPartyIntegrationsDescription: "Diğer hizmetler ile entegrasyonu yönetin",
    managePermissions: "İzinleri Yönet",
    manageYourData: "Verilerinizi Yönetin",
    downloadMyData: "Verilerimi İndir",
    deleteMyAccount: "Hesabımı Sil",
    profileVisibility: "Profil Görünürlüğü",
    profileVisibilityDescription: "Profilinizi kimlerin görebileceğini ayarlayın",
    public: "Herkese Açık",
    friendsOnly: "Sadece Arkadaşlar",
    private: "Gizli",
    autoLogout: "Otomatik Oturum Kapatma",
    autoLogoutDescription: "Belirli bir süre işlem yapılmazsa oturumu kapat",
    autoLogoutTime: "Oturum kapatma süresi (dakika)",
    loginAlerts: "Oturum Açma Bildirimleri",
    loginAlertsDescription: "Yeni cihazdan oturum açıldığında bildirim al",
    accessibilityAndLanguageSettings: "Erişilebilirlik ve Dil Ayarları",
    languageSelection: "Dil Seçimi",
    languageSelectionDescription: "Uygulama dilini tercihlerinize göre ayarlayın.",
    appLanguage: "Uygulama dili:",
    turkish: "Türkçe",
    english: "English",
    textSize: "Metin Boyutu",
    textSizeDescription: "Uygulamadaki metin boyutunu görüş tercihinize göre ayarlayın.",
    small: "Küçük",
    normal: "Normal",
    large: "Büyük",
    extraLarge: "Çok Büyük",
    textSizeHint: "Bu ayar uygulamadaki tüm metinlerin boyutunu ayarlamanıza olanak tanır. Daha iyi okunabilirlik için tercih ettiğiniz boyutu seçin.",
    highContrastMode: "Yüksek Kontrast Modu",
    highContrastModeDescription: "Arka plan ve metin renklerini daha belirgin hale getirin",
    reduceAnimations: "Animasyonları Azalt",
    reduceAnimationsDescription: "Hareket hassasiyeti için animasyonları ve geçişleri azaltın",
    screenReaderOptimization: "Ekran Okuyucu Optimizasyonu",
    screenReaderOptimizationDescription: "Ekran okuyucusu kullanıcıları için iyileştirilmiş erişilebilirlik"
  },
  en: {
    settings: "Settings",
    appearance: "Appearance",
    notifications: "Notifications",
    security: "Security",
    privacy: "Privacy",
    accessibility: "Accessibility",
    minimalMode: "Minimal Mode",
    minimalModeDescription: "Simplified interface for better performance",
    appearanceSettings: "Appearance Settings",
    themeSelection: "Theme Selection",
    themeSelectionDescription: "Customize the visual theme of the application according to your preferences.",
    appTheme: "Application theme:",
    light: "Light",
    dark: "Dark",
    system: "System (automatic)",
    notificationSettings: "Notification Settings",
    pushNotifications: "Push Notifications",
    pushNotificationsDescription: "Enable to receive instant notifications",
    emailNotifications: "Email Notifications",
    emailNotificationsDescription: "Receive emails for important updates",
    sendTestNotification: "Send Test Notification",
    securitySettings: "Security Settings",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorAuthDescription: "Protect your account with an extra layer of security",
    twoStepVerification: "Two-Step Verification",
    twoStepVerificationDescription: "Two-factor authentication for additional security",
    twoFactorEnabled: "Two-factor authentication is enabled. This additional security layer helps protect your account from unauthorized access.",
    configure: "Configure",
    privacySettings: "Privacy Settings",
    cookieAndTrackingPreferences: "Cookie and Tracking Preferences",
    cookieAndTrackingDescription: "Control what data is collected on our website",
    necessaryCookies: "Necessary Cookies",
    necessaryCookiesDescription: "Cookies required for basic site functions (cannot be disabled)",
    preferenceCookies: "Preference Cookies",
    preferenceCookiesDescription: "Cookies that remember your language and appearance settings",
    analyticsCookies: "Analytical Cookies",
    analyticsCookiesDescription: "Collects anonymous data about your site usage",
    marketingCookies: "Marketing Cookies",
    marketingCookiesDescription: "Cookies used to personalize advertisements",
    dataSharing: "Data Sharing",
    dataSharingDescription: "Control which of your data will be shared with us",
    thirdPartyIntegrations: "Third-Party Integrations",
    thirdPartyIntegrationsDescription: "Manage integration with other services",
    managePermissions: "Manage Permissions",
    manageYourData: "Manage Your Data",
    downloadMyData: "Download My Data",
    deleteMyAccount: "Delete My Account",
    profileVisibility: "Profile Visibility",
    profileVisibilityDescription: "Set who can see your profile",
    public: "Public",
    friendsOnly: "Friends Only",
    private: "Private",
    autoLogout: "Auto Logout",
    autoLogoutDescription: "Log out the session after a certain period of inactivity",
    autoLogoutTime: "Logout time (minutes)",
    loginAlerts: "Login Alerts",
    loginAlertsDescription: "Receive notification when logging in from a new device",
    accessibilityAndLanguageSettings: "Accessibility and Language Settings",
    languageSelection: "Language Selection",
    languageSelectionDescription: "Set the application language according to your preferences.",
    appLanguage: "Application language:",
    turkish: "Türkçe",
    english: "English",
    textSize: "Text Size",
    textSizeDescription: "Adjust the text size in the application according to your vision preferences.",
    small: "Small",
    normal: "Normal",
    large: "Large",
    extraLarge: "Extra Large",
    textSizeHint: "This setting allows you to adjust the size of all text in the application. Choose your preferred size for better readability.",
    highContrastMode: "High Contrast Mode",
    highContrastModeDescription: "Make background and text colors more distinct",
    reduceAnimations: "Reduce Animations",
    reduceAnimationsDescription: "Reduce animations and transitions for motion sensitivity",
    screenReaderOptimization: "Screen Reader Optimization",
    screenReaderOptimizationDescription: "Improved accessibility for screen reader users"
  }
};

// Çeviri fonksiyonu
const getTranslation = (key, lang) => {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  return translations.en[key] || key; // Fallback to English or the key itself
};

// Occam Razor için basit stil tanımları (daha hafif performans için)
const occamStyles = {
  container: {
    backdropFilter: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  content: {
    padding: '1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
  },
  // Metin stilleri - her iki mod için de kullanılabilir
  text: {
    heading: {
      fontSize: 'calc(1.5rem * var(--font-size-multiplier, 1))',       // Font boyutu çarpanı ile dinamik
      fontWeight: '700',        
      letterSpacing: '0.02em',  
      lineHeight: '1.7',        
      marginBottom: '1.5rem'    
    },
    subheading: {
      fontSize: 'calc(1.25rem * var(--font-size-multiplier, 1))',      // Font boyutu çarpanı ile dinamik
      fontWeight: '600',        
      lineHeight: '1.6',        
      letterSpacing: '0.015em', 
      marginBottom: '1rem'      
    },
    body: {
      fontSize: 'calc(1.05rem * var(--font-size-multiplier, 1))',      // Font boyutu çarpanı ile dinamik 
      lineHeight: '1.7',        
      letterSpacing: '0.015em', 
      fontWeight: '400'         
    },
    small: {
      fontSize: 'calc(0.95rem * var(--font-size-multiplier, 1))',      // Font boyutu çarpanı ile dinamik
      lineHeight: '1.6',        
      letterSpacing: '0.01em'   
    }
  },
  // Erişilebilirlik stilleri
  accessibility: {
    highContrast: {
      background: '#000000',
      text: '#ffffff',
      accent: '#ffff00'
    },
    reduceAnimations: {
      transition: 'none'
    }
  },
  // Renk paleti - Açık mod için daha okunabilir renkler
  colors: {
    light: {
      headingText: '#1e293b',         // Koyu lacivert-gri başlık rengi
      bodyText: '#334155',            // Daha profesyonel ana metin rengi 
      secondaryText: '#64748b',       // Daha zarif ikincil metin rengi
      borderColor: '#e2e8f0',         // Daha hafif sınır rengi
      background: '#f0f4f8',          // Daha sıcak açık gri arka plan
      accentColor: '#3b82f6'          // Profesyonel mavi vurgu rengi
    },
    dark: {
      headingText: '#ffffff',
      bodyText: '#e0e0e0',
      secondaryText: '#cccccc',
      borderColor: '#4b5563',
      background: '#20264a',
      accentColor: '#f9725a'
    }
  }
};

// Global CSS stillerini ekle
const GlobalStyles = () => {
  useEffect(() => {
    // Roboto fontunu ekle
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
    document.head.appendChild(fontLink);
    
    // Stil elementi oluştur
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Temel CSS Değişkenleri */
      :root {
        --font-size-multiplier: 1;
      }
      
      /* Roboto font uygulaması */
      body, button, input, select, textarea, p, h1, h2, h3, h4, h5, h6, span, div {
        font-family: 'Roboto', sans-serif !important;
      }
      
      /* Yüksek Kontrast Modu */
      body.high-contrast {
        --high-contrast-bg: #000000;
        --high-contrast-text: #ffffff;
        --high-contrast-accent: #ffff00;
        --high-contrast-border: #ffffff;
      }
      
      body.high-contrast .text-gray-500 {
        color: #ffffff !important;
      }
      
      body.high-contrast .bg-gray-100,
      body.high-contrast .bg-gray-200,
      body.high-contrast .bg-white {
        background-color: #000000 !important;
      }
      
      body.high-contrast .border {
        border-color: #ffffff !important;
      }
      
      /* Animasyon Azaltma Modu */
      body.reduce-animations * {
        transition: none !important;
        animation: none !important;
      }
      
      /* Ekran Okuyucu Optimizasyonu */
      body.screen-reader-optimized .sr-only {
        position: relative !important;
        width: auto !important;
        height: auto !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: visible !important;
        clip: auto !important;
        white-space: normal !important;
        border: 0 !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    // Temizleme fonksiyonu
    return () => {
      document.head.removeChild(styleEl);
      document.head.removeChild(fontLink);
    };
  }, []);
  
  return null;
};

// Simge bileşenleri
const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const AppearanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />
  </svg>
);

const NotificationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

const PrivacyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
  </svg>
);

// Erişilebilirlik ikonu
const AccessibilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zM7.46 5.146a.5.5 0 01.707 0L10 6.98l1.833-1.834a.5.5 0 11.707.707L10.707 7.69l1.833 1.832a.5.5 0 11-.707.707L10 8.397l-1.833 1.832a.5.5 0 01-.707-.707l1.833-1.832-1.833-1.834a.5.5 0 010-.707z" clipRule="evenodd" />
    <path d="M10 6a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

// Düğme bileşenleri
const ToggleSwitch = ({ isOn, handleToggle, isDarkMode }) => {
  return (
    <div 
      className={`
        w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer
        ${isOn 
          ? isDarkMode 
            ? 'bg-[#f9725a]' 
            : 'bg-[#3b82f6]' 
          : isDarkMode 
            ? 'bg-[#566783]' 
            : 'bg-gray-300'
        }
      `}
      onClick={handleToggle}
    >
      <div 
        className={`
          bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${isOn ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </div>
  );
};

// Ana bileşen türleri
type SettingCategory = 'appearance' | 'notifications' | 'privacy' | 'security' | 'accessibility' | 'account';

const SettingsPage = () => {
  // Durum değişkenleri
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('appearance');
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [themeChoice, setThemeChoice] = useState('system');
  const [occamsRazorEnabled, setOccamsRazorEnabled] = useState(false);
  
  // Dil ve erişilebilirlik ayarları için durum değişkenleri
  const [language, setLanguage] = useState('tr');
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);
  const [screenReaderOptimized, setScreenReaderOptimized] = useState(false);
  
  // Güvenlik ayarları için durum değişkenleri
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('medium');
  const [autoLogout, setAutoLogout] = useState(false);
  const [autoLogoutTime, setAutoLogoutTime] = useState(30);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  
  // Seçici Dikkat için bildirim durumu
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'success' | 'warning' | 'error' | 'info'>('success');
  const [isImportantNotification, setIsImportantNotification] = useState(false);

  // Sistem temasını takip etme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (themeChoice === 'system') {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeChoice]);
  
  // Font boyutu ve kontrast ayarlarını uygulama
  useEffect(() => {
    // Font boyutu ayarlarını uygula
    const root = document.documentElement;
    switch(fontSize) {
      case 'small':
        root.style.setProperty('--font-size-multiplier', '0.9');
        break;
      case 'normal':
        root.style.setProperty('--font-size-multiplier', '1');
        break;
      case 'large':
        root.style.setProperty('--font-size-multiplier', '1.15');
        break;
      case 'xlarge':
        root.style.setProperty('--font-size-multiplier', '1.3');
        break;
    }
    
    // Yüksek kontrast modunu uygula
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Animasyon azaltma modunu uygula
    if (reduceAnimations) {
      document.body.classList.add('reduce-animations');
    } else {
      document.body.classList.remove('reduce-animations');
    }
    
    // Ekran okuyucu optimizasyonunu uygula
    if (screenReaderOptimized) {
      document.body.classList.add('screen-reader-optimized');
    } else {
      document.body.classList.remove('screen-reader-optimized');
    }
  }, [fontSize, highContrast, reduceAnimations, screenReaderOptimized]);
  
  // Dil değişikliği için etkiyi uygula
  useEffect(() => {
    document.documentElement.lang = language;
    // Gerçek bir uygulamada burada i18n kütüphanesi kullanılabilir
    console.log(`Dil değiştirildi: ${language}`);
  }, [language]);

  // Tema değişimi işleyicisi
  const handleThemeChange = (e) => {
    const value = e.target.value;
    setThemeChoice(value);
    
    if (value === 'dark') {
      setIsDarkMode(true);
    } else if (value === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  };

  // Bildirim gösterme işleyicisi
  const handleShowNotification = (type, important) => {
    setNotificationType(type);
    setIsImportantNotification(important);
    setShowNotification(true);
  };

  // Otomatik oturum kapatma süresi değişimi
  const handleAutoLogoutTimeChange = (e) => {
    setAutoLogoutTime(parseInt(e.target.value, 10));
  };

  // Parola güçlendirme değişikliği
  const handlePasswordStrengthChange = (value) => {
    setPasswordStrength(value);
  };

  return (
    <>
      {/* Global Stiller */}
      <GlobalStyles />
      
      {/* P5.js Arkaplan - Occam Razor'da daha basit */}
      {!occamsRazorEnabled && <P5Background isDarkMode={isDarkMode} />}
      
      {/* Bildirim gösterimi */}
      {showNotification && (
        <SelectiveAttentionNotification 
          type={notificationType}
          message={isImportantNotification 
            ? "Bu önemli bir bildirimdir ve dikkatinizi çekmek üzere tasarlanmıştır."
            : "Standart öncelikli bir bildirim, zaman içinde solacaktır."
          }
          isImportant={isImportantNotification}
          isDarkMode={isDarkMode}
          onDismiss={() => setShowNotification(false)}
          autoHideDuration={isImportantNotification ? 0 : 5000}
        />
      )}
      
      <div className={`min-h-screen ${occamsRazorEnabled ? '' : 'backdrop-blur-sm backdrop-filter'}`}
          style={occamsRazorEnabled 
            ? { background: isDarkMode ? '#1a1a1a' : 'linear-gradient(145deg, #f0f4f8 0%, #eef2f6 100%)' } 
            : { background: isDarkMode ? 'transparent' : 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(240,244,248,0.8) 100%)' }}>
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Golden Ratio Grid Sistemi - Occam Razor modunda basit grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sol Kenar Çubuğu */}
            <div className="lg:w-[30%]">
              <div className={`
                rounded-xl ${occamsRazorEnabled ? 'shadow-md' : 'shadow-lg'} p-6
                ${occamsRazorEnabled 
                  ? isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white' 
                  : isDarkMode ? 'bg-[#20264a]/70 text-[#cebebd]' : 'bg-white/90 text-[#1e293b] backdrop-blur-md'}
                ${occamsRazorEnabled ? '' : 'backdrop-blur-md'}
              `}
              style={occamsRazorEnabled 
                ? {color: isDarkMode ? '#e0e0e0' : '#1e293b', boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'} 
                : {}}>
                <h2 className={`text-2xl font-bold mb-6 ${occamsRazorEnabled ? 'tracking-wide' : 'tracking-wide'}`}
                   style={{
                     fontSize: occamStyles.text.heading.fontSize,
                     fontWeight: occamStyles.text.heading.fontWeight,
                     letterSpacing: occamStyles.text.heading.letterSpacing,
                     lineHeight: occamStyles.text.heading.lineHeight,
                     color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                   }}>
                  {getTranslation('settings', language)}
                </h2>
                
                {/* Kategoriler */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveCategory('appearance')}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors
                      ${activeCategory === 'appearance' 
                        ? isDarkMode 
                          ? 'bg-[#566783] text-[#f9725a]' 
                          : 'bg-[#3b82f6]/10 text-[#3b82f6]' 
                        : isDarkMode 
                          ? 'hover:bg-[#566783]/50' 
                          : 'hover:bg-gray-100'
                      }
                    `}
                    style={{
                      fontSize: occamStyles.text.body.fontSize,
                      lineHeight: occamStyles.text.body.lineHeight,
                      padding: '10px 14px'
                    }}
                  >
                    <AppearanceIcon />
                    <span style={{fontWeight: 500}}>{getTranslation('appearance', language)}</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveCategory('notifications')}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors
                      ${activeCategory === 'notifications' 
                        ? isDarkMode 
                          ? 'bg-[#566783] text-[#f9725a]' 
                          : 'bg-[#3b82f6]/10 text-[#3b82f6]' 
                        : isDarkMode 
                          ? 'hover:bg-[#566783]/50' 
                          : 'hover:bg-gray-100'
                      }
                    `}
                    style={{
                      fontSize: occamStyles.text.body.fontSize,
                      lineHeight: occamStyles.text.body.lineHeight,
                      padding: '10px 14px'
                    }}
                  >
                    <NotificationsIcon />
                    <span style={{fontWeight: 500}}>{getTranslation('notifications', language)}</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveCategory('security')}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors
                      ${activeCategory === 'security' 
                        ? isDarkMode 
                          ? 'bg-[#566783] text-[#f9725a]' 
                          : 'bg-[#3b82f6]/10 text-[#3b82f6]' 
                        : isDarkMode 
                          ? 'hover:bg-[#566783]/50' 
                          : 'hover:bg-gray-100'
                      }
                    `}
                    style={{
                      fontSize: occamStyles.text.body.fontSize,
                      lineHeight: occamStyles.text.body.lineHeight,
                      padding: '10px 14px'
                    }}
                  >
                    <SecurityIcon />
                    <span style={{fontWeight: 500}}>{getTranslation('security', language)}</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveCategory('privacy')}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors
                      ${activeCategory === 'privacy' 
                        ? isDarkMode 
                          ? 'bg-[#566783] text-[#f9725a]' 
                          : 'bg-[#3b82f6]/10 text-[#3b82f6]' 
                        : isDarkMode 
                          ? 'hover:bg-[#566783]/50' 
                          : 'hover:bg-gray-100'
                      }
                    `}
                    style={{
                      fontSize: occamStyles.text.body.fontSize,
                      lineHeight: occamStyles.text.body.lineHeight,
                      padding: '10px 14px'
                    }}
                  >
                    <PrivacyIcon />
                    <span style={{fontWeight: 500}}>{getTranslation('privacy', language)}</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveCategory('accessibility')}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors
                      ${activeCategory === 'accessibility' 
                        ? isDarkMode 
                          ? 'bg-[#566783] text-[#f9725a]' 
                          : 'bg-[#3b82f6]/10 text-[#3b82f6]' 
                        : isDarkMode 
                          ? 'hover:bg-[#566783]/50' 
                          : 'hover:bg-gray-100'
                      }
                    `}
                    style={{
                      fontSize: occamStyles.text.body.fontSize,
                      lineHeight: occamStyles.text.body.lineHeight,
                      padding: '10px 14px'
                    }}
                  >
                    <AccessibilityIcon />
                    <span style={{fontWeight: 500}}>{getTranslation('accessibility', language)}</span>
                  </button>
                </nav>
                
                {/* Occam's Razor geçişi - Daha küçük ve basit */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{
                        fontSize: occamStyles.text.body.fontSize,
                        fontWeight: '500',
                        color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                      }}>{getTranslation('minimalMode', language)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400" style={{
                        fontSize: occamStyles.text.small.fontSize,
                        lineHeight: occamStyles.text.small.lineHeight,
                        color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                      }}>{getTranslation('minimalModeDescription', language)}</p>
                    </div>
                    
                    <ToggleSwitch 
                      isOn={occamsRazorEnabled} 
                      handleToggle={() => setOccamsRazorEnabled(!occamsRazorEnabled)}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ana İçerik */}
            <div className="lg:w-[70%]">
              <div className={`
                rounded-xl ${occamsRazorEnabled ? 'shadow-md' : 'shadow-xl'} p-6 
                ${occamsRazorEnabled ? '' : 'backdrop-blur-md'} 
                ${occamsRazorEnabled 
                  ? isDarkMode ? 'bg-[#2a2a2a]' : 'bg-white' 
                  : isDarkMode ? 'bg-[#20264a]/70' : 'bg-white/90'}
              `}
              style={occamsRazorEnabled 
                ? {color: isDarkMode ? '#e0e0e0' : '#1e293b', boxShadow: isDarkMode ? '0 4px 6px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'} 
                : {}}>
                {/* Görünüm Ayarları */}
                {activeCategory === 'appearance' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 tracking-wide`}
                       style={{
                         fontSize: occamStyles.text.subheading.fontSize,
                         fontWeight: occamStyles.text.subheading.fontWeight,
                         lineHeight: occamStyles.text.subheading.lineHeight,
                         color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                       }}>
                      {getTranslation('appearanceSettings', language)}
                    </h3>
                    
                    <SelectiveAttention 
                      isDarkMode={isDarkMode} 
                      isImportant={true}
                      title={getTranslation('themeSelection', language)}
                      description={getTranslation('themeSelectionDescription', language)}
                    >
                      <div className="mb-6">
                        <p className="mb-3" style={{
                          fontSize: occamStyles.text.body.fontSize,
                          lineHeight: occamStyles.text.body.lineHeight,
                          color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText,
                          marginBottom: '1rem'
                        }}>{getTranslation('appTheme', language)}:</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="theme" 
                              value="light"
                              checked={themeChoice === 'light'} 
                              onChange={handleThemeChange}
                              className="sr-only" // Gizli radio butonu
                            />
                            <div className={`
                              p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center
                              ${themeChoice === 'light' 
                                ? isDarkMode 
                                  ? 'border-[#f9725a] bg-[#f9725a]/20' 
                                  : 'border-[#3b82f6] bg-gradient-to-b from-[#ebf5ff] to-[#dbeafe] shadow-sm'
                                : isDarkMode 
                                  ? 'border-gray-700 bg-[#20264a]/30 hover:bg-[#20264a]/50' 
                                  : 'border-[#e2e8f0] bg-gradient-to-b from-white to-[#f8fafc] hover:border-[#cbd5e1] shadow-sm'
                              }
                            `}>
                              <div className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center mb-2 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </div>
                              <span style={{
                                fontSize: occamStyles.text.body.fontSize,
                                lineHeight: occamStyles.text.body.lineHeight,
                                fontWeight: themeChoice === 'light' ? '600' : '400',
                                color: themeChoice === 'light'
                                  ? isDarkMode ? '#f9725a' : '#3b82f6'
                                  : isDarkMode ? '#e0e0e0' : '#334155'
                              }}>{getTranslation('light', language)}</span>
                            </div>
                          </label>
                          
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="theme" 
                              value="dark"
                              checked={themeChoice === 'dark'} 
                              onChange={handleThemeChange}
                              className="sr-only" // Gizli radio butonu
                            />
                            <div className={`
                              p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center
                              ${themeChoice === 'dark' 
                                ? isDarkMode 
                                  ? 'border-[#f9725a] bg-[#f9725a]/20' 
                                  : 'border-[#3b82f6] bg-[#3b82f6]/10'
                                : isDarkMode 
                                  ? 'border-gray-700 bg-[#20264a]/30 hover:bg-[#20264a]/50' 
                                  : 'border-gray-200 bg-[#f8fafc] hover:bg-[#f1f5f9]'
                              }
                            `}>
                              <div className="w-[30px] h-[30px] rounded-full bg-[#333] flex items-center justify-center mb-2 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                              </div>
                              <span style={{
                                fontSize: occamStyles.text.body.fontSize,
                                lineHeight: occamStyles.text.body.lineHeight,
                                fontWeight: themeChoice === 'dark' ? '600' : '400',
                                color: themeChoice === 'dark'
                                  ? isDarkMode ? '#f9725a' : '#3b82f6'
                                  : isDarkMode ? '#e0e0e0' : '#334155'
                              }}>{getTranslation('dark', language)}</span>
                            </div>
                          </label>
                          
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="theme" 
                              value="system"
                              checked={themeChoice === 'system'} 
                              onChange={handleThemeChange}
                              className="sr-only" // Gizli radio butonu
                            />
                            <div className={`
                              p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center
                              ${themeChoice === 'system' 
                                ? isDarkMode 
                                  ? 'border-[#f9725a] bg-[#f9725a]/20' 
                                  : 'border-[#3b82f6] bg-[#3b82f6]/10'
                                : isDarkMode 
                                  ? 'border-gray-700 bg-[#20264a]/30 hover:bg-[#20264a]/50' 
                                  : 'border-gray-200 bg-[#f8fafc] hover:bg-[#f1f5f9]'
                              }
                            `}>
                              <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 flex items-center justify-center mb-2 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span style={{
                                fontSize: occamStyles.text.body.fontSize,
                                lineHeight: occamStyles.text.body.lineHeight,
                                fontWeight: themeChoice === 'system' ? '600' : '400',
                                color: themeChoice === 'system'
                                  ? isDarkMode ? '#f9725a' : '#3b82f6'
                                  : isDarkMode ? '#e0e0e0' : '#334155'
                              }}>{getTranslation('system', language)}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </SelectiveAttention>
                  </div>
                )}
                
                {/* Bildirim Ayarları */}
                {activeCategory === 'notifications' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 tracking-wide`}
                       style={{
                         fontSize: occamStyles.text.subheading.fontSize,
                         fontWeight: occamStyles.text.subheading.fontWeight,
                         lineHeight: occamStyles.text.subheading.lineHeight,
                         color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                       }}>
                      {getTranslation('notificationSettings', language)}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('pushNotifications', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('pushNotificationsDescription', language)}</p>
                          </div>
                          <ToggleSwitch isOn={true} handleToggle={() => {}} isDarkMode={isDarkMode} />
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('emailNotifications', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('emailNotificationsDescription', language)}</p>
                          </div>
                          <ToggleSwitch isOn={false} handleToggle={() => {}} isDarkMode={isDarkMode} />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          className={`px-4 py-2 rounded-lg text-white ${isDarkMode ? 'bg-[#f9725a]' : 'bg-[#3b82f6]'}`}
                          onClick={() => {
                            setShowNotification(true);
                            setNotificationType('success');
                          }}
                          style={{
                            fontSize: occamStyles.text.body.fontSize,
                            padding: '10px 16px'
                          }}
                        >
                          {getTranslation('sendTestNotification', language)}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Güvenlik Ayarları - Kapsamlı güncellenmiş bölüm */}
                {activeCategory === 'security' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 tracking-wide`}
                       style={{
                         fontSize: occamStyles.text.subheading.fontSize,
                         fontWeight: occamStyles.text.subheading.fontWeight,
                         lineHeight: occamStyles.text.subheading.lineHeight,
                         color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                       }}>
                      {getTranslation('securitySettings', language)}
                    </h3>
                    
                    <div className="space-y-4">
                      <SelectiveAttention 
                        isDarkMode={isDarkMode} 
                        isImportant={true}
                        title={getTranslation('twoFactorAuth', language)}
                        description={getTranslation('twoFactorAuthDescription', language)}
                      >
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{
                                fontSize: occamStyles.text.body.fontSize,
                                fontWeight: '500',
                                lineHeight: occamStyles.text.body.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                              }}>{getTranslation('twoStepVerification', language)}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                                fontSize: occamStyles.text.small.fontSize,
                                lineHeight: occamStyles.text.small.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                              }}>{getTranslation('twoStepVerificationDescription', language)}</p>
                            </div>
                            <ToggleSwitch 
                              isOn={twoFactorAuth} 
                              handleToggle={() => setTwoFactorAuth(!twoFactorAuth)} 
                              isDarkMode={isDarkMode} 
                            />
                          </div>
                          
                          {twoFactorAuth && (
                            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                              <p className="text-sm mb-3" style={{
                                fontSize: occamStyles.text.small.fontSize,
                                lineHeight: occamStyles.text.small.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                              }}>
                                {getTranslation('twoFactorEnabled', language)}
                              </p>
                              <button
                                className={`px-4 py-2 rounded text-white ${isDarkMode ? 'bg-[#f9725a]' : 'bg-[#3b82f6]'}`}
                                style={{
                                  fontSize: occamStyles.text.body.fontSize
                                }}
                              >
                                {getTranslation('configure', language)}
                              </button>
                            </div>
                          )}
                        </div>
                      </SelectiveAttention>
                    </div>
                  </div>
                )}
                
                {/* Gizlilik Ayarları */}
                {activeCategory === 'privacy' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 tracking-wide`}
                       style={{
                         fontSize: occamStyles.text.subheading.fontSize,
                         fontWeight: occamStyles.text.subheading.fontWeight,
                         lineHeight: occamStyles.text.subheading.lineHeight,
                         color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                       }}>
                      {getTranslation('privacySettings', language)}
                    </h3>
                    
                    <div className="space-y-4">
                      <SelectiveAttention 
                        isDarkMode={isDarkMode} 
                        isImportant={true}
                        title={getTranslation('cookieAndTrackingPreferences', language)}
                        description={getTranslation('cookieAndTrackingDescription', language)}
                      >
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-medium" style={{
                                fontSize: occamStyles.text.body.fontSize,
                                fontWeight: '500',
                                lineHeight: occamStyles.text.body.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                              }}>{getTranslation('necessaryCookies', language)}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                                fontSize: occamStyles.text.small.fontSize,
                                lineHeight: occamStyles.text.small.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                              }}>{getTranslation('necessaryCookiesDescription', language)}</p>
                            </div>
                            <ToggleSwitch isOn={true} handleToggle={() => {}} isDarkMode={isDarkMode} />
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-medium" style={{
                                fontSize: occamStyles.text.body.fontSize,
                                fontWeight: '500',
                                lineHeight: occamStyles.text.body.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                              }}>{getTranslation('preferenceCookies', language)}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                                fontSize: occamStyles.text.small.fontSize,
                                lineHeight: occamStyles.text.small.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                              }}>{getTranslation('preferenceCookiesDescription', language)}</p>
                            </div>
                            <ToggleSwitch isOn={true} handleToggle={() => {}} isDarkMode={isDarkMode} />
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-medium" style={{
                                fontSize: occamStyles.text.body.fontSize,
                                fontWeight: '500',
                                lineHeight: occamStyles.text.body.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                              }}>{getTranslation('analyticsCookies', language)}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                                fontSize: occamStyles.text.small.fontSize,
                                lineHeight: occamStyles.text.small.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                              }}>{getTranslation('analyticsCookiesDescription', language)}</p>
                            </div>
                            <ToggleSwitch isOn={false} handleToggle={() => {}} isDarkMode={isDarkMode} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{
                                fontSize: occamStyles.text.body.fontSize,
                                fontWeight: '500',
                                lineHeight: occamStyles.text.body.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                              }}>{getTranslation('marketingCookies', language)}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                                fontSize: occamStyles.text.small.fontSize,
                                lineHeight: occamStyles.text.small.lineHeight,
                                color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                              }}>{getTranslation('marketingCookiesDescription', language)}</p>
                            </div>
                            <ToggleSwitch isOn={false} handleToggle={() => {}} isDarkMode={isDarkMode} />
                          </div>
                        </div>
                      </SelectiveAttention>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('dataSharing', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('dataSharingDescription', language)}</p>
                          </div>
                          <ToggleSwitch isOn={false} handleToggle={() => {}} isDarkMode={isDarkMode} />
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('thirdPartyIntegrations', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('thirdPartyIntegrationsDescription', language)}</p>
                          </div>
                          <button 
                            className={`px-4 py-2 rounded text-white ${isDarkMode ? 'bg-[#566783]' : 'bg-[#64748b]'}`}
                            style={{
                              fontSize: occamStyles.text.small.fontSize,
                              fontWeight: '500'
                            }}
                          >
                            {getTranslation('managePermissions', language)}
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <p className="font-medium mb-3" style={{
                          fontSize: occamStyles.text.body.fontSize,
                          fontWeight: '500',
                          lineHeight: occamStyles.text.body.lineHeight,
                          color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                        }}>{getTranslation('manageYourData', language)}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            className={`px-4 py-2 rounded text-white ${isDarkMode ? 'bg-[#566783]' : 'bg-[#64748b]'}`}
                            style={{
                              fontSize: occamStyles.text.small.fontSize,
                              fontWeight: '500'
                            }}
                          >
                            {getTranslation('downloadMyData', language)}
                          </button>
                          
                          <button
                            className={`px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700`}
                            style={{
                              fontSize: occamStyles.text.small.fontSize,
                              fontWeight: '500'
                            }}
                          >
                            {getTranslation('deleteMyAccount', language)}
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('profileVisibility', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('profileVisibilityDescription', language)}</p>
                          </div>
                          <select
                            className={`px-3 py-2 rounded ${isDarkMode ? 'bg-[#333] border-gray-600 text-white' : 'bg-white border-[#e2e8f0] text-[#334155]'}`}
                            style={{ fontSize: occamStyles.text.small.fontSize }}
                          >
                            <option value="public">{getTranslation('public', language)}</option>
                            <option value="friends">{getTranslation('friendsOnly', language)}</option>
                            <option value="private">{getTranslation('private', language)}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Otomatik Oturum Kapatma */}
                {activeCategory === 'account' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 tracking-wide`}
                       style={{
                         fontSize: occamStyles.text.subheading.fontSize,
                         fontWeight: occamStyles.text.subheading.fontWeight,
                         lineHeight: occamStyles.text.subheading.lineHeight,
                         color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                       }}>
                      {getTranslation('autoLogout', language)}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('autoLogoutDescription', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>
                              {getTranslation('autoLogoutTime', language)}
                            </p>
                          </div>
                          <ToggleSwitch 
                            isOn={autoLogout} 
                            handleToggle={() => setAutoLogout(!autoLogout)} 
                            isDarkMode={isDarkMode} 
                          />
                        </div>
                        
                        {autoLogout && (
                          <div className="mt-3">
                            <label className="block text-sm font-medium mb-1" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText,
                              fontWeight: '500'
                            }}>
                              {getTranslation('autoLogoutTime', language)}
                            </label>
                            <input 
                              type="number" 
                              min="1" 
                              max="120"
                              value={autoLogoutTime} 
                              onChange={(e) => setAutoLogoutTime(parseInt(e.target.value, 10) || 1)}
                              className={`w-full p-2 border rounded ${isDarkMode ? 'bg-[#333] border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                              style={{ fontSize: occamStyles.text.body.fontSize }}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('loginAlerts', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('loginAlertsDescription', language)}</p>
                          </div>
                          <ToggleSwitch 
                            isOn={loginAlerts} 
                            handleToggle={() => setLoginAlerts(!loginAlerts)} 
                            isDarkMode={isDarkMode} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Erişilebilirlik ve Dil Ayarları */}
                {activeCategory === 'accessibility' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 tracking-wide`}
                       style={{
                         fontSize: occamStyles.text.subheading.fontSize,
                         fontWeight: occamStyles.text.subheading.fontWeight,
                         lineHeight: occamStyles.text.subheading.lineHeight,
                         color: isDarkMode ? occamStyles.colors.dark.headingText : occamStyles.colors.light.headingText
                       }}>
                      {getTranslation('accessibilityAndLanguageSettings', language)}
                    </h3>
                    
                    {/* Dil Seçimi */}
                    <SelectiveAttention 
                      isDarkMode={isDarkMode} 
                      isImportant={true}
                      title={getTranslation('languageSelection', language)}
                      description={getTranslation('languageSelectionDescription', language)}
                    >
                      <div className="mb-6">
                        <p className="mb-3" style={{
                          fontSize: occamStyles.text.body.fontSize,
                          lineHeight: occamStyles.text.body.lineHeight,
                          color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText,
                          marginBottom: '1rem'
                        }}>{getTranslation('appLanguage', language)}:</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="language" 
                              value="tr"
                              checked={language === 'tr'} 
                              onChange={(e) => setLanguage(e.target.value)}
                              className="sr-only" // Gizli radio butonu
                            />
                            <div className={`
                              p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center
                              ${language === 'tr' 
                                ? isDarkMode 
                                  ? 'border-[#f9725a] bg-[#f9725a]/20' 
                                  : 'border-[#3b82f6] bg-[#3b82f6]/10'
                                : isDarkMode 
                                  ? 'border-gray-700 bg-[#20264a]/30 hover:bg-[#20264a]/50' 
                                  : 'border-gray-200 bg-[#f8fafc] hover:bg-[#f1f5f9]'
                              }
                            `}>
                              <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center mb-2 shadow-md bg-red-600">
                                <span className="text-white text-lg font-bold">TR</span>
                              </div>
                              <span style={{
                                fontSize: occamStyles.text.body.fontSize,
                                lineHeight: occamStyles.text.body.lineHeight,
                                fontWeight: language === 'tr' ? '600' : '400',
                                color: language === 'tr'
                                  ? isDarkMode ? '#f9725a' : '#3b82f6'
                                  : isDarkMode ? '#e0e0e0' : '#334155'
                              }}>{getTranslation('turkish', language)}</span>
                            </div>
                          </label>
                          
                          <label className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="language" 
                              value="en"
                              checked={language === 'en'} 
                              onChange={(e) => setLanguage(e.target.value)}
                              className="sr-only" // Gizli radio butonu
                            />
                            <div className={`
                              p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center
                              ${language === 'en' 
                                ? isDarkMode 
                                  ? 'border-[#f9725a] bg-[#f9725a]/20' 
                                  : 'border-[#3b82f6] bg-[#3b82f6]/10'
                                : isDarkMode 
                                  ? 'border-gray-700 bg-[#20264a]/30 hover:bg-[#20264a]/50' 
                                  : 'border-gray-200 bg-[#f8fafc] hover:bg-[#f1f5f9]'
                              }
                            `}>
                              <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center mb-2 shadow-md bg-blue-600">
                                <span className="text-white text-lg font-bold">EN</span>
                              </div>
                              <span style={{
                                fontSize: occamStyles.text.body.fontSize,
                                lineHeight: occamStyles.text.body.lineHeight,
                                fontWeight: language === 'en' ? '600' : '400',
                                color: language === 'en'
                                  ? isDarkMode ? '#f9725a' : '#3b82f6'
                                  : isDarkMode ? '#e0e0e0' : '#334155'
                              }}>{getTranslation('english', language)}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </SelectiveAttention>
                    
                    {/* Font Büyüklüğü Ayarı */}
                    <div className="mt-6">
                      <SelectiveAttention 
                        isDarkMode={isDarkMode} 
                        isImportant={false}
                        title={getTranslation('textSize', language)}
                        description={getTranslation('textSizeDescription', language)}
                      >
                        <div className="my-4">
                          <p className="mb-3" style={{
                            fontSize: occamStyles.text.body.fontSize,
                            lineHeight: occamStyles.text.body.lineHeight,
                            color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                          }}>{getTranslation('textSize', language)}:</p>
                          
                          <div className="flex items-center justify-between bg-[#f1f5f9] dark:bg-gray-800 p-2 rounded-lg">
                            <button
                              onClick={() => setFontSize('small')}
                              className={`px-4 py-2 rounded-lg font-medium ${fontSize === 'small' 
                                ? (isDarkMode ? 'bg-[#f9725a] text-white' : 'bg-[#3b82f6] text-white shadow-sm') 
                                : (isDarkMode ? 'bg-[#333] text-white hover:bg-[#444]' : 'bg-white text-[#334155] border border-[#e2e8f0] hover:bg-gray-50 shadow-sm')}`}
                              style={{ fontSize: '0.9rem' }}
                            >
                              {getTranslation('small', language)}
                            </button>
                            <button
                              onClick={() => setFontSize('normal')}
                              className={`px-4 py-2 rounded-lg font-medium ${fontSize === 'normal' 
                                ? (isDarkMode ? 'bg-[#f9725a] text-white' : 'bg-[#3b82f6] text-white shadow-sm') 
                                : (isDarkMode ? 'bg-[#333] text-white hover:bg-[#444]' : 'bg-white text-[#334155] border border-[#e2e8f0] hover:bg-gray-50 shadow-sm')}`}
                              style={{ fontSize: '1rem' }}
                            >
                              {getTranslation('normal', language)}
                            </button>
                            <button
                              onClick={() => setFontSize('large')}
                              className={`px-4 py-2 rounded-lg font-medium ${fontSize === 'large' 
                                ? (isDarkMode ? 'bg-[#f9725a] text-white' : 'bg-[#3b82f6] text-white shadow-sm') 
                                : (isDarkMode ? 'bg-[#333] text-white hover:bg-[#444]' : 'bg-white text-[#334155] border border-[#e2e8f0] hover:bg-gray-50 shadow-sm')}`}
                              style={{ fontSize: '1.1rem' }}
                            >
                              {getTranslation('large', language)}
                            </button>
                            <button
                              onClick={() => setFontSize('xlarge')}
                              className={`px-4 py-2 rounded-lg font-medium ${fontSize === 'xlarge' 
                                ? (isDarkMode ? 'bg-[#f9725a] text-white' : 'bg-[#3b82f6] text-white shadow-sm') 
                                : (isDarkMode ? 'bg-[#333] text-white hover:bg-[#444]' : 'bg-white text-[#334155] border border-[#e2e8f0] hover:bg-gray-50 shadow-sm')}`}
                              style={{ fontSize: '1.2rem' }}
                            >
                              {getTranslation('extraLarge', language)}
                            </button>
                          </div>
                          
                          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400" style={{
                            fontSize: fontSize === 'small' ? '0.8rem' : 
                                     fontSize === 'normal' ? '0.9rem' :
                                     fontSize === 'large' ? '1rem' : '1.1rem',
                            lineHeight: occamStyles.text.small.lineHeight,
                            color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                          }}>
                            {getTranslation('textSizeHint', language)}
                          </p>
                        </div>
                      </SelectiveAttention>
                    </div>
                    
                    {/* Diğer Erişilebilirlik Ayarları */}
                    <div className="space-y-4 mt-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('highContrastMode', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('highContrastModeDescription', language)}</p>
                          </div>
                          <ToggleSwitch 
                            isOn={highContrast} 
                            handleToggle={() => setHighContrast(!highContrast)} 
                            isDarkMode={isDarkMode} 
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('reduceAnimations', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('reduceAnimationsDescription', language)}</p>
                          </div>
                          <ToggleSwitch 
                            isOn={reduceAnimations} 
                            handleToggle={() => setReduceAnimations(!reduceAnimations)} 
                            isDarkMode={isDarkMode} 
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" style={{
                              fontSize: occamStyles.text.body.fontSize,
                              fontWeight: '500',
                              lineHeight: occamStyles.text.body.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.bodyText : occamStyles.colors.light.bodyText
                            }}>{getTranslation('screenReaderOptimization', language)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400" style={{
                              fontSize: occamStyles.text.small.fontSize,
                              lineHeight: occamStyles.text.small.lineHeight,
                              color: isDarkMode ? occamStyles.colors.dark.secondaryText : occamStyles.colors.light.secondaryText
                            }}>{getTranslation('screenReaderOptimizationDescription', language)}</p>
                          </div>
                          <ToggleSwitch 
                            isOn={screenReaderOptimized} 
                            handleToggle={() => setScreenReaderOptimized(!screenReaderOptimized)} 
                            isDarkMode={isDarkMode} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;