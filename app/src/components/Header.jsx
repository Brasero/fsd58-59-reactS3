import { NavLink } from 'react-router-dom';
import { useCheckIsConnectedQuery } from '../features/api/apiSlice';

export default function Header() {
    const authQuery = useCheckIsConnectedQuery();
    const isAuthenticated = authQuery.isSuccess && authQuery?.data?.id ? true : false;
    
    return (
        <header>
            <div className="site-title">
                La pâtisserie 3WA
            </div>
            <nav>
                <NavLink to="/">Home</NavLink>
                { !isAuthenticated && <NavLink to="/login">Login</NavLink> }
                { isAuthenticated && <NavLink to="/admin">Admin</NavLink> }
                { isAuthenticated && <NavLink to="/logout">Logout</NavLink> }
            </nav>
        </header>
    )
}
