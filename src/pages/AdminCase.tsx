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
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMainImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mainImage) return alert('Please upload a main image');

        setIsLoading(true);
        try {
            // 1. Upload Image
            const storageRef = ref(storage, `cases/${Date.now()}_${mainImage.name}`);
            await uploadBytes(storageRef, mainImage);
            const mainImageUrl = await getDownloadURL(storageRef);

            // 2. Save Data to Firestore
            await addDoc(collection(db, 'cases'), {
                title,
                location,
                summary,
                images: { main: mainImageUrl },
                createdAt: new Date()
            });

            alert('Case Study Added Successfully!');
            // Reset form
            setTitle('');
            setLocation('');
            setSummary('');
            setMainImage(null);
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error adding case study');
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

    return (
        <div className="container section-padding" style={{ marginTop: '80px', color: '#fff' }}>
            <h1>Add New Case Study</h1>
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
                    <label>Main Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'block', marginTop: '5px' }}
                        required
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
