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
                            <li>{t('service.items.walls')}</li>
                            <li>{t('service.items.ceilings')}</li>
                            <li>{t('service.items.structure')}</li>
                            <li>{t('service.items.guidelines')}</li>
                        </ul>
                    </div>

                    {/* Integration Point (Visual Connector) */}
                    <div className={styles.integration}>
                        <div className={styles.plusIcon}>+</div>
                        <div className={styles.integrationBox}>
                            <h4 className={styles.integrationTitle}>{t('service.integration')}</h4>
                            <ul className={styles.integrationList}>
                                <li>{t('service.items.level_diff')}</li>
                                <li>{t('service.items.contact_point')}</li>
                                <li>{t('service.items.grout')}</li>
                                <li>{t('service.items.waterproofing')}</li>
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
                            <li>{t('service.items.wall_tiling')}</li>
                            <li>{t('service.items.floor_tiling')}</li>
                            <li>{t('service.items.bathroom')}</li>
                            <li>{t('service.items.finishing')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceStructure;
