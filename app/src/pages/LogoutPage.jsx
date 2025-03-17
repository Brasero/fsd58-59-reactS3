import { Navigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/api/apiSlice';
import Loader from '../components/Loader';
import { useEffect } from 'react';

export default function LogoutPage () {
    const [logout, logoutRequest] = useLogoutMutation();

    useEffect(() => {
        logout();
    }, []);

    if (logoutRequest.isSuccess) {
        return <Navigate to="/" />
    }

    return (
        <main>
            <h1>Déconnexion en cours...</h1>
            { logoutRequest.isError && <p>Déconnexion impossible.</p> }
            <Loader />
        </main>
    )
}