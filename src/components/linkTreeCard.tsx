import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LinkTreeCardProps {
    userLink: string;
    imageLink: string;
    title: string;
}
const LinkTreeCard = ({userLink, title, imageLink}: LinkTreeCardProps) => {
  console.log(userLink);
  
    return (
        <>
          <div className="w-full">
            <Link className="flex flex-row items-center p-2 rounded-xl text-white bg-indigo-400 hover:bg-indigo-300 mb-3 mx-2 hover: translate-x-1 hover:translate-y-1 transition-all duration-500" href={userLink}>
                <Image className="bg-white rounded-md p-1 w-11 mr-5" src={imageLink} alt="user link image" />
                <h4 className="md:text-lg">{title}</h4>
            </Link>
          </div>  
        </>
    );
};

export default LinkTreeCard;