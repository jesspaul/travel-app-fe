import { Link } from 'react-router-dom';
import placeholderImg from '../../img/maps.jpg';
import CityList from '../CityList/CityList';
import CountryForm from '../CountryForm/CountryForm';
import './CountryDetails.css';

const CountryDetails = (props) => {
    return (
        <div className="CountryDetails">
            <h2>{props.state.currentCountry.name}</h2>
            {props.state.currentCountry.date && <h3 className='date-visited'>{props.state.currentCountry.date}</h3>}
            <img className='country-image' src={props.state.currentCountry.imagePath ? props.state.currentCountry.imagePath : placeholderImg} alt={props.state.currentCountry.name}/>
            <CityList
                state={props.state}
                toggleStatus={props.toggleStatus}
                cityState={props.cityState}
                toggleCityEditMode={props.toggleCityEditMode}
                handleCityDelete={props.handleCityDelete}
                selectCity={props.selectCity}
                handleCitySubmit={props.handleCitySubmit}
                handleCityChange={props.handleCityChange}
                toggleDetailStatus={props.toggleDetailStatus}
                toggleDetailEditMode={props.toggleDetailEditMode}
                handleDetailDelete={props.handleDetailDelete}
                handleDetailChange={props.handleDetailChange}
                handleDetailSubmit={props.handleDetailSubmit}
            />
            <Link to={`/${props.state.branch}`}>
                <button onClick={() => props.handleDelete(props.state.currentCountry._id)}>Delete Country</button>
            </Link>
            { props.state.editMode ? <CountryForm /> : <button onClick={props.toggleEditMode}>Edit Country</button>}
        </div>
    );
}
 
export default CountryDetails;