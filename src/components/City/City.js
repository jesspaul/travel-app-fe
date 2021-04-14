import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import CityDetails from '../CityDetails/CityDetails';
import CityForm from '../CityForm/CityForm';
import './City.css';

const City = (props) => {
    const { state, toggleCityEditMode, selectCity } = useContext(CountryContext);
    return (
        <div className="City">
            <h3 onClick={() => selectCity(props.city)}>{props.city.name}</h3>
            <CityDetails city={props.city} />
            { state.editCityMode ? <CityForm /> : <button onClick={toggleCityEditMode}>Edit City</button>}
            <button>Delete</button>
        </div>
    );
}
 
export default City;