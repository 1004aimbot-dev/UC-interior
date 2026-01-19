import React, { useEffect, useState } from 'react';
import { caseStudies, type CaseStudy } from '../data/cases';
import CaseCard from '../components/cases/CaseCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const WorkCases: React.FC = () => {
    const { t } = useTranslation();
    const [dynamicCases, setDynamicCases] = useState<CaseStudy[]>([]);

    useEffect(() => {
        if (!db) {
            console.warn("Firebase db not initialized. Using static data only.");
            return;
        }

        const q = query(collection(db, 'cases'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("Firestore snapshot size:", snapshot.size); // Debug
            const fetchedCases: CaseStudy[] = snapshot.docs.map(doc => {
                const data = doc.data();
                console.log("Fetched doc data:", data); // Debug
                return {
                    id: doc.id,
                    title: data.title,
                    description: data.summary,
                    summary: data.summary,
                    condition: data.condition || '',
                    design: data.design || '',
                    carpentry: data.carpentry || '',
                    tile: data.tile || '',
                    finish: data.finish || '',
                    images: {
                        main: data.images?.main || '/images/default_case.png',
                        before: data.images?.before,
                        after: Array.isArray(data.images?.after) ? data.images.after : (data.images?.after ? [data.images.after] : [])
                    },
                    location: data.location || 'Unknown'
                } as CaseStudy;
            });
            console.log("Final dynamic cases:", fetchedCases); // Debug
            setDynamicCases(fetchedCases);
        });

        return () => unsubscribe();
    }, []);

    // Combine static and dynamic cases (Dynamic first)
    const allCases = [...dynamicCases, ...caseStudies];

    return (
        <div className="bg-concrete-wrapper" style={{
            backgroundImage: `url('/images/bg_construction_blur.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)', minHeight: '100vh' }} className="section-padding">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xxl)' }}>
                        <ScrollReveal width="100%">
                            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>{t('cases_page.title')}</h1>
                        </ScrollReveal>
                        <ScrollReveal width="100%" delay={0.2}>
                            <p
                                style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
                                dangerouslySetInnerHTML={{ __html: t('cases_page.description') }}
                            />
                        </ScrollReveal>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-lg)',
                        justifyContent: 'center'
                    }}>
                        {allCases.map((study, index) => (
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
