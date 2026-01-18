import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ui/ScrollReveal';

const Scope: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-wood-wrapper" style={{
            backgroundImage: `url('/images/bg_construction_blur.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', minHeight: '100vh' }} className="section-padding">
                <div className="container">
                    <ScrollReveal width="100%">
                        <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xxl)' }}>{t('scope.title')}</h1>
                    </ScrollReveal>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                        {/* Carpentry Scope */}
                        <ScrollReveal delay={0.2}>
                            <section style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)', padding: 'var(--spacing-xl)', borderRadius: '2px', border: '1px solid var(--color-border)' }}>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>{t('scope.carpentry_title')}</h2>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                    {t('scope.carpentry_desc')}
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {(t('scope.carpentry_list', { returnObjects: true }) as string[]).map(item => (
                                        <li key={item} style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </ScrollReveal>

                        {/* Tile Scope */}
                        <ScrollReveal delay={0.4}>
                            <section style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)', padding: 'var(--spacing-xl)', borderRadius: '2px', border: '1px solid var(--color-border)' }}>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>{t('scope.tile_title')}</h2>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                    {t('scope.tile_desc')}
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {(t('scope.tile_list', { returnObjects: true }) as string[]).map(item => (
                                        <li key={item} style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </ScrollReveal>
                    </div>

                    <div style={{ marginTop: 'var(--spacing-xxl)', textAlign: 'center' }}>
                        <ScrollReveal width="100%" delay={0.6}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
                                {t('scope.quote1')}
                            </p>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
                                {t('scope.quote2')}
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                {t('scope.conclusion')}
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scope;
