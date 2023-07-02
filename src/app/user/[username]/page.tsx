import React from 'react';

const ProfilePage = ({ params }: any) => {
    return (
        <div>
            <h1 className="text-4xl">Profile page { params.username }</h1>
        </div>
    );
};

export default ProfilePage; 