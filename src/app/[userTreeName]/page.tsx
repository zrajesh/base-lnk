"use client"

import React, { useEffect, useState } from 'react';
import UserLinkTree from '../../components/userLinkTree';
import { useParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import PageLoader from '../../components/pageLoader';
import UserSocial from '../../components/userSocial';
import ShareButton from '../../components/shareButton';


interface LinkDataProps {
    url: string;
    icon: string;
    title: string;
}
interface UserDataProps {
    username: string; 
    avatar: string; 
    bio: string; 
    links: LinkDataProps[];
}

interface SocialMediaProps {
    facebook: string;
    twitter: string; 
    instagram: string; 
    youtube: string;
    linkedIn: string;
    gitHub: string;
}

const UserTree = () => {
    const [userTreeData, setUserTreeData] = useState<UserDataProps>({
        username: '', 
        avatar: '', 
        bio: '', 
        links: []
    });
    const [socialMedia, setSocialMedia] = useState<SocialMediaProps>({
        facebook: '', 
        twitter: '', 
        instagram: '', 
        youtube: '',
        linkedIn: '',
        gitHub: ''
    });
    const [userNotFound, setUserNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userTreeName } = useParams();

    useEffect(() => {
        setLoading(true);           
        if (userTreeName) {
            fetch(`/api/${userTreeName}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setUserNotFound(true);
                }
                console.log(data);
                setUserTreeData(data);
                // setSocialMedia(data.socialMedia);                
                setLoading(false);
            })
            .catch(error => {
                setUserNotFound(true);
                console.log("userTree Fetch Error: ", error);
                toast.error("Failed to fetch user data");              
                setLoading(false);               
            })
        }
    }, [userTreeName]);

    if (loading) {
        return (
            <PageLoader />
        )
    }
    if (userNotFound) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h2>OOPS!</h2>
                <p>404 - Page not found</p>
            </div>
        )
    }
    
    return (
        <div>
            <Toaster
             position="top-right" 
             reverseOrder={false}
             toastOptions={{
                duration: 5000,
            }} 
            />
            <ShareButton />
            <UserLinkTree userData={userTreeData} />
            <UserSocial socialMedia={socialMedia} />
        </div>
    );
};

export default UserTree;
