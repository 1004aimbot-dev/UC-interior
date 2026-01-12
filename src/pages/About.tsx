import React from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

const About: React.FC = () => {
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
                            <span style={{ color: 'var(--color-accent-blue)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 'var(--spacing-md)', display: 'block' }}>OUR STORY</span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-lg)' }}>좋은 마감은 <br />좋은 구조에서 나옵니다</h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-xxl)' }}>
                                화려한 디자인 시안보다 중요한 것은<br />
                                그것을 실제로 구현해내는 <strong>현장의 기술력</strong>입니다.
                            </p>
                        </ScrollReveal>

                        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--spacing-xxl)' }}></div>

                        <section style={{ textAlign: 'center', width: '100%' }}>
                            <ScrollReveal width="100%">
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)' }}>WHO WE ARE</h2>
                            </ScrollReveal>

                            <ScrollReveal width="100%" delay={0.1}>
                                <div style={{ marginBottom: '30px', overflow: 'hidden', borderRadius: '4px' }}>
                                    <img
                                        src="/src/assets/images/about_team_silhouette.png"
                                        alt="UC Brothers Team"
                                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', filter: 'grayscale(30%)' }}
                                    />
                                </div>
                            </ScrollReveal>

                            <ScrollReveal width="100%" delay={0.2}>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-lg)' }}>
                                    U Craft INTERIOR는 형제가 함께 운영하는 시공 전문 팀입니다.<br /><br />
                                    형은 목공(Carpentry)을,<br />
                                    동생은 타일(Tile)을 전담합니다.<br /><br />

                                    서로 다른 분야에서 기술을 연마하던 형제는, 각자의 현장에서 겪는 '소통의 부재'와 '책임 떠넘기기'에 답답함을 느꼈습니다.
                                    그래서 <strong>"우리가 처음부터 끝까지 책임지자"</strong>는 결심으로 팀을 이루었습니다.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal width="100%" delay={0.4}>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>OUR PROMISE</h2>
                            </ScrollReveal>
                            <ScrollReveal width="100%" delay={0.6}>
                                <ul style={{ padding: 0, listStyle: 'none', color: 'var(--color-text-secondary)', lineHeight: '2' }}>
                                    <li>우리는 직접 일하지 않는 현장은 맡지 않습니다.</li>
                                    <li>우리는 고객이 이해하지 못하는 견적을 내지 않습니다.</li>
                                    <li>우리는 평생 책임질 수 있는 마감만을 고집합니다.</li>
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
