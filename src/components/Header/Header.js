import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { CountryContext } from '../../contexts/CountryContext';

const Header = () => {
    const { user } = useContext(UserContext);
    const { toggleBranch } = useContext(CountryContext);
    return (
        <header>
            <Link to='/'><h1>Travel App</h1></Link>
            <ul>
                {
                    user ? 
                    <>
                        <li>Welcome, {user.displayName}</li>
                        <Link to='/history' onClick={() => toggleBranch('history')}><li>History</li></Link>
                        <Link to='/future' onClick={() => toggleBranch('future')}><li>Future</li></Link>
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