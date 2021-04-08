import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';

const CountryDetails = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CountryDetails">
            Details for {state.currentCountry.name}
        </div>
    );
}
 
export default CountryDetails;