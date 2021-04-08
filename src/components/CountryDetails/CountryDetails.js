import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import placeholderImg from '../../img/maps.jpg';
import './CountryDetails.css';

const CountryDetails = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CountryDetails">
            <h2>{state.currentCountry.name}</h2>
            {state.currentCountry.date && <h3>{state.currentCountry.date}</h3>}
            <img className='country-image' src={placeholderImg} alt={`image of ${state.currentCountry.name}`}/>
        </div>
    );
}
 
export default CountryDetails;