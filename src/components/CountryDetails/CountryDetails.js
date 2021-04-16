import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from '../../contexts/CountryContext';
import placeholderImg from '../../img/maps.jpg';
import CityList from '../CityList/CityList';
import CountryForm from '../CountryForm/CountryForm';
import './CountryDetails.css';

const CountryDetails = () => {
    const { state, handleDelete, toggleEditMode } = useContext(CountryContext);
    
    return (
        <div className="CountryDetails">
            <h2>{state.currentCountry.name}</h2>
            {state.currentCountry.date && <h3 className='date-visited'>{state.currentCountry.date}</h3>}
            <img className='country-image' src={state.currentCountry.imagePath ? state.currentCountry.imagePath : placeholderImg} alt={state.currentCountry.name}/>
            <CityList />
            { state.editMode ? <CountryForm /> : <button className='med-button' onClick={toggleEditMode}><i class="fas fa-pencil-alt"></i> Country</button>}
            <Link to={`/${state.branch}`}>
                <button className='med-button' onClick={() => handleDelete(state.currentCountry._id)}><i class="fas fa-trash-alt"></i> Country</button>
            </Link>
        </div>
    );
}
 
export default CountryDetails;