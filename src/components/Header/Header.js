import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { auth } from '../../services/firebase';
import { UserContext } from '../../contexts/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <header>
            <Link to='/'><h1>Travel App</h1></Link>
            <ul>
                {
                    user !== null ? 
                    <>
                        <li>Welcome, {user.displayName}</li>
                        <Link to='/history'><li>History</li></Link>
                        <Link to='/future'><li>Future</li></Link>
                        <li onClick={logout}>Logout</li>
                    </>
                    :
                    <li onClick={login}>Login</li>
                }
            </ul>
        </header>
    );
}
 
export default Header;