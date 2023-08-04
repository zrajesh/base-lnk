import Image from 'next/image';
import React from 'react';

interface AdminLinkBoxProps {
    image_path: string; 
    totalNumber: number | string; 
    title: string;
    boxTheme: string;
}

const AdminLinkBox = ({image_path, totalNumber, title, boxTheme}: AdminLinkBoxProps) => {
    return (
        <div className="flex items-center p-8 bg-white shadow border rounded-lg">
        <div className={`bg-${boxTheme}-500` + " " + "inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full mr-6"}>
            <Image
             src={image_path} 
             width={40} 
             height={40} 
             alt="link icon" 
             className="w-6"
            />
        </div>
        <div className="">
            <span className="inline-block text-2xl font-bold">{totalNumber}</span>
            <span className="block text-gray-500">{title}</span>
        </div>
    </div>
    );
};

export default AdminLinkBox;