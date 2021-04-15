import City from "../City/City";
import CityForm from '../CityForm/CityForm';
import './CityList.css';

const CityList = (props) => {
    return (
        <div className="CityList">
            <ul>
                {props.state.currentCountry.cities.length ?
                    props.state.currentCountry.cities.map((city, idx) => 
                    <li>
                        <City
                            key={idx}
                            city={city}
                            cityState={props.cityState}
                            toggleCityEditMode={props.toggleCityEditMode}
                            handleCityDelete={props.handleCityDelete}
                            selectCity={props.selectCity}
                            handleCitySubmit={props.handleCitySubmit}
                            state={props.state}
                            handleCityChange={props.handleCityChange}
                            toggleDetailStatus={props.toggleDetailStatus}
                            toggleDetailEditMode={props.toggleDetailEditMode}
                            handleDetailDelete={props.handleDetailDelete}
                            handleDetailChange={props.handleDetailChange}
                            handleDetailSubmit={props.handleDetailSubmit}
                        />
                    </li>)
                    : <li key={'none'}>No cities in list</li>
                }
            </ul>
                {
                    props.state.status === 'button' ?
                    <button className='add-new' onClick={props.toggleStatus}>+ Add New</button>
                    :
                    <CityForm />
                }
        </div>
    );
}
 
export default CityList;