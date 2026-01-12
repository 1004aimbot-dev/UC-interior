import React from 'react';
import styles from './TrustCards.module.css';
import { useTranslation } from 'react-i18next';


const TrustCards: React.FC = () => {
    const { t } = useTranslation();

    const trustPoints = [
        {
            id: 1,
            num: "01",
            title: t('trust.direct_title'),
            desc: t('trust.direct_desc')
        },
        {
            id: 2,
            num: "02",
            title: t('trust.transparent_title'),
            desc: t('trust.transparent_desc')
        },
        {
            id: 3,
            num: "03",
            title: t('trust.guarantee_title'),
            desc: t('trust.guarantee_desc')
        },
        {
            id: 4,
            num: "04",
            title: t('trust.quality_title'),
            desc: t('trust.quality_desc')
        }
    ];


    return (
        <section className={styles.trustSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>WHY U Craft INTERIOR?</h2>
                <div className={styles.grid}>
                    {trustPoints.map((point) => (
                        <div key={point.id} className={styles.card}>
                            <div className={styles.cardNum}>{point.num}</div>
                            <h3 className={styles.cardTitle}>{point.title}</h3>
                            <p className={styles.cardDesc}>{point.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustCards;
