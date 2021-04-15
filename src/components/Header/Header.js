import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { CountryContext } from '../../contexts/CountryContext';

const Header = () => {
    const { user } = useContext(UserContext);
    const { state, toggleBranch } = useContext(CountryContext);
    return (
        <header>
            <Link className='nav-link' to='/'><h1>Travel App</h1></Link>
            <ul>
                {
                    user ? 
                    <>
                        <li>Welcome, {user.displayName}</li>
                        <Link className={ state.branch === 'history' ? 'current-branch nav-link': 'nav-link'} onClick={() => toggleBranch('history')} to='/history'><li>History</li></Link>
                        <Link className={ state.branch === 'future' ? 'current-branch nav-link': 'nav-link'} onClick={() => toggleBranch('future')} to='/future'><li>Future</li></Link>
                        <Link to='/' className='nav-link'><li onClick={logout}>Logout</li></Link>
                    </>
                    :
                    <li className='nav-link' onClick={login}>Login</li>
                }
            </ul>
        </header>
    );
}
 
export default Header;