'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        gender: '',
        contact: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
            alert('Registration successful. Please login.');
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Register</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-2 border rounded text-black"
                    required
                />
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="p-2 border rounded text-black w-1/2"
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="p-2 border rounded text-black w-1/2"
                        required
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border rounded text-black"
                    required
                />
                <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    className="p-2 border rounded text-black"
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="p-2 border rounded text-black"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="tel"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="p-2 border rounded text-black"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 border rounded text-black"
                    required
                />
                <button type="submit" className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Register
                </button>
            </form>
            <p className="mt-4">
                Already have an account? <a href="/login" className="text-blue-700 underline">Login</a>
            </p>
        </div>
    );
}
