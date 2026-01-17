import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ui/ScrollReveal';
import s from './AIPreview.module.css';

const AIPreview: React.FC = () => {
    const { t } = useTranslation();
    const [selectedSpace, setSelectedSpace] = useState<string | null>('living');
    const [selectedStyle, setSelectedStyle] = useState<string | null>('modern');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const spaces = [
        { id: 'living', label: t('ai_preview_page.spaces.living'), image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop' },
        { id: 'kitchen', label: t('ai_preview_page.spaces.kitchen'), image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop' },
        { id: 'bedroom', label: t('ai_preview_page.spaces.bedroom'), image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop' },
        { id: 'bathroom', label: t('ai_preview_page.spaces.bathroom'), image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=600&auto=format&fit=crop' }
    ];

    const styles = [
        { id: 'modern', label: t('ai_preview_page.styles.modern'), image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop' },
        { id: 'minimal', label: t('ai_preview_page.styles.minimal'), image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600&auto=format&fit=crop' },
        { id: 'wood', label: t('ai_preview_page.styles.wood'), image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600&auto=format&fit=crop' },
        { id: 'luxury', label: t('ai_preview_page.styles.luxury'), image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop' },
        { id: 'industrial', label: t('ai_preview_page.styles.industrial'), image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=600&auto=format&fit=crop' },
        { id: 'classic', label: t('ai_preview_page.styles.classic'), image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=600&auto=format&fit=crop' },
        { id: 'natural', label: t('ai_preview_page.styles.natural'), image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=600&auto=format&fit=crop' },
        { id: 'scandinavian', label: t('ai_preview_page.styles.scandinavian'), image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=600&auto=format&fit=crop' },
        { id: 'midcentury', label: t('ai_preview_page.styles.midcentury'), image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop' },
        { id: 'artdeco', label: t('ai_preview_page.styles.artdeco'), image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop' }
    ];

    const handleGenerate = () => {
        if (!selectedSpace || !selectedStyle) return;
        setIsGenerating(true);

        // Sample images for each space type - assured model-free (empty interiors)
        const sampleImages: Record<string, string> = {
            living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000',
            kitchen: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2000',
            bedroom: 'https://images.unsplash.com/photo-1616594039964-40891a908175?auto=format&fit=crop&q=80&w=2000',
            bathroom: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2000&auto=format&fit=crop'
        };

        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            const imageUrl = sampleImages[selectedSpace] || sampleImages['living'];
            setGeneratedImage(imageUrl);
        }, 1500);
    };

    return (
        <div className={s.pageWrapper}>
            <div className="section-padding container">
                <ScrollReveal>
                    <div className={s.headerSection}>
                        <span className={s.subTitle}>
                            {t('ai_preview_page.subtitle')}
                        </span>
                        <h1 className={s.mainTitle}>{t('ai_preview_page.title')}</h1>
                        <p className={s.description}>
                            {t('ai_preview_page.description')}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Step 1: Select Space */}
                <ScrollReveal delay={0.1} width="100%">
                    <div className={s.stepSection}>
                        <h2 className={s.stepTitle}>{t('ai_preview_page.step1')}</h2>
                        <div className={s.spaceGrid}>
                            {spaces.map(space => (
                                <button
                                    key={space.id}
                                    onClick={() => setSelectedSpace(space.id)}
                                    className={`${s.spaceButton} ${selectedSpace === space.id ? s.spaceButtonActive : ''}`}
                                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${space.image})` }}
                                >
                                    <div className={s.spaceLabel}>{space.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Step 2: Select Style */}
                <ScrollReveal delay={0.2} width="100%">
                    <div className={s.stepSection}>
                        <h2 className={s.stepTitle}>{t('ai_preview_page.step2')}</h2>
                        <div className={s.styleGrid}>
                            {styles.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`${s.styleButton} ${selectedStyle === style.id ? s.styleButtonActive : ''}`}
                                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${style.image})` }}
                                >
                                    <div className={s.styleLabel}>{style.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Step 3: Generate */}
                <ScrollReveal delay={0.3} width="100%">
                    <div className={s.generateContainer}>
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedSpace || !selectedStyle || isGenerating}
                            className={`${s.generateButton} ${(!selectedSpace || !selectedStyle || isGenerating) ? s.generateButtonDisabled : ''}`}
                        >
                            {isGenerating ? t('ai_preview_page.generating') : t('ai_preview_page.generate_btn')}
                        </button>
                    </div>
                </ScrollReveal>

                {/* Result Area */}
                {generatedImage && (
                    <ScrollReveal>
                        <div className={s.resultContainer}>
                            <img
                                src={generatedImage}
                                alt="AI Generated Interior"
                                className={s.resultImage}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/333333/FFFFFF/png?text=Preview+Generation+Failed';
                                }}
                            />
                        </div>
                        <p className={s.disclaimer}>
                            {t('ai_preview_page.disclaimer')}
                        </p>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
};

export default AIPreview;
