import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../utils.js";
import axiosInstance from '../axios.js';

const Register = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = userData;

        if (!name || !email || !password) {
            return ToastError("Please fill all the fields");
        }

        try {
            const response = await axiosInstance.post('/api/auth/signup', {
                name,
                email,
                password
            });
            const { success, message, error } = response.data;
            if (success) {
                ToastSuccess(message);
                setUserData({ name: '', email: '', password: '' }); // reset after success
                navigate('/login');
            } else if (error) {
                ToastError("User already exists or Invalid credentials");
                ToastError("Signup failed");
            }
        } catch (error) {
            ToastError("check your email and password");
            ToastError("Sign Up failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen p-6">
            <div
                className='flex flex-col gap-8 rounded-lg p-5 bg-gray-600/10 hover:shadow-blue-300 shadow-md transition-all duration-500'>
                <label className='text-2xl font-bold'>Sign up</label>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="border border-gray-300 bg-white/50 rounded p-2 w-full"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="border border-gray-300 bg-white/50 rounded p-2 w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type='password'
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            className="border border-gray-300 bg-white/50 rounded p-2 w-full"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="btn bg-black/30 px-4 py-2 rounded-lg hover:shadow-green-500 shadow-md transition duration-200 hover:bg-black/80 text-white w-full">
                            Sign up
                        </button>
                    </div>
                </form>
                <div className='flex items-center justify-center'>
                    <p className=''>Don't have an account? <Link to={'/login'} className="text-blue-400">Log in!!</Link>
                    </p>
                </div>
            </div>

        </div>

    )
}
export default Register
