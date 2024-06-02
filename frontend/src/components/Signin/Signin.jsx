import React, { useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';
import { useContext } from "react";
import { Link } from "react-router-dom";

import { Navigate, useNavigate } from "react-router-dom";
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn, loginUser, logoutUser } = useContext(GlobalContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/signin', {
                email,
                password,
            },
                {
                    withCredentials: true,
                });
            loginUser();
            navigate('/post')
            console.log('Login response:', response.data);
        } catch (error) {
            logoutUser();
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-8 mb-4 w-full max-w-md"
                >
                    <Link to="/register">
                        <div className="flex justify-between text-center">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Log In</h2>
                            <p className="h-full p-1 rounded-md underline text-gray-700">
                                Register
                            </p>
                        </div>
                    </Link>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-5 items-center justify-between">
                        <button
                            className="bg-green-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Log In
                        </button>
                        <div className="flex flex-col">
                            <a
                                className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 mb-2"
                                href="#"
                            >
                                Forgot Password?
                            </a>

                            <a
                                className="inline-block align-baseline text-sm text-gray-700 hover:text-blue-800"
                                href="#"
                            >
                                Don't have an account? Sign up now!
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
