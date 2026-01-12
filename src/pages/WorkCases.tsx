import React from 'react';
import { caseStudies } from '../data/cases';
import CaseCard from '../components/cases/CaseCard';
import ScrollReveal from '../components/ui/ScrollReveal';

const WorkCases: React.FC = () => {
    return (
        <div className="bg-concrete-wrapper" style={{
            backgroundImage: `url('/src/assets/images/bg_construction_blur.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)', minHeight: '100vh' }} className="section-padding">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xxl)' }}>
                        <ScrollReveal width="100%">
                            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>WORK CASES</h1>
                        </ScrollReveal>
                        <ScrollReveal width="100%" delay={0.2}>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                UC 형제가 직접 시공한 현장의 기록입니다.<br />
                                화려한 사진보다는, 공정의 정확함과 마감의 디테일을 확인해 주세요.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-lg)',
                        justifyContent: 'center'
                    }}>
                        {caseStudies.map((study, index) => (
                            <ScrollReveal key={study.id} delay={index * 0.1}>
                                <CaseCard data={study} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkCases;
