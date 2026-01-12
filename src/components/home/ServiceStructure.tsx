import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ServiceStructure.module.css';

const ServiceStructure: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className={styles.serviceSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{t('service.title')}</h2>
                <p className={styles.sectionDesc}>
                    {t('service.desc01')}<br />
                    {t('service.desc02')}
                </p>

                <div className={styles.grid}>
                    {/* Carpentry Column */}
                    <div className={`${styles.card} ${styles.carpentry}`}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{t('service.carpentry')}</h3>
                            <span className={styles.cardSub}>{t('service.carpentry_sub')}</span>
                        </div>
                        <ul className={styles.list}>
                            <li>벽체 (Walls)</li>
                            <li>천장 (Ceilings)</li>
                            <li>구조 (Structure)</li>
                            <li>기준선 (Guidelines)</li>
                        </ul>
                    </div>

                    {/* Integration Point (Visual Connector) */}
                    <div className={styles.integration}>
                        <div className={styles.plusIcon}>+</div>
                        <div className={styles.integrationBox}>
                            <h4 className={styles.integrationTitle}>{t('service.integration')}</h4>
                            <ul className={styles.integrationList}>
                                <li>단차</li>
                                <li>접점</li>
                                <li>줄눈</li>
                                <li>방수</li>
                            </ul>
                        </div>
                    </div>

                    {/* Tile Column */}
                    <div className={`${styles.card} ${styles.tile}`}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{t('service.tile')}</h3>
                            <span className={styles.cardSub}>{t('service.tile_sub')}</span>
                        </div>
                        <ul className={styles.list}>
                            <li>벽 (Wall Tiling)</li>
                            <li>바닥 (Floor Tiling)</li>
                            <li>욕실 (Bathroom)</li>
                            <li>마감 (Finishing)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceStructure;
