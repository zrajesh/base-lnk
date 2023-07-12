"use client"

import axios from 'axios';
import Link from 'next/link';
import Router from 'next/navigation';
import React, { useEffect, useState } from 'react';

const VerifyEmailPage = () => {
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);

    const verifyUserEmail = async (token: string) => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error);        
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail(token);
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black mt-5">
            {token ? `${token}` : "No Token"}
            </h2>
            {
                verified && (
                    <div className="mt-5">
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href="/login" className="text-blue-500 mt-3">Login</Link>
                    </div>
                )
            }
            {
                error && (
                    <div>
                        <h2 className="text-2xl text-red-400 mt-5">Verification Error</h2>
                    </div>
                )
            }
        </div>
    );
};

export default VerifyEmailPage;
