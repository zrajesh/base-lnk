"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const ProfilePage = ({ params }: any) => {
    const router = useRouter();
    const [loggedUser, setLoggedUser] = React.useState();

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log(response);
            toast.success(response.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log("Logout Err: ", error);  
            toast.error(error.response.data.error)
        }
    }

    const getUserDetails =async () => {
        const response = await axios.get("/api/users/loggedUser");
        console.log(response);
        console.log("data: ", response.data.data);
        setLoggedUser(response.data);
    }

    useEffect(() => {
        getUserDetails();
    }, [])
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Toaster
             position="top-right" 
             reverseOrder={false}
             toastOptions={{
                duration: 10000,
             }} 
            />
            <h1 className="text-4xl">Profile page { params.username }</h1>
            <button
             onClick={logout}
             className="bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded">
            Logout
            </button>
            <button
             onClick={getUserDetails}
             className="bg-green-500 hover:bg-green-700 mt-5 text-white font-bold py-2 px-4 rounded">
            Get User
            </button>
        </div>
    );
};

export default ProfilePage; 