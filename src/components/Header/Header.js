import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <Link to='/'><h1>Travel App</h1></Link>
            <ul>
                {
                    props.user ? 
                    <>
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