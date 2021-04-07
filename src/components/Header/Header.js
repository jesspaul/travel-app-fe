import './Header.css';
import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <h1>Travel App</h1>
            <ul>
                {
                    props.user ? 
                    <>
                        <li>History</li>
                        <li>Future</li>
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