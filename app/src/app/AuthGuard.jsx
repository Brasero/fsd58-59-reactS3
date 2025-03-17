import { Navigate } from "react-router-dom";
import { useCheckIsConnectedQuery } from "../features/api/apiSlice";
import Loader from "../components/Loader";


export default function AuthGuard ({ element, ...rest }) {
    const authQuery = useCheckIsConnectedQuery();

    if (authQuery.isLoading || authQuery.isUninitialized) {
        return <Loader />
    }

    const isAuthenticated = authQuery.isSuccess && authQuery?.data?.id ? true : false;
    return ( isAuthenticated ? element : <Navigate to="/" /> );
}