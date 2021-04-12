// import { useContext } from 'react';
// import { CountryContext } from '../../contexts/CountryContext';
// import AddNewButton from '../AddNewButton/AddNewButton';
import City from "../City/City";
import CityDetails from '../CityDetails/CityDetails';
// import NewCity from '../NewCity/NewCity';
import './CityList.css';

const CityList = () => {
    // const { state } = useContext(CountryContext);
    return (
        <div className="CityList">
            <City />
            <CityDetails />
            <City />
            <CityDetails />
            <City />
            <CityDetails />
            <City />
            {/* {state.currentCountry.cities.length ?
                state.currentCountry.cities.map(city => <City />)
                : <div>No cities in list</div>
            }
            {
                state.status === 'button' ?
                <AddNewButton />
                :
                <NewCity />
            } */}
        </div>
    );
}
 
export default CityList;