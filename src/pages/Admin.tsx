import React, { useState } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';
import { apiClient, type ConsultationRequest } from '../services/apiClient';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [requests, setRequests] = useState<ConsultationRequest[]>([]);

    // Filters
    const [filterService, setFilterService] = useState('all');
    const [hideCompleted, setHideCompleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await apiClient.getConsultations();
            setRequests(data);
        } catch (error) {
            console.error('Failed to load data', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load requests immediately upon successful login instead of useEffect to avoid cascading renders
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin1234') { // Simple hardcoded password
            setIsAuthenticated(true);
            loadData();
        } else {
            alert('비밀번호가 올바르지 않습니다.');
        }
    };

    const toggleStatus = async (id: string) => {
        await apiClient.toggleConsultationStatus(id);
        loadData();
    };

    const filteredRequests = requests.filter(req => {
        if (hideCompleted && req.status === 'done') return false;
        if (filterService !== 'all' && req.serviceType !== filterService) return false;
        return true;
    });

    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [selectDeleteConfirm, setSelectDeleteConfirm] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleClearData = async () => {
        if (deleteConfirm) {
            await apiClient.clearAllConsultations();
            setRequests([]);
            setSelectedIds([]);
            setDeleteConfirm(false);
            alert('모든 내역이 삭제되었습니다.');
        } else {
            setDeleteConfirm(true);
            setTimeout(() => setDeleteConfirm(false), 3000); // Reset after 3 seconds if not confirmed
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
        // Reset confirm state if selection changes
        if (selectDeleteConfirm) setSelectDeleteConfirm(false);
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;

        if (selectDeleteConfirm) {
            await apiClient.deleteMultipleConsultations(selectedIds);
            loadData();
            setSelectedIds([]);
            setSelectDeleteConfirm(false);
            alert('선택한 항목이 삭제되었습니다.');
        } else {
            setSelectDeleteConfirm(true);
            setTimeout(() => setSelectDeleteConfirm(false), 3000);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#111',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff'
            }}>
                <form onSubmit={handleLogin} style={{
                    backgroundColor: '#222',
                    padding: '40px',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '20px' }}>관리자 로그인</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                        style={{
                            padding: '10px',
                            marginBottom: '20px',
                            width: '200px',
                            display: 'block',
                            margin: '0 auto 20px',
                            backgroundColor: '#333',
                            border: '1px solid #444',
                            color: '#fff',
                            borderRadius: '4px'
                        }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        확인
                    </button>
                    <p style={{ marginTop: '10px', color: '#666', fontSize: '0.8rem' }}>(초기비번: admin1234)</p>
                </form>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#111', color: '#fff', padding: '100px 20px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1>상담 신청 내역</h1>
                    <div>
                        {selectedIds.length > 0 && (
                            <button
                                onClick={handleDeleteSelected}
                                style={{
                                    backgroundColor: selectDeleteConfirm ? '#d32f2f' : '#666',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                    transition: 'all 0.3s ease',
                                    fontWeight: selectDeleteConfirm ? 'bold' : 'normal'
                                }}
                            >
                                {selectDeleteConfirm ? '진짜 삭제할까요?' : `선택 삭제 (${selectedIds.length})`}
                            </button>
                        )}
                        <button
                            onClick={handleClearData}
                            style={{
                                backgroundColor: deleteConfirm ? '#d32f2f' : '#ff4444',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginRight: '10px',
                                transition: 'all 0.3s ease',
                                fontWeight: deleteConfirm ? 'bold' : 'normal'
                            }}
                        >
                            {deleteConfirm ? '삭제 확인 (Click !)' : '전체 삭제'}
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            style={{
                                backgroundColor: '#444',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            로그아웃
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                            style={{
                                padding: '8px',
                                backgroundColor: '#333',
                                color: '#fff',
                                border: '1px solid #444',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="all">전체 공정</option>
                            <option value="both">목공+타일</option>
                            <option value="carpentry">목공</option>
                            <option value="tile">타일</option>
                        </select>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '5px' }}>
                            <input
                                type="checkbox"
                                checked={hideCompleted}
                                onChange={(e) => setHideCompleted(e.target.checked)}
                            />
                            미처리 내역만 보기
                        </label>
                    </div>
                </div>

                {filteredRequests.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#222', borderRadius: '8px' }}>
                        <p style={{ color: '#888' }}>
                            {requests.length === 0 ? '접수된 상담 내역이 없습니다.' : '조건에 맞는 내역이 없습니다.'}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {filteredRequests.map((req) => (
                            <ScrollReveal key={req.id} width="100%">
                                <div style={{
                                    backgroundColor: selectedIds.includes(req.id) ? '#333' : (req.status === 'done' ? '#1a1a1a' : '#222'),
                                    padding: '20px',
                                    borderRadius: '8px',
                                    border: selectedIds.includes(req.id) ? '1px solid #888' : '1px solid #333',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '15px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: req.status === 'done' ? 0.6 : 1
                                }}
                                    onClick={() => toggleSelect(req.id)}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                            <div style={{ color: '#888', fontSize: '0.9rem' }}>{req.date}</div>
                                            {req.status === 'done' && (
                                                <span style={{ fontSize: '0.8rem', color: '#4caf50', border: '1px solid #4caf50', padding: '2px 6px', borderRadius: '4px' }}>완료됨</span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{req.name} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#ccc' }}>({req.contact})</span></div>
                                        <div style={{ color: '#ccc', marginBottom: '10px' }}>{req.address}</div>
                                        {req.message && (
                                            <div style={{
                                                marginTop: '10px',
                                                padding: '10px',
                                                backgroundColor: req.status === 'done' ? '#2a2a2a' : '#333',
                                                borderRadius: '4px',
                                                color: '#ddd',
                                                fontSize: '0.95rem',
                                                whiteSpace: 'pre-wrap',
                                                lineHeight: '1.5'
                                            }}>
                                                {req.message}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleStatus(req.id);
                                            }}
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: req.status === 'done' ? '#4caf50' : '#444',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {req.status === 'done' ? '완료 취소' : '완료 처리'}
                                        </button>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '6px 12px',
                                            backgroundColor: 'rgba(0, 102, 255, 0.2)',
                                            color: 'var(--color-accent-blue)',
                                            borderRadius: '20px',
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {req.serviceType.toUpperCase()}
                                        </span>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '4px',
                                            border: selectedIds.includes(req.id) ? '2px solid var(--color-accent-blue)' : '2px solid #555',
                                            backgroundColor: selectedIds.includes(req.id) ? 'var(--color-accent-blue)' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '16px'
                                        }}>
                                            {selectedIds.includes(req.id) && '✓'}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>

            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '1.2rem',
                    zIndex: 999
                }}>
                    로딩 중...
                </div>
            )}
        </div>
    );
};

export default Admin;
