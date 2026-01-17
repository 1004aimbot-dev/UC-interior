import { useTranslation, Trans } from 'react-i18next';
import ScrollReveal from '../components/ui/ScrollReveal';

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-navy-wrapper" style={{
            backgroundImage: `url('/src/assets/images/bg_construction_blur.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)', minHeight: '100vh' }} className="section-padding">
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

                        <ScrollReveal>
                            <span style={{ color: 'var(--color-accent-blue)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 'var(--spacing-md)', display: 'block' }}>{t('about.subtitle')}</span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-lg)' }}>
                                <Trans i18nKey="about.title" components={{ br: <br /> }} />
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-xxl)' }}>
                                <Trans i18nKey="about.intro" components={{ br: <br />, strong: <strong /> }} />
                            </p>
                        </ScrollReveal>

                        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--spacing-xxl)' }}></div>

                        <section style={{ textAlign: 'center', width: '100%' }}>
                            <ScrollReveal width="100%">
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)' }}>{t('about.who_we_are')}</h2>
                            </ScrollReveal>

                            <ScrollReveal width="100%" delay={0.1}>
                                <div style={{ marginBottom: '30px', overflow: 'hidden', borderRadius: '4px' }}>
                                    <img
                                        src="/src/assets/images/about_team_silhouette.png"
                                        alt="Y2K Brothers Team"
                                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', filter: 'grayscale(30%)' }}
                                    />
                                </div>
                            </ScrollReveal>

                            <ScrollReveal width="100%" delay={0.2}>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-lg)' }}>
                                    <Trans i18nKey="about.team_desc" components={{ br: <br />, strong: <strong /> }} />
                                </p>
                            </ScrollReveal>

                            <ScrollReveal width="100%" delay={0.4}>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>{t('about.promise_title')}</h2>
                            </ScrollReveal>
                            <ScrollReveal width="100%" delay={0.6}>
                                <ul style={{ padding: 0, listStyle: 'none', color: 'var(--color-text-secondary)', lineHeight: '2' }}>
                                    {(t('about.promise_list', { returnObjects: true }) as string[]).map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </ScrollReveal>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
