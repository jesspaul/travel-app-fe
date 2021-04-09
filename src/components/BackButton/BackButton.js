import { Link } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
    return (
        <Link className='back-button body-link'>
            <p>Back</p>
        </Link>
    );
}
 
export default BackButton;