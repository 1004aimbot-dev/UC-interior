import React, { useState } from 'react';
import { db, storage, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminCase: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Form States
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [summary, setSummary] = useState('');
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [beforeImage, setBeforeImage] = useState<File | null>(null);
    const [afterImage, setAfterImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Debugging Tool States
    const [debugInfo, setDebugInfo] = useState<string>('');
    const [bucketName, setBucketName] = useState<string>('');

    // Check for existing login session
    React.useEffect(() => {
        if (!auth) return;
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Restored session for:", user.email);
                setIsLoggedIn(true);
            }
        });
        return () => unsubscribe();
    }, []);

    // Debug Info Effect
    React.useEffect(() => {
        if (storage) {
            setBucketName(storage.app.options.storageBucket || 'UNDEFINED');
        }
    }, []);

    if (!auth || !db || !storage) {
        return (
            <div className="container section-padding text-center" style={{ marginTop: '100px', color: '#fff' }}>
                <h1>Configuration Required</h1>
                <p>Firebase is not initialized. Please check your .env file.</p>
            </div>
        );
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login button clicked", email); // Debug log
        setErrorMsg('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            setIsLoggedIn(true);
        } catch (error: any) {
            console.error("Login Error:", error);
            let msg = '로그인 실패';
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                msg = '이메일 또는 비밀번호가 틀렸습니다.';
            } else if (error.code === 'auth/user-not-found') {
                msg = '등록되지 않은 사용자입니다.';
            } else if (error.code === 'auth/too-many-requests') {
                msg = '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
            } else if (error.message) {
                msg = error.message;
            }
            setErrorMsg(msg);
            alert(msg);
        }
    };

    // ... existing handlers ...

    if (!isLoggedIn) {
        return (
            <div className="container section-padding" style={{ maxWidth: '400px', marginTop: '100px' }}>
                <h1 className="text-center">Admin Login</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '10px' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '10px' }}
                    />
                    {errorMsg && <p style={{ color: '#ff4444', textAlign: 'center', margin: '0' }}>{errorMsg}</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'before' | 'after') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (type === 'main') setMainImage(file);
            else if (type === 'before') setBeforeImage(file);
            else if (type === 'after') setAfterImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mainImage) return alert('Please upload a main image');

        setIsLoading(true);
        try {
            // 1. Upload Main Image
            const mainRef = ref(storage, `cases/${Date.now()}_main_${mainImage.name}`);
            await uploadBytes(mainRef, mainImage);
            const mainUrl = await getDownloadURL(mainRef);

            let beforeUrl = '';
            if (beforeImage) {
                const beforeRef = ref(storage, `cases/${Date.now()}_before_${beforeImage.name}`);
                await uploadBytes(beforeRef, beforeImage);
                beforeUrl = await getDownloadURL(beforeRef);
            }

            let afterUrl = '';
            if (afterImage) {
                const afterRef = ref(storage, `cases/${Date.now()}_after_${afterImage.name}`);
                await uploadBytes(afterRef, afterImage);
                afterUrl = await getDownloadURL(afterRef);
            }

            // 2. Save Data to Firestore
            await addDoc(collection(db, 'cases'), {
                title,
                location,
                summary,
                images: {
                    main: mainUrl,
                    before: beforeUrl || null,
                    after: afterUrl ? [afterUrl] : []
                },
                createdAt: new Date()
            });

            alert('Case Study Added Successfully!');
            // Reset form
            setTitle('');
            setLocation('');
            setSummary('');
            setMainImage(null);
            setBeforeImage(null);
            setAfterImage(null);
        } catch (error: any) {
            console.error('Error adding document: ', error);
            let msg = "Upload failed";
            if (error.code === 'storage/unauthorized') msg = "권한이 없습니다 (Storage Unauthorized).";
            else if (error.code === 'storage/retry-limit-exceeded') msg = "시간 초과되었습니다.";
            else if (error.code === 'storage/unknown') msg = "알 수 없는 저장소 오류입니다.";
            else if (error.message) msg = error.message;

            alert('오류가 발생했습니다: ' + msg);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="container section-padding" style={{ maxWidth: '400px', marginTop: '100px' }}>
                <h1 className="text-center">Admin Login</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '10px' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '10px' }}
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }

    // Debugging Tool moved to top

    const testConnection = async () => {
        setDebugInfo('Testing connection...');
        try {
            // Try to create a reference - this doesn't need network yet
            const testRef = ref(storage, 'test_connection.txt');
            setDebugInfo(`Ref created: ${testRef.fullPath}. Uploading tiny file...`);

            // Try to upload a tiny string with a 5s timeout
            const uploadPromise = uploadBytes(testRef, new TextEncoder().encode("test"));
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout (5s)")), 5000)
            );

            await Promise.race([uploadPromise, timeoutPromise]);

            setDebugInfo('Connection Success! Write allowed.');
            // Cleanup
            // await deleteObject(testRef); 
        } catch (error: any) {
            console.error('Test failed:', error);
            setDebugInfo(`Test Failed: ${error.message || error.code}`);
        }
    };

    // ... (rest of the component)

    return (
        <div className="container section-padding" style={{ marginTop: '80px', color: '#fff' }}>
            <h1>Add New Case Study</h1>

            {/* Debug Panel */}
            <div style={{ background: '#333', padding: '15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #555' }}>
                <h3>Debug Info</h3>
                <p><strong>Storage Bucket:</strong> {bucketName}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button type="button" onClick={testConnection} className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>
                        Test Storage Connection
                    </button>
                    <span style={{ color: debugInfo.includes('Success') ? '#4caf50' : '#ff5252' }}>{debugInfo}</span>
                </div>
                {bucketName === 'UNDEFINED' && (
                    <p style={{ color: '#ff5252', marginTop: '10px' }}>
                        WARNING: Bucket is undefined. Please check .env file and ensure VITE_FIREBASE_STORAGE_BUCKET is set.
                    </p>
                )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                        required
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                        required
                    />
                </div>
                <div>
                    <label>Summary</label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px', height: '100px' }}
                        required
                    />
                </div>
                <div>
                    <label>Main Image (Required)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'main')}
                        accept="image/*"
                        style={{ display: 'block', marginTop: '5px' }}
                        required
                    />
                </div>
                <div>
                    <label>Before Image (Optional)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'before')}
                        accept="image/*"
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                </div>
                <div>
                    <label>After Image (Optional)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'after')}
                        accept="image/*"
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Add Case Study'}
                </button>
            </form>
        </div>
    );
};

export default AdminCase;
