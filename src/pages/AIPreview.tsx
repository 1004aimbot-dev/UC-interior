import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ui/ScrollReveal';
import s from './AIPreview.module.css';

const AIPreview: React.FC = () => {
    //    const { t } = useTranslation();
    const [selectedSpace, setSelectedSpace] = useState<string | null>('living');
    const [selectedStyle, setSelectedStyle] = useState<string | null>('modern');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const spaces = [
        { id: 'living', label: '거실', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop' }, // Luxury Dark Living Room
        { id: 'kitchen', label: '주방', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop' }, // Modern Dark Kitchen
        { id: 'bedroom', label: '침실', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop' }, // Luxury Bright Bed (Fixed Again)
        { id: 'bathroom', label: '욕실', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=600&auto=format&fit=crop' } // Luxury Stone Bathroom
    ];

    const styles = [
        { id: 'modern', label: '모던 & 시크', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop' },
        { id: 'minimal', label: '미니멀리스트', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600&auto=format&fit=crop' },
        { id: 'wood', label: '코지 우드', image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600&auto=format&fit=crop' },
        { id: 'luxury', label: '하이엔드 럭셔리', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop' },
        { id: 'industrial', label: '인더스트리얼', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=600&auto=format&fit=crop' }, // Industrial Loft (Updated)
        { id: 'classic', label: '클래식 엘레강스', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=600&auto=format&fit=crop' }, // Classic Luxury (Updated)
        { id: 'natural', label: '내추럴 젠', image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=600&auto=format&fit=crop' }, // Natural Zen
        { id: 'scandinavian', label: '스칸디나비안', image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=600&auto=format&fit=crop' }, // Nordic White/Wood
        { id: 'midcentury', label: '미드센추리 모던', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop' }, // Retro Colorful
        { id: 'artdeco', label: '아트 데코', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop' } // Gold Glam Luxury
    ];

    const handleGenerate = () => {
        if (!selectedSpace || !selectedStyle) return;
        setIsGenerating(true);

        // Sample images for each space type - assured model-free (empty interiors)
        const sampleImages: Record<string, string> = {
            living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000', // Modern empty living room
            kitchen: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2000', // Modern empty kitchen
            bedroom: 'https://images.unsplash.com/photo-1616594039964-40891a908175?auto=format&fit=crop&q=80&w=2000', // Empty cozy bedroom
            bathroom: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2000&auto=format&fit=crop' // Empty bright bathroom
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
                            AI 시뮬레이션
                        </span>
                        <h1 className={s.mainTitle}>AI 인테리어 미리보기</h1>
                        <p className={s.description}>
                            공간과 스타일을 선택하여 AI로 인테리어를 미리 확인해보세요.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Step 1: Select Space */}
                <ScrollReveal delay={0.1} width="100%">
                    <div className={s.stepSection}>
                        <h2 className={s.stepTitle}>01. 공간 선택</h2>
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
                        <h2 className={s.stepTitle}>02. 스타일 선택</h2>
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
                            {isGenerating ? '생성 중...' : 'AI 미리보기 생성'}
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
                            * 이 이미지는 AI 시뮬레이션 결과이며, 실제 시공과는 차이가 있을 수 있습니다.
                        </p>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
};

export default AIPreview;
