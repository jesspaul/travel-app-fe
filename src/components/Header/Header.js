import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <Link className='nav-link' to='/'><h1>Travel App</h1></Link>
            <ul>
                {
                    props.user ? 
                    <>
                        <li>Welcome, {props.user.displayName}</li>
                        <Link className={ props.state.branch === 'history' ? 'current-branch nav-link': 'nav-link'} onClick={() => props.toggleBranch('history')} to='/history'><li>History</li></Link>
                        <Link className={ props.state.branch === 'future' ? 'current-branch nav-link': 'nav-link'} onClick={() => props.toggleBranch('future')} to='/future'><li>Future</li></Link>
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