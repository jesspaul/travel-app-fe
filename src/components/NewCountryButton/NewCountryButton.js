import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import './NewCountryButton.css';

const NewCountryButton = () => {
    const { toggleStatus } = useContext(CountryContext);
    return (
        <button onClick={toggleStatus}>+ Add New Country</button>
    );
}
 
export default NewCountryButton;