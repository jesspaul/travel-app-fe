import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import './AddNewButton.css';

const AddNewButton = () => {
    const { toggleStatus } = useContext(CountryContext);
    return (
        <button className='add-new' onClick={toggleStatus}>+ Add New</button>
    );
}
 
export default AddNewButton;