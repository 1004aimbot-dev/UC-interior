import React from 'react';
import styles from './ProcessFlow.module.css';

import { useTranslation } from 'react-i18next';

const ProcessFlow: React.FC = () => {
    const { t } = useTranslation();

    const steps = [
        {
            id: 1,
            step: "STEP 01",
            title: t('process.step1'),
            desc: t('process.desc1')
        },
        {
            id: 2,
            step: "STEP 02",
            title: t('process.step2'),
            desc: t('process.desc2')
        },
        {
            id: 3,
            step: "STEP 03",
            title: t('process.step3'),
            desc: t('process.desc3')
        },
        {
            id: 4,
            step: "STEP 04",
            title: t('process.step4'),
            desc: t('process.desc4')
        }
    ];
    return (
        <section className={styles.processSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{t('process.title')}</h2>
                <div className={styles.flowGrid}>
                    {steps.map((item, index) => (
                        <div key={item.id} className={styles.stepCard}>
                            <div className={styles.stepNum}>{item.step}</div>
                            <h3 className={styles.stepTitle}>{item.title}</h3>
                            <p className={styles.stepDesc}>{item.desc}</p>
                            {index < steps.length - 1 && <div className={styles.arrow}>→</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessFlow;
