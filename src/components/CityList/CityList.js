import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import AddNewButton from '../AddNewButton/AddNewButton';
import City from "../City/City";
import CityForm from '../CityForm/CityForm';
import './CityList.css';

const CityList = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CityList">
            <ul>
                {state.currentCountry.cities.length ?
                    state.currentCountry.cities.map((city, idx) => 
                    <li>
                        <City city={city} key={idx} />
                    </li>)
                    : <li key={'none'}>No cities in list</li>
                }
            </ul>
                {
                    state.status === 'button' ?
                    <AddNewButton />
                    :
                    <CityForm />
                }
        </div>
    );
}
 
export default CityList;