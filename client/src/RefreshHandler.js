import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (
                (location.pathname === '/login' || location.pathname === '/register')
                && location.pathname !== '/'
            ) {
                navigate('/', {replace: false});
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return null


}

export default RefreshHandler