import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import AddNewButton from '../AddNewButton/AddNewButton';
import City from "../City/City";
import NewCity from '../NewCity/NewCity';
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
            {
                state.status === 'button' ?
                <AddNewButton />
                :
                <NewCity />
            }
        </div>
    );
}
 
export default CityList;