import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <header>
            <Link className='link-item' to='/'><h1>Travel App</h1></Link>
            <ul>
                {
                    user ? 
                    <>
                        <li>Welcome, {user.displayName}</li>
                        <Link className='link-item' to='/history'><li>History</li></Link>
                        <Link className='link-item' to='/future'><li>Future</li></Link>
                        <li className='link-item' onClick={logout}>Logout</li>
                    </>
                    :
                    <li onClick={login}>Login</li>
                }
            </ul>
        </header>
    );
}
 
export default Header;