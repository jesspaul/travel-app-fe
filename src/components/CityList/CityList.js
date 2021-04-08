import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import AddNewButton from '../AddNewButton/AddNewButton';
import City from "../City/City";
import './CityList.css';

const CityList = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CityList">
            City List
            {state.currentCountry.cities.length ?
                state.currentCountry.cities.map(city => <City />)
                : <div>No cities in list</div>
            }
            <AddNewButton />
        </div>
    );
}
 
export default CityList;