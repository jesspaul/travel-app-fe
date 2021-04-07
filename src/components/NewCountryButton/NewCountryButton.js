import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';

const NewCountryButton = () => {
    const { toggleStatus } = useContext(CountryContext);
    return (
        <button onClick={toggleStatus}>+ Add New Country</button>
    );
}
 
export default NewCountryButton;