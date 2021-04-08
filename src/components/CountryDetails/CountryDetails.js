import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import placeholderImg from '../../img/maps.jpg';
import CityList from '../CityList/CityList';
import './CountryDetails.css';

const CountryDetails = () => {
    const { state, setState } = useContext(CountryContext);

    

    return (
        <div className="CountryDetails">
            <h2>{state.currentCountry.name}</h2>
            {state.currentCountry.date && <h3>{state.currentCountry.date}</h3>}
            <img className='country-image' src={state.currentCountry.imagePath ? state.currentCountry.imagePath : placeholderImg} alt={state.currentCountry.name}/>

            <CityList />
        </div>
    );
}
 
export default CountryDetails;