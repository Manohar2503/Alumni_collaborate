import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pic3 from '../assets/pic3.jpeg';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/users/login",{email,password},{
            withCredentials :true,
        })
        .then(result=>{
            console.log("result",result);
            // const token = result.data.token;
            // localStorage.setItem('authToken', token);
            navigate("/");
        })
    };
    
    return (
        <div className="h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${pic3})` }}>
            <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={changeHandler}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Sign In
                    </button>
                </form>
                <div className="mt-4 text-center space-y-2">
                    <h4 className="text-sm text-gray-400">Forgot Password?</h4>
                    <Link to="/signup" className="text-sm text-blue-400 hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;