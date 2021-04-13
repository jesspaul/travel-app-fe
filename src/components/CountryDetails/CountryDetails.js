import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../contexts/CountryContext';
import placeholderImg from '../../img/maps.jpg';
import BackButton from '../BackButton/BackButton';
import CityList from '../CityList/CityList';
import './CountryDetails.css';

const CountryDetails = () => {
    const { state, handleDelete } = useContext(CountryContext);
    
    return (
        <div className="CountryDetails">
            <h2>{state.currentCountry.name}</h2>
            {state.currentCountry.date && <h3 className='date-visited'>{state.currentCountry.date}</h3>}
            <img className='country-image' src={state.currentCountry.imagePath ? state.currentCountry.imagePath : placeholderImg} alt={state.currentCountry.name}/>
            <CityList />
            <Link to={`/${state.branch}`}>
                <button onClick={() => handleDelete(state.currentCountry._id)}>Delete Country</button>
            </Link>
            <BackButton />
        </div>
    );
}
 
export default CountryDetails;