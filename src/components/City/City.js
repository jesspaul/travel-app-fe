import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import CityDetails from '../CityDetails/CityDetails';
import CityForm from '../CityForm/CityForm';
import './City.css';

const City = (props) => {
    const { cityState, toggleCityEditMode, selectCity } = useContext(CityContext);

    return (
        <div className="City">
            <h3 onClick={() => selectCity(props.city)}>{props.city.name}</h3>
            <CityDetails city={props.city} />
            { cityState.editCityMode ? <CityForm /> : <button onClick={toggleCityEditMode}>Edit City</button>}
            <button>Delete</button>
        </div>
    );
}
 
export default City;