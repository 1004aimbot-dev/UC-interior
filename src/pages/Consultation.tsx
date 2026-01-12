import React, { useState } from 'react';
import { apiClient } from '../services/apiClient';
import ScrollReveal from '../components/ui/ScrollReveal';
import s from './Consultation.module.css';

const Consultation: React.FC = () => {
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
            alert('성함과 연락처를 모두 입력해 주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            await apiClient.submitConsultation(formData);
            alert('신청되었습니다.');
            setFormData({
                name: '',
                contact: '',
                address: '',
                serviceType: 'both',
                message: ''
            });
        } catch (error) {
            alert('오류가 발생했습니다. 다시 시도해 주세요.');
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
                                <h1 className={s.title}>시공 상담</h1>
                                <p className={s.subtitle}>
                                    도면을 이해하고 현장에 맞게 시공합니다.<br />
                                    UC 형제가 책임지고 마감하겠습니다.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal width="100%" delay={0.2}>
                            <form onSubmit={handleSubmit} className={s.form}>

                                <div className={s.formGroup}>
                                    <label htmlFor="name" className={s.label}>성함</label>
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
                                    <label htmlFor="contact" className={s.label}>연락처</label>
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
                                    <label htmlFor="address" className={s.label}>현장 주소 (대략적 위치)</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="예: 서울시 강남구"
                                        className={s.input}
                                    />
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <label className={s.label} style={{ marginBottom: '15px' }}>필요한 시공</label>
                                    <div className={s.serviceGrid}>
                                        {[
                                            { id: 'carpentry', label: '목공 (Carpentry)' },
                                            { id: 'tile', label: '타일 (Tile)' },
                                            { id: 'both', label: '목공 + 타일' },
                                            { id: 'unknown', label: '잘 모르겠음' }
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
                                    <label htmlFor="message" className={s.label}>문의 내용</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="궁금한 점이나 추가로 남기실 말씀이 있다면 적어주세요."
                                        className={s.input}
                                        style={{ height: '120px', resize: 'none', fontFamily: 'inherit' }}
                                    />
                                </div>

                                <button type="submit" className={s.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? '전송 중...' : '신청하기'}
                                </button>
                            </form>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <div className={s.infoText}>
                                <p className={s.infoPara}>
                                    * 보내주신 내용은 확인 후 24시간 이내에 연락드립니다.<br />
                                    * 현장 작업 중에는 통화가 어려울 수 있으니 문자 남겨주시면 확인하겠습니다.
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
