import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'ko', label: '한국어' },
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' },
        { code: 'zh', label: '中文' },
        { code: 'vi', label: 'Tiếng Việt' }
    ];

    // const currentLangLabel = languages.find(l => l.code === i18n.language)?.label || 'Language';

    return (
        <div className="language-switcher" ref={dropdownRef} style={{ position: 'relative', zIndex: 1001 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '8px 12px',
                    fontSize: '1.2rem',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '1px solid #444',
                    borderRadius: '50%', // Circle shape for icon feel
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                aria-label="Select Language"
            >
                🌐
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '120px',
                    backgroundColor: '#222',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            style={{
                                padding: '10px 16px',
                                fontSize: '0.9rem',
                                color: i18n.language === lang.code ? 'var(--color-accent-blue)' : '#ccc',
                                fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #333',
                                textAlign: 'left',
                                cursor: 'pointer',
                                width: '100%',
                                borderRadius: 0
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
