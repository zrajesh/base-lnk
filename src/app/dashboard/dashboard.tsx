"use client"
import React, { useContext, useEffect, useState } from 'react';
import AdminLinkBox from '../../components/adminLinkBox';
import axios from 'axios';
import PageLoader from '../../components/pageLoader';
import UserContext from '@/context/userContext';
import { Toaster, toast } from 'react-hot-toast';

const Dashboard = ({ userTokenValue }:{ userTokenValue: string }) => {
    const [loading, setLoading] = useState(false);
    const [dashboardDetails, setDashboardDetails] = useState({
        username: "",
        role: 1,
        email: "",
        links: [],
        totalLinks: 0
    });
    const [userlink, setUserLink] = useState({
        url: "",
        title: "",
        icon: ""
    });
    const { setUserData } = useContext(UserContext);
    
    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLink({
            ...userlink, [name]: event.target.value
        })
    }

    const isFieldsValidated = (): boolean => {     
        if (userlink.url === "" || userlink.title === "") {
          toast.error("Please fill all the fields.");
          return false;
        }
        return true;
    };

    const createUserLink = async () => {
        if (isFieldsValidated()) {
            const linksData = {
                url: userlink.url,
                title: userlink.title
            }
            const linksAndEmailData = {
                email: dashboardDetails.email,
                links: linksData
            }
            try {
                setLoading(true);
                const response = await axios.post("/api/users/savelinks", linksAndEmailData);
                console.log(response);
                toast.success(response.data.message);
            } catch (error: any) {
                console.log("Error saving link: ", error);
                toast.error("Error saving link. Try again later!");
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        const fetchDashboardDetail = async () => {
            try {
                setLoading(true);           
                const response = await axios.post("/api/dashboard", {userToken: userTokenValue});
                console.log(response.data);                                
                setDashboardDetails(response.data);                
                const userSocialHandle = response.data.socialMedia;
                if (userSocialHandle) {
                    localStorage.setItem("socialMedia", response.data.socialMedia)
                }                          
            } catch (error) {
                console.log("ERR: ", error);            
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardDetail();
    }, [userTokenValue]);

    useEffect(() => {
        if (dashboardDetails) {
            setUserData(dashboardDetails);
        }
    })
    return (
        <div>
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
            <span className=""></span>
            <main>
                <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-5 ml-4 mr-4">
                    <AdminLinkBox
                     image_path="/links.png" 
                     totalNumber={dashboardDetails.totalLinks} 
                     title="Links" 
                     boxTheme="blue"
                    />
                    <AdminLinkBox
                     image_path="/growth.png" 
                     totalNumber={9}
                     title="Growth"
                     boxTheme="green"
                    />
                    <AdminLinkBox
                     image_path="/down_growth.png" 
                     totalNumber="60%"
                     title="Growth Down"
                     boxTheme="red"
                    />
                    <AdminLinkBox
                     image_path="/up_trend.png" 
                     totalNumber="70%"
                     title="Booming Links"
                     boxTheme="yellow"
                    />
                </section>
                <section>
                <div>
                <h1 className="text-center text-4xl mt-14">Add Links</h1>
                <div className="flex flex-col justify-center items-center gap-7 mt-10 mb-5">
                    <div className="w-10/12 md:w-4/12">
                        <p>Links information</p>
                        <div className="bg-white p-4 mt-3 rounded-md">
                            <div className="">
                                <label htmlFor="title">Link Title</label>
                                <input
                                 type="text" 
                                 id="title" 
                                 value={userlink.title}
                                 onChange={handleChange("title")}
                                 className="block w-full outline-none border-b focus:border-b border-solid border-black focus:border-blue-400" 
                                />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="url">Link</label>
                                <input
                                 type="text" 
                                 id="url" 
                                 value={userlink.url}
                                 onChange={handleChange("url")}
                                 className="block w-full outline-none border-b focus:border-b border-solid border-black focus:border-blue-400" 
                                />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="icon">Icon Link</label>
                                <input
                                 type="text" 
                                 id="icon" 
                                 value={userlink.icon}
                                 onChange={handleChange("icon")}
                                 className="block w-full outline-none border-b focus:border-b border-solid border-black focus:border-blue-400" 
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                             onClick={createUserLink}
                             className="p-2 border-2 border-black rounded-md focus:outline-none text-white bg-[#000] hover:bg-[#000000d8] hover:border-[#000000d8] w-32"
                            >
                            Create Link
                            </button>
                        </div>
                    </div>
                </div>
                </div>
                </section>
            </main>  
        </div>
    );
};

export default Dashboard;