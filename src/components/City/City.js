import CityDetails from '../CityDetails/CityDetails';
import './City.css';

const City = (props) => {
    return (
        <div className="City">
            <h3>{props.city.name}</h3>
            <CityDetails city={props.city} />
        </div>
    );
}
 
export default City;