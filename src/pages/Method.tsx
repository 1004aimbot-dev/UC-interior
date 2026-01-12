import React from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

const Method: React.FC = () => {
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
                        <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xxl)' }}>CONSTRUCTION METHOD</h1>
                    </ScrollReveal>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <ScrollReveal width="100%">
                            <h2 style={{ color: 'var(--color-accent-blue)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: 'var(--spacing-md)' }}>INTEGRATED SYSTEM</h2>
                        </ScrollReveal>
                        <ScrollReveal width="100%" delay={0.2}>
                            <h3 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)' }}>목공과 타일의 유기적 결합</h3>
                        </ScrollReveal>
                        <ScrollReveal width="100%" delay={0.3}>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-xxl)' }}>
                                일반적인 인테리어 현장에서는 목수와 타일공이 서로 다른 팀입니다. 소통 부족으로 인해 "목공이 잘못해서 타일이 안 맞는다"거나 "타일이 실력이 없어서 마감이 거칠다"는 핑계가 발생합니다.<br /><br />

                                <strong style={{ color: '#fff' }}>U Craft INTERIOR는 다릅니다.</strong><br />
                                우리는 타일을 붙일 것을 고려하여 목공상을 잡고, 목공의 수직수평을 믿고 타일을 붙입니다.
                                모든 공정의 책임은 하나로 귀결됩니다.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal width="100%" delay={0.4}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>핵심 시공 프로세스</h3>
                        </ScrollReveal>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                            <ScrollReveal delay={0.4}>
                                <img src="/src/assets/images/method_laser_level.png" alt="Laser Leveling" style={{ width: '100%', borderRadius: '4px', border: '1px solid #333' }} />
                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>3D Laser Leveling for Precision</p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.5}>
                                <img src="/src/assets/images/method_tiling_process.png" alt="Tiling Process" style={{ width: '100%', borderRadius: '4px', border: '1px solid #333' }} />
                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>High-End Porcelain Tiling</p>
                            </ScrollReveal>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { title: "STEP 1. 레이저 레벨링", desc: "현장 전체의 수직/수평을 3D 레이저 레벨기로 진단하고 기준점(O-Point)을 설정합니다." },
                                { title: "STEP 2. 도면 기반 먹메김", desc: "도면상의 치수를 현장 바닥과 벽에 1:1로 그려넣어 오차를 사전에 발견합니다." },
                                { title: "STEP 3. 구조 보강 목공", desc: "타일 하중을 견딜 수 있도록 합판 보강 및 촘촘한 상 작업을 진행합니다." },
                                { title: "STEP 4. 정밀 타일링", desc: "클립 시공법과 진동 압착기를 사용하여 빈 공간(공극) 없는 밀착 시공을 합니다." }
                            ].map((step, idx) => (
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
