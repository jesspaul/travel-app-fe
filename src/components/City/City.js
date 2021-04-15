import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import CityDetails from '../CityDetails/CityDetails';
import CityForm from '../CityForm/CityForm';
import './City.css';

const City = (props) => {
    const { cityState, toggleCityEditMode, selectCity, handleCityDelete } = useContext(CityContext);

    return (
        <div className="City">
            <h3 onClick={() => selectCity(props.city)}>{props.city.name} { cityState.open === props.city.name ? <i class="fa fa-caret-up"></i> : <i class="fa fa-caret-down"></i> }</h3>

            { cityState.currentCity.name === props.city.name ? <CityDetails /> : <div></div> }
            
            
            { cityState.editCityMode ? <CityForm /> : <button onClick={toggleCityEditMode}>Edit City</button>}
            <button onClick={handleCityDelete}>Delete</button>
        </div>
    );
}
 
export default City;