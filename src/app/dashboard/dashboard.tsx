"use client"
import React, { useEffect, useState } from 'react';
import AdminLinkBox from '../components/adminLinkBox';
import axios from 'axios';
import PageLoader from '../components/pageLoader';

const Dashboard = ({ userTokenValue }:{ userTokenValue: string }) => {
    const [loading, setLoading] = useState(false);
    const [dashboardDetails, setDashboardDetails] = useState({
        username: "",
        role: 1,
        email: "",
        links: [],
        totalLinks: 0
    });
    
    useEffect(() => {
        const fetchDashboardDetail = async () => {
            try {
                setLoading(true);           
                const response = await axios.post("/api/dashboard", {userToken: userTokenValue});
                console.log(response.data);                
                setDashboardDetails(response.data);           
            } catch (error) {
                console.log("ERR: ", error);            
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardDetail();
    }, [userTokenValue]);
    return (
        <div>
            {
                loading &&
                <PageLoader />
            }
            <span className=""></span>
            <main>
                <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <AdminLinkBox
                     image_path="/links.png" 
                     totalNumber={dashboardDetails.totalLinks} 
                     title="Links" 
                     boxTheme="red"
                    />
                    <AdminLinkBox
                     image_path="/growth.png" 
                     totalNumber={9}
                     title="Growth"
                     boxTheme="blue"
                    />
                    <AdminLinkBox
                     image_path="/down_growth.png" 
                     totalNumber="60%"
                     title="Growth Down"
                     boxTheme="blue"
                    />
                    <AdminLinkBox
                     image_path="/up_trend.png" 
                     totalNumber="70%"
                     title="Booming Links"
                     boxTheme="blue"
                    />
                </section>
                <section></section>
            </main>  
        </div>
    );
};

export default Dashboard;