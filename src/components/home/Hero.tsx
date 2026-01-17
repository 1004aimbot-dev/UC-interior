import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';
// import heroBg from '../../assets/images/uc_hero_bg.png';
import heroBg from '../../assets/images/hero_sample_simulation.png'; // Simulation Sample
import ScrollReveal from '../ui/ScrollReveal';

const Hero: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <section className={styles.heroSection}>
            {/* Background Image Layer */}
            <div className={styles.heroBg}>
                <img src={heroBg} alt="Y2K Interior Construction Detail" className={styles.heroBgImage} />
                <div className={styles.overlay}></div>
            </div>

            <div className={`container ${styles.heroContainer}`}>

                {/* Top: Brand Identity */}
                <ScrollReveal direction="down" delay={0.2}>
                    <div className={styles.brandParams}>
                        <span className={styles.brandSub}>{t('hero.title')}</span>
                        <span className={styles.brandTech}>{t('hero.badge')}</span>
                    </div>
                </ScrollReveal>

                {/* Center: Main Headline */}
                <ScrollReveal delay={0.4} width="100%">
                    <h1 className={styles.headline} dangerouslySetInnerHTML={{ __html: t('hero.subtitle').replace(/\n/g, '<br/>') }} />
                </ScrollReveal>

                {/* Bottom: Description & CTA */}
                <div className={styles.bottomContent}>
                    <ScrollReveal delay={0.6}>
                        <p className={styles.description}>
                            {t('trust.direct_desc')}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.8}>
                        <div className={styles.slogan}>Two Crafts, One Space</div>
                    </ScrollReveal>

                    <ScrollReveal delay={1.0}>
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '20px', padding: '16px 32px', fontSize: '1.1rem' }}
                            onClick={() => navigate('/consultation')}
                            aria-label="시공 상담하기"
                        >
                            {t('nav.consultation')}
                        </button>
                    </ScrollReveal>
                </div>

            </div>
        </section>
    );
};

export default Hero;
