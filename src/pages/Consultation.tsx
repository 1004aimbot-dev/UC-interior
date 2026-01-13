import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { apiClient } from '../services/apiClient';
import ScrollReveal from '../components/ui/ScrollReveal';
import s from './Consultation.module.css';

const Consultation: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        serviceType: 'both', // default: 목공+타일
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.contact.trim()) {
            alert(t('consultation_page.alerts.required'));
            return;
        }

        setIsSubmitting(true);
        try {
            await apiClient.submitConsultation(formData);
            alert(t('consultation_page.alerts.success'));
            setFormData({
                name: '',
                contact: '',
                address: '',
                serviceType: 'both',
                message: ''
            });
        } catch (error) {
            alert(t('consultation_page.alerts.error'));
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={s.pageWrapper}>
            <div className={`${s.overlay} section-padding`}>
                <div className="container">
                    <div className={s.container}>
                        <ScrollReveal width="100%">
                            <div className={s.header}>
                                <h1 className={s.title}>{t('consultation_page.title')}</h1>
                                <p className={s.subtitle}>
                                    <Trans i18nKey="consultation_page.subtitle" components={{ br: <br /> }} />
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal width="100%" delay={0.2}>
                            <form onSubmit={handleSubmit} className={s.form}>

                                <div className={s.formGroup}>
                                    <label htmlFor="name" className={s.label}>{t('consultation_page.form.name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={s.input}
                                    />
                                </div>

                                <div className={s.formGroup}>
                                    <label htmlFor="contact" className={s.label}>{t('consultation_page.form.contact')}</label>
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        placeholder="010-0000-0000"
                                        className={s.input}
                                    />
                                </div>

                                <div className={s.formGroup}>
                                    <label htmlFor="address" className={s.label}>{t('consultation_page.form.address')}</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder={t('consultation_page.form.address_placeholder')}
                                        className={s.input}
                                    />
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <label className={s.label} style={{ marginBottom: '15px' }}>{t('consultation_page.form.service')}</label>
                                    <div className={s.serviceGrid}>
                                        {[
                                            { id: 'carpentry', label: t('consultation_page.form.service_options.carpentry') },
                                            { id: 'tile', label: t('consultation_page.form.service_options.tile') },
                                            { id: 'both', label: t('consultation_page.form.service_options.both') },
                                            { id: 'unknown', label: t('consultation_page.form.service_options.unknown') }
                                        ].map(option => (
                                            <div key={option.id}
                                                onClick={() => setFormData(prev => ({ ...prev, serviceType: option.id }))}
                                                className={`${s.serviceOption} ${formData.serviceType === option.id ? s.serviceOptionActive : ''}`}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={s.formGroup}>
                                    <label htmlFor="message" className={s.label}>{t('consultation_page.form.message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('consultation_page.form.message_placeholder')}
                                        className={s.input}
                                        style={{ height: '120px', resize: 'none', fontFamily: 'inherit' }}
                                    />
                                </div>

                                <button type="submit" className={s.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? t('consultation_page.form.submitting') : t('consultation_page.form.submit')}
                                </button>
                            </form>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <div className={s.infoText}>
                                <p className={s.infoPara}>
                                    <Trans i18nKey="consultation_page.info" components={{ br: <br /> }} />
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultation;
