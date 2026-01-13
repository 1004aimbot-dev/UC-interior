import { useTranslation, Trans } from 'react-i18next';
import ScrollReveal from '../components/ui/ScrollReveal';

const Method: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-concrete-wrapper" style={{
            backgroundImage: `url('/src/assets/images/bg_construction_blur.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', minHeight: '100vh' }} className="section-padding">
                <div className="container">
                    <ScrollReveal width="100%">
                        <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xxl)' }}>{t('method.title')}</h1>
                    </ScrollReveal>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <ScrollReveal width="100%">
                            <h2 style={{ color: 'var(--color-accent-blue)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: 'var(--spacing-md)' }}>{t('method.integrated_system')}</h2>
                        </ScrollReveal>
                        <ScrollReveal width="100%" delay={0.2}>
                            <h3 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)' }}>{t('method.integrated_title')}</h3>
                        </ScrollReveal>
                        <ScrollReveal width="100%" delay={0.3}>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-xxl)' }}>
                                <Trans i18nKey="method.integrated_desc" components={{ br: <br />, strong: <strong style={{ color: '#fff' }} /> }} />
                            </p>
                        </ScrollReveal>

                        <ScrollReveal width="100%" delay={0.4}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>{t('method.process_title')}</h3>
                        </ScrollReveal>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                            <ScrollReveal delay={0.4}>
                                <img src="/src/assets/images/method_laser_level.png" alt="Laser Leveling" style={{ width: '100%', borderRadius: '4px', border: '1px solid #333' }} />
                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>{t('method.laser_level')}</p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.5}>
                                <img src="/src/assets/images/method_tiling_process.png" alt="Tiling Process" style={{ width: '100%', borderRadius: '4px', border: '1px solid #333' }} />
                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>{t('method.high_end_tiling')}</p>
                            </ScrollReveal>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {(t('method.steps', { returnObjects: true }) as { title: string, desc: string }[]).map((step, idx) => (
                                <ScrollReveal key={idx} delay={0.5 + (idx * 0.1)} width="100%">
                                    <li style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-lg)', border: '1px solid var(--color-border)', backgroundColor: 'rgba(26, 26, 26, 0.9)' }}>
                                        <h4 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)' }}>{step.title}</h4>
                                        <p style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
                                    </li>
                                </ScrollReveal>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Method;
