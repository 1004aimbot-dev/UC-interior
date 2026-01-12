import React from 'react';
import MobileHeader from './MobileHeader';
import Chatbot from '../ui/Chatbot';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom'; // For Sticky CTA (might be internal router link or scroll link? usually CTA leads to form)
// The requirement says "Sticky Footer CTA for Mobile"
// Usually "Consultation" is the bottom form on the landing page OR a separate page.
// In Single Page mode, it should scroll to the bottom contact form.
// BUT, if the consultation is a complex form, maybe it's better to keep it as a page?
// The prompt says: "Mobile landing is single page... menu items scroll...".
// "Consultation" button should probably scroll to the Contact section on the single page.
// However, the rule "Conversion Rule: 'Consultation' over 'Estimate'" suggests a form.
// Let's assume there is a Contact section at the bottom of the Landing Page.
import { Link as ScrollLink } from 'react-scroll';
import styles from './Layout.module.css';

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.layoutWrapper}>
            <MobileHeader />
            <main>
                {children}
            </main>

            <footer className={styles.footer} id="footer">
                <div className="container">
                    <p>{t('footer.rights')}</p>
                </div>
            </footer>

            {/* Sticky Footer CTA - Scroll to Contact Section */}
            <div className={styles.stickyFooterCTA}>
                <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={500}
                    className={styles.stickyBtn}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {t('nav.consultation')}
                </ScrollLink>
            </div>

            <Chatbot />
        </div>
    );
};

export default MobileLayout;
