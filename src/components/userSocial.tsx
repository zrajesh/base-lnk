import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SocialMediaProps {
    facebook: string;
    twitter: string; 
    instagram: string; 
    youtube: string;
    linkedIn: string;
    gitHub: string;
}
const UserSocial = ({ socialMedia }: {socialMedia: SocialMediaProps}) => {
    const { facebook, twitter,  instagram,  youtube, linkedIn, gitHub } = socialMedia;
    return (
        <div className="social flex flex-row justify-center gap-5">
            <Link target='_blank' href={`https://facebook.com/${facebook}`}>
                <Image src="/social_media/facebook.png" alt="Facebook logo" width={35} height={35} />
            </Link>
            <Link target='_blank' href={`https://twitter.com/${twitter}`}>
                <Image src="/social_media/Twitter.png" alt="Twitter logo" width={35} height={35} />
            </Link>
            <Link target='_blank' href={`https://instagram.com/${instagram}`}>
                <Image src="/social_media/instagram.png" alt="Instagram logo" width={35} height={35} />
            </Link>
            <Link target='_blank' href={`https://youtube.com/@${youtube}`} className="-mt-1">
                <Image src="/social_media/youtube.png" alt="YouTube logo" width={40} height={40} />
            </Link>
            <Link target='_blank' href={`https://linkedin.com/${linkedIn}`}>
                <Image src="/social_media/linkedin.png" alt="LinkedIn logo" width={35} height={35} />
            </Link>
            <Link target='_blank' href={`https://github.com/${gitHub}`}>
                <Image src="/social_media/github.png" alt="GitHub logo" width={35} height={35} />
            </Link>
        </div>
    );
};

export default UserSocial;