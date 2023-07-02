"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


const LoginPage = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onLogin = async () => {}

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user, [name]: event.target.value
        })
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login page</h1>
            <hr />
            <div className="mb-4 flex flex-col">
                <label
                 htmlFor="user_email">Email</label>
                <input
                 value={user.email} 
                 onChange={handleChange("email")} 
                 type="text" id="user_email"
                 placeholder="Enter email"
                 className="bg-gray-50 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] outline-none block w-96 p-3 border"
                />
            </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor="user_password">Password</label>
                <input
                 value={user.password} 
                 onChange={handleChange("password")} 
                 type="password" id="user_password"
                 placeholder="Enter password"
                 className="bg-gray-50 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] outline-none block w-96 p-3 border"
                />
            </div>
            <div>
                <button
                 className="p-2 border-2 border-black rounded-md focus:outline-none text-white bg-[#000] hover:bg-[#000000d8] hover:border-[#000000d8] w-28"
                 onClick={onLogin}
                >
                Login
                </button>
            </div>
            <div className="mt-4">
                <p>
                    Haven&apos;t created account?  <Link className="text-[#0066cc] underline" href="/signup">Signup here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
