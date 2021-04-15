import CityDetails from '../CityDetails/CityDetails';
import CityForm from '../CityForm/CityForm';
import './City.css';

const City = (props) => {
    return (
        <div className="City">
            <h3 onClick={() => props.selectCity(props.city)}>{props.city.name} { props.cityState.open === props.city.name ? <i class="fa fa-caret-up"></i> : <i class="fa fa-caret-down"></i> }</h3>

            { props.cityState.currentCity.name === props.city.name ?
            <CityDetails
                cityState={props.cityState}
                toggleDetailStatus={props.toggleDetailStatus}
                toggleDetailEditMode={props.toggleDetailEditMode}
                handleDetailDelete={props.handleDetailDelete}
                handleDetailChange={props.handleDetailChange}
                handleDetailSubmit={props.handleDetailSubmit}
            />
            : <div></div> }
            
            
            { props.cityState.editCityMode ?
            <CityForm
                cityState={props.cityState}
                handleCitySubmit={props.handleCitySubmit}
                state={props.state}
                handleCityChange={props.handleCityChange}
            />
            : <button onClick={props.toggleCityEditMode}>Edit City</button>}
            <button onClick={props.handleCityDelete}>Delete</button>
        </div>
    );
}
 
export default City;