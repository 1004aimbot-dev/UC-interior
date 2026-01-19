import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { CaseStudy } from '../../data/cases';
import styles from './CaseCard.module.css';

interface CaseCardProps {
    data: CaseStudy;
}

const CaseCard: React.FC<CaseCardProps> = ({ data }) => {
    const { t } = useTranslation();
    return (
        <Link to={`/cases/${data.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                {data.images.main ? (
                    <img src={data.images.main} alt={data.title} className={styles.cardImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div className={styles.imagePlaceholder} />
                )}
                <div className={styles.overlay}>
                    <span className={styles.viewText}>VIEW PROJECT</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className="meta">
                    <span className={styles.id}>{data.id.startsWith('project-') ? data.id.replace('project-', 'PROJECT ') : 'PROJECT'}</span>
                    <span className={styles.location}>
                        {data.id.startsWith('project-')
                            ? t(`cases_data.${data.id.replace('-', '')}.location`)
                            : data.location}
                    </span>
                </div>
                <h3 className={styles.title}>
                    {data.id.startsWith('project-')
                        ? t(`cases_data.${data.id.replace('-', '')}.title`)
                        : data.title}
                </h3>
                <p className={styles.summary}>
                    {data.id.startsWith('project-')
                        ? t(`cases_data.${data.id.replace('-', '')}.summary`)
                        : data.summary}
                </p>
            </div>
        </Link>
    );
};

export default CaseCard;
