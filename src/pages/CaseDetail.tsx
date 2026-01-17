import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { caseStudies } from '../data/cases';
import ScrollReveal from '../components/ui/ScrollReveal';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';

const CaseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const project = caseStudies.find(p => p.id === id);

    if (!project) {
        return (
            <div className="container section-padding text-center">
                <h2>{t('case_detail.project_not_found')}</h2>
                <button className="btn btn-primary" onClick={() => navigate('/cases')}>
                    {t('case_detail.back_to_list_btn')}
                </button>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#fff', paddingTop: '80px' }}>
            {/* Hero Image */}
            <div style={{ width: '100%', height: '60vh', overflow: 'hidden', position: 'relative' }}>
                <img
                    src={project.images.main}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    padding: '40px 0',
                    display: 'flex', alignItems: 'flex-end'
                }}>
                    <div className="container">
                        <ScrollReveal>
                            <span style={{ color: 'var(--color-accent-blue)', letterSpacing: '0.1em' }}>PROJECT {id?.replace('project-', '')}</span>
                            <h1 style={{ fontSize: '3rem', margin: '10px 0' }}>{t(`cases_data.${id?.replace('-', '')}.title`)}</h1>
                            <p style={{ fontSize: '1.2rem', color: '#ccc' }}>{t(`cases_data.${id?.replace('-', '')}.location`)}</p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            <div className="container section-padding">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

                    {/* Left Column: Story */}
                    <div>
                        <ScrollReveal>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>{t('case_detail.challenge_solution')}</h2>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>{t('case_detail.condition_title')}</h3>
                                <p style={{ lineHeight: '1.8' }}>{t(`cases_data.${id?.replace('-', '')}.condition`)}</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>{t('case_detail.design_plan_title')}</h3>
                                <p style={{ lineHeight: '1.8' }}>{t(`cases_data.${id?.replace('-', '')}.design`)}</p>
                            </div>
                        </ScrollReveal>

                        <button className="btn btn-outline" onClick={() => navigate('/cases')} style={{ marginTop: '20px' }}>
                            {t('case_detail.back_to_list')}
                        </button>
                    </div>

                    {/* Right Column: Tech Specs & Details */}
                    <div>
                        <ScrollReveal delay={0.2}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>{t('case_detail.construction_detail')}</h2>
                        </ScrollReveal>

                        <div style={{ backgroundColor: '#222', padding: '30px', borderRadius: '4px' }}>
                            <ScrollReveal delay={0.3}>
                                <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ color: 'var(--color-accent-blue)', marginBottom: '8px' }}>{t('case_detail.carpentry')}</h4>
                                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>{t(`cases_data.${id?.replace('-', '')}.carpentry`)}</p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4}>
                                <div style={{ marginBottom: '25px' }}>
                                    <h4 style={{ color: 'var(--color-accent-blue)', marginBottom: '8px' }}>{t('case_detail.tile')}</h4>
                                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>{t(`cases_data.${id?.replace('-', '')}.tile`)}</p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.5}>
                                <div>
                                    <h4 style={{ color: 'var(--color-accent-blue)', marginBottom: '8px' }}>{t('case_detail.finish_check')}</h4>
                                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>{t(`cases_data.${id?.replace('-', '')}.finish`)}</p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Before & After Section */}
                {project.images.before && (
                    <div style={{ marginTop: '100px' }}>
                        <ScrollReveal width="100%">
                            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '50px' }}>
                                {t('case_detail.project_transformation')}
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal width="100%" delay={0.2}>
                            <BeforeAfterSlider
                                beforeImage={project.images.before}
                                afterImage={project.images.main} // Using main image as the 'after' for comparison
                                altText={`${project.title} Before and After`}
                            />
                            <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontStyle: 'italic' }}>
                                {t('case_detail.slider_instruction')}
                            </p>
                        </ScrollReveal>
                    </div>
                )}

                {/* Gallery Section */}
                <div style={{ marginTop: '100px' }}>
                    <ScrollReveal width="100%">
                        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '50px' }}>
                            {t('case_detail.detail_view')}
                        </h2>
                    </ScrollReveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                        {project.images.after.map((img, idx) => (
                            <ScrollReveal key={idx} delay={0.2 + (idx * 0.1)} width="100%">
                                <div style={{ height: '400px', overflow: 'hidden', borderRadius: '4px' }}>
                                    <img
                                        src={img}
                                        alt={`Detail ${idx + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CaseDetail;
