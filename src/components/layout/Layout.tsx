import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Chatbot from '../ui/Chatbot';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../ui/PageTransition';

const Layout: React.FC = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    const handleMobileLinkClick = (path: string) => {
        navigate(path);
        closeMenu();
    };

    return (
        <div className={styles.layoutWrapper}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo} onClick={closeMenu}>U Craft INTERIOR</Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav} style={{ marginLeft: 'auto', gap: 'var(--spacing-lg)' }}>
                    <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}>{t('nav.home')}</Link>
                    <Link to="/ai-preview" className={`${styles.navLink} ${location.pathname === '/ai-preview' ? styles.active : ''}`} style={location.pathname === '/ai-preview' ? { color: 'var(--color-accent-blue)', fontWeight: 600 } : {}}>{t('nav.ai_preview')}</Link>
                    <Link to="/cases" className={styles.navLink}>{t('nav.cases')}</Link>
                    <Link to="/scope" className={styles.navLink}>{t('nav.scope')}</Link>
                    <Link to="/method" className={styles.navLink}>{t('nav.method')}</Link>
                    <Link to="/about" className={styles.navLink}>{t('nav.about')}</Link>
                    <Link to="/consultation" className={styles.navLinkAccent}>{t('nav.consultation')}</Link>
                </nav>

                <LanguageSwitcher />

                {/* Mobile Hamburger Button */}
                <button
                    className={styles.hamburgerBtn}
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    ☰
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <button className={styles.mobileCloseBtn} onClick={closeMenu}>&times;</button>
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span onClick={() => handleMobileLinkClick('/')} className={styles.mobileNavLink}>{t('nav.home')}</span>
                    <span onClick={() => handleMobileLinkClick('/ai-preview')} className={styles.mobileNavLink} style={location.pathname === '/ai-preview' ? { color: 'var(--color-accent-blue)' } : {}}>{t('nav.ai_preview')}</span>
                    <span onClick={() => handleMobileLinkClick('/cases')} className={styles.mobileNavLink}>{t('nav.cases')}</span>
                    <span onClick={() => handleMobileLinkClick('/scope')} className={styles.mobileNavLink}>{t('nav.scope')}</span>
                    <span onClick={() => handleMobileLinkClick('/method')} className={styles.mobileNavLink}>{t('nav.method')}</span>
                    <span onClick={() => handleMobileLinkClick('/about')} className={styles.mobileNavLink}>{t('nav.about')}</span>
                    <span onClick={() => handleMobileLinkClick('/consultation')} className={styles.mobileNavLink}>{t('nav.consultation')}</span>
                </nav>
            </div>



            <main>
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>

            <footer className={styles.footer}>
                <div className="container">
                    <p>{t('footer.rights')}</p>
                </div>
            </footer>

            {/* Sticky Footer CTA for Mobile */}
            <div className={styles.stickyFooterCTA}>
                <Link to="/consultation" className={styles.stickyBtn}>
                    {t('nav.consultation')}
                </Link>
            </div>

            <Chatbot />
        </div>
    );
};

export default Layout;
