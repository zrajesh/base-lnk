import { cookies } from 'next/headers';
import Dashboard from './dashboard';

const DashboardPage = () => {
    const userToken = cookies().get("token");
    const userTokenValue = userToken?.value || "";

    return (
        <>
        <Dashboard userTokenValue={userTokenValue} />
        </>
    );
};

export default DashboardPage;