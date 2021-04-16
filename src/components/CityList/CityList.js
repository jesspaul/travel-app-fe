import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import City from "../City/City";
import CityForm from '../CityForm/CityForm';
import './CityList.css';

const CityList = () => {
    const { state, toggleStatus } = useContext(CountryContext);
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
                    <button className='big-button' onClick={toggleStatus}><i class="fas fa-plus"></i> New City</button>
                    :
                    <CityForm />
                }
        </div>
    );
}
 
export default CityList;