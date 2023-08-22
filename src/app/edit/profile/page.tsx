"use client"

import PageLoader from '@/components/pageLoader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
  
const EditProfile = () => {
    const [userProfile, setUserProfile] = useState({
        username: "",
        bio: "",
        avatar: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({
            ...userProfile, [name]: event.target.value
        })
    }

    const isFieldsValidated = (): boolean => {
        // Email validation regex pattern
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;      
        if (userProfile.username === "" || userProfile.avatar === "" || userProfile.bio === "") {
          toast.error("Please fill all the fields.");
          return false;
        }
        return true;
    };

    const saveUser = async () => {
        if (isFieldsValidated()) {
            try {
                setLoading(true);
                const response = await axios.post("/api/users/saveuserprofile", userProfile);
                console.log(response);
                toast.success(response.data.message);
                localStorage.setItem("username", response.data.username);
            } catch (error: any) {
                console.log("User profile update Err: ", error);
                toast.error("User profile update Error. Try again later!");
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        setLoading(true);       
        const userName = localStorage.getItem("username");
        const fetchUserDetails = async () => {
            try {
                setLoading(true);           
                const response = await axios.post("/api/users/userdetails", {username: userName});
                console.log(response.data);   
                setUserProfile((prevProfile) => ({
                    ...prevProfile,
                    username: response.data.username,
                    bio: response.data.bio,
                    avatar: response.data.avatar,
                    email: response.data.email,
                }));                                               
            } catch (error) {
                console.log("ERR: ", error);            
            } finally {
                setLoading(false);
            }
        }
        fetchUserDetails();
    }, []);
    return (
        <>
            {
                loading &&
                <PageLoader />
            }
            <Toaster
             position="top-right" 
             reverseOrder={false}
             toastOptions={{
                duration: 3000,
             }}
            />
            <div>
                <h1 className="text-center text-4xl mt-14">My account</h1>
                <div className="flex flex-col justify-center items-center gap-7 mt-10 mb-5">
                    <div className="w-10/12 md:w-4/12">
                        <p>My information</p>
                        <div className="bg-white p-4 mt-3 rounded-md">
                            <div className="">
                                <label htmlFor="username">Username</label>
                                <input
                                 type="text" 
                                 id="username" 
                                 value={userProfile.username}
                                 onChange={handleChange("username")}
                                 className="block w-full outline-none border-b focus:border-b border-solid border-black focus:border-blue-400" 
                                />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="bio">Bio</label>
                                <input
                                 type="text" 
                                 id="bio" 
                                 value={userProfile.bio}
                                 onChange={handleChange("bio")}
                                 className="block w-full outline-none border-b focus:border-b border-solid border-black focus:border-blue-400" 
                                />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="avatar">Avatar</label>
                                <input
                                 type="text" 
                                 id="avatar" 
                                 value={userProfile.avatar}
                                 onChange={handleChange("avatar")}
                                 className="block w-full outline-none border-b focus:border-b border-solid border-black focus:border-blue-400" 
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                             onClick={saveUser}
                             className="p-2 border-2 border-black rounded-md focus:outline-none text-white bg-[#000] hover:bg-[#000000d8] hover:border-[#000000d8] w-32"
                            >
                            Save details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;