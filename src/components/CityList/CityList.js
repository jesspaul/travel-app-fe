import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import AddNewButton from '../AddNewButton/AddNewButton';
import City from "../City/City";
import CityDetails from '../CityDetails/CityDetails';
import CityForm from '../CityForm/CityForm';
import './CityList.css';

const CityList = () => {
    const { state } = useContext(CountryContext);
    return (
        <ul className="CityList">
            {state.currentCountry.cities.length ?
                state.currentCountry.cities.map(city => 
                <li>
                    <City />
                    <CityDetails />
                </li>)
                : <li>No cities in list</li>
            }
            {
                state.status === 'button' ?
                <AddNewButton />
                :
                <CityForm />
            }
        </ul>
    );
}
 
export default CityList;