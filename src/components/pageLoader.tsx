import React from 'react';
import { Triangle } from 'react-loader-spinner';

const PageLoader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
        <div className="flex justify-center items-center min-h-screen">
            <Triangle
                height={150}
                width={150}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='triangle-loading'
            />
        </div>
        </div>
    );
};

export default PageLoader;