import React from 'react';
import { Oval } from 'react-loader-spinner';

const PageLoader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
        <div className="flex justify-center items-center min-h-screen">
            <Oval
                height={100}
                width={100}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
        </div>
    );
};

export default PageLoader;