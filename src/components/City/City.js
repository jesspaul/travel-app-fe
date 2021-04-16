import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import CityDetails from '../CityDetails/CityDetails';
import './City.css';

const City = (props) => {
    const { cityState, selectCity } = useContext(CityContext);

    return (
        <div className="City">
            <h3 onClick={() => selectCity(props.city)}>{props.city.name} { cityState.open === props.city.name ? <i class="fa fa-caret-up"></i> : <i class="fa fa-caret-down"></i> }</h3>

            { cityState.currentCity.name === props.city.name ? <CityDetails /> : <div></div> }            
        </div>
    );
}
 
export default City;