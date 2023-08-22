import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import LinkTreeCard from './linkTreeCard';
import Image from 'next/image';

interface UserDataProps {
    username: string; 
    avatar: string; 
    bio: string; 
    links: LinkDataProps[];
}
interface LinkDataProps {
    url: string;
    icon: string;
    title: string;
}

const UserLinkTree = ({ userData }: { userData: UserDataProps }) => {
    const {username, avatar, bio, links} = userData;
    
    return (
        <>
            <section className="relative">
                {
                    avatar ? <Image className="w-20 rounded-full absolute left-1/2 -translate-x-1/2 mt-2" src={avatar} alt="user image" width={80} height={80} /> : null
                }
                <h2 className="text-center text-lg font-bold pt-24">
                {username.charAt(0).toUpperCase() + username.slice(1)}
                </h2>
                <p className="text-center text-lg">{bio}</p>
                <div className="flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full md:w-2/5">
                    <AnimatePresence>
                        {
                            links.map((link: LinkDataProps, index: number) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0, transition: {delay: index * 0.1 + 0.5} }}
                                >
                                    <LinkTreeCard userLink={link.url} imageLink={link.icon} title={link.title} />
                                </motion.div>                    
                            ))
                        }
                    </AnimatePresence>
                </div>
            </section>   
        </>
    );
};

export default UserLinkTree;