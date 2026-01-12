import React from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

const Scope: React.FC = () => {
    return (
        <div className="bg-wood-wrapper" style={{
            backgroundImage: `url('/src/assets/images/bg_construction_blur.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', minHeight: '100vh' }} className="section-padding">
                <div className="container">
                    <ScrollReveal width="100%">
                        <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xxl)' }}>CONSTRUCTION SCOPE</h1>
                    </ScrollReveal>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                        {/* Carpentry Scope */}
                        <ScrollReveal delay={0.2}>
                            <section style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)', padding: 'var(--spacing-xl)', borderRadius: '2px', border: '1px solid var(--color-border)' }}>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>목공 (Carpentry)</h2>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                    공간의 뼈대를 만드는 작업입니다. 수직과 수평을 맞추고, 단열과 방음을 보강하며, 디자인의 기초를 다집니다.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {['가벽/파티션 신설', '천장 평탄화 및 덴조 작업', '히든도어/무문선 작업', '아치/라운드 목공', '단열 및 석고보드 마감'].map(item => (
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
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>타일 (Tile)</h2>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                    공간의 표정을 결정하는 마감 작업입니다. 오차 없는 라인 정렬과 견고한 접착이 핵심입니다.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {['졸리컷(면치기) 정밀 시공', '600각/1200각 대형 타일', '욕실/주방/현관 바닥', '포세린/세라믹 타일', '에폭시 줄눈 마감'].map(item => (
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
                                "목공의 1mm 오차가 타일 마감에서는 1cm의 하자로 이어집니다."
                            </p>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
                                "타일의 0.1mm 디테일 차이가 공간의 품격을 완전히 바꿉니다."
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                U Craft INTERIOR는 이 두 공정을 직접 수행하여, 구조적 결함 없는 완벽한 마감을 보장합니다.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scope;
