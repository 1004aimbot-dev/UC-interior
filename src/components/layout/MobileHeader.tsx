import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import styles from './Layout.module.css';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const MobileHeader: React.FC = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={styles.header}>
            <ScrollLink
                to="hero"
                smooth={true}
                duration={500}
                className={styles.logo}
                onClick={closeMenu}
                style={{ cursor: 'pointer' }}
            >
                Y2K INTERIOR
            </ScrollLink>

            <button
                className={styles.hamburgerBtn}
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                ☰
            </button>

            {/* Language Switcher - Centered */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <LanguageSwitcher />
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <button className={styles.mobileCloseBtn} onClick={closeMenu}>&times;</button>
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    <ScrollLink
                        to="hero"
                        smooth={true}
                        duration={500}
                        className={styles.mobileNavLink}
                        onClick={closeMenu}
                    >
                        {t('nav.home')}
                    </ScrollLink>

                    <ScrollLink
                        to="service"
                        smooth={true}
                        duration={500}
                        className={styles.mobileNavLink}
                        onClick={closeMenu} // "Service" section covers Scope/Method briefly
                    >
                        {t('nav.scope')} / {t('nav.method')}
                    </ScrollLink>

                    <ScrollLink
                        to="cases"
                        smooth={true}
                        duration={500}
                        className={styles.mobileNavLink}
                        onClick={closeMenu}
                    >
                        {t('nav.cases')}
                    </ScrollLink>

                    <ScrollLink
                        to="process"
                        smooth={true}
                        duration={500}
                        className={styles.mobileNavLink}
                        onClick={closeMenu}
                    >
                        Process
                    </ScrollLink>

                    <ScrollLink
                        to="about"
                        smooth={true}
                        duration={500}
                        className={styles.mobileNavLink}
                        onClick={closeMenu}
                    >
                        {t('nav.about')}
                    </ScrollLink>

                    <ScrollLink
                        to="contact"
                        smooth={true}
                        duration={500}
                        className={styles.mobileNavLink}
                        onClick={closeMenu}
                    >
                        {t('nav.consultation')}
                    </ScrollLink>
                </nav>
            </div>
        </header>
    );
};

export default MobileHeader;
