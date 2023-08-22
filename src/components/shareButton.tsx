import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

const ShareButton = () => {
    const params = useParams();
    const { userTreeName } = params;
    
    const copyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${userTreeName}`);
        toast.success("Profile link copied!");
    }
    return (
        <>
        <Toaster
            position="top-right" 
            reverseOrder={false}
            toastOptions={{
                duration: 5000,
            }} 
        />
        <div onClick={copyLink} className="absolute cursor-pointer top-28 left-10 bg-green-400 p-2 rounded-md z-10 shadow-md border-green-400">
            <Image className="w-4 h-4" src="/share.png" alt="Share image" width={20} height={20} />
        </div>
        </>
    );
};

export default ShareButton;