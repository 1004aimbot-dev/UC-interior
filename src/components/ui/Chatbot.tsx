import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    text: React.ReactNode;
    isUser: boolean;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "안녕하세요 U Craft Interior입니다.\n무엇을 도와드릴까요?", isUser: false }
    ]);
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const msgIdCounter = useRef(2);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleOptionClick = (option: string) => {
        // User message
        const userMsgId = msgIdCounter.current++;
        setMessages(prev => [...prev, { id: userMsgId, text: option, isUser: true }]);

        // Bot response delay
        setTimeout(() => {
            let botResponse = "";
            let action = null;

            switch (option) {
                case "평당 견적이 궁금해요":
                    botResponse = "저희는 '평당 얼마' 식의 견적을 내지 않습니다. 현장 상태에 따라 필요한 자재와 인건비(품)를 산출하는 '실비 정산' 방식을 추천드립니다. 정확한 것은 현장 실측이 필요합니다.";
                    break;
                case "직접 시공하시나요?":
                    botResponse = "네, 그렇습니다. 목공과 타일 두 핵심 공정을 외주 없이 UC 형제가 직접 시공하여, 책임감 있는 마감을 보장합니다.";
                    break;
                case "시공 가능 지역은?":
                    botResponse = "현재 서울 전 지역 및 경기 일부 지역(성남, 하남, 용인 등) 위주로 시공하고 있습니다. 거리가 먼 경우 별도의 출장비가 발생할 수 있습니다.";
                    break;
                case "상담 신청하고 싶어요":
                    botResponse = "네, 알겠습니다. 상담 신청 페이지로 안내해 드리겠습니다.";
                    action = () => navigate('/consultation');
                    break;
                case "A/S 기간은 어떻게 되나요?":
                    botResponse = "하자 이행 보증 증권을 발행해 드리며, 법적 의무 기간인 1년은 기본입니다. 특히 저희가 시공한 목공/타일 구조적 문제는 끝까지 책임집니다.";
                    break;
                case "공사 기간은 얼마나 걸리나요?":
                    botResponse = "공사 범위에 따라 다르지만, 보통 30평형 전체 리모델링 기준 3~4주, 부분 공사는 1~2주 정도 소요됩니다.";
                    break;
                case "부분 시공도 가능한가요?":
                    botResponse = "네, 가능합니다. 다만 목공과 타일 공정이 포함된 공사를 우선으로 하고 있습니다. 단순 도배/장판 교체 등은 정중히 사양하고 있습니다.";
                    break;
                case "상가/사무실도 하시나요?":
                    botResponse = "네, 상업 공간(카페, 식당, 오피스 등) 시공 경험도 풍부합니다. 주거 공간과는 다른 내구성과 디자인을 제안해 드립니다.";
                    break;
                case "카드 결제 가능한가요?":
                    botResponse = "네, 카드 결제, 현금영수증 발행, 세금계산서 발행 모두 가능합니다. (부가세 10% 별도)";
                    break;
                case "방문 상담 비용이 있나요?":
                    botResponse = "1차 전화 상담은 무료입니다. 현장 실측 및 상세 견적 산출을 위한 방문은 소정의 출장비(5~10만원)가 발생할 수 있으며, 계약 시 차감해 드립니다.";
                    break;
                default:
                    botResponse = "죄송합니다. 이해하지 못했습니다.";
            }

            setMessages(prev => [...prev, { id: msgIdCounter.current++, text: botResponse, isUser: false }]);
            if (action) {
                setTimeout(action, 1500);
            }
        }, 500);
    };

    const quickReplies = [
        "평당 견적이 궁금해요",
        "직접 시공하시나요?",
        "시공 가능 지역은?",
        "A/S 기간은 어떻게 되나요?",
        "공사 기간은 얼마나 걸리나요?",
        "부분 시공도 가능한가요?",
        "상가/사무실도 하시나요?",
        "카드 결제 가능한가요?",
        "방문 상담 비용이 있나요?",
        "상담 신청하고 싶어요"
    ];

    return (
        <>
            {/* Chat Trigger Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent-blue)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? (
                    <span style={{ fontSize: '24px', color: '#fff' }}>✕</span>
                ) : (
                    <span style={{ fontSize: '24px', transform: 'scaleX(-1)' }}>💬</span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '30px',
                            width: '350px',
                            height: '500px',
                            backgroundColor: 'rgba(20, 20, 20, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid #333',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '15px 20px',
                            borderBottom: '1px solid #333',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#4CAF50'
                            }} />
                            <span style={{ fontWeight: 'bold', color: '#fff' }}>UC Bot</span>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            padding: '20px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        borderBottomRightRadius: msg.isUser ? '2px' : '12px',
                                        borderTopLeftRadius: msg.isUser ? '12px' : '2px',
                                        backgroundColor: msg.isUser ? 'var(--color-accent-blue)' : '#333',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5',
                                        whiteSpace: 'pre-line'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        <div style={{
                            padding: '15px',
                            borderTop: '1px solid #333',
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {quickReplies.map((reply, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(reply)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '20px',
                                            border: '1px solid #444',
                                            backgroundColor: '#222',
                                            color: '#ccc',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#333';
                                            e.currentTarget.style.borderColor = '#666';
                                            e.currentTarget.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#222';
                                            e.currentTarget.style.borderColor = '#444';
                                            e.currentTarget.style.color = '#ccc';
                                        }}
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
