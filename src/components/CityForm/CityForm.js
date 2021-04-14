import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import './CityForm.css';

const CityForm = () => {
    const { state, handleCityChange, handleCitySubmit } = useContext(CountryContext);
    return (
        <div className="CityForm">
            
            <h3>{state.editCityMode ? 'Edit City' : 'Add New City'}</h3>
            <form onSubmit={handleCitySubmit}>
                <label>
                    City Name:
                    <input name="name" value={state.currentCountry.newCity.name} onChange={handleCityChange} required />
                </label>
                {
                    state.branch === 'history' &&
                <label>
                    Date Visited:
                    <input type='date' name="date" value={state.currentCountry.newCity.date} onChange={handleCityChange} required />
                </label>
                }
                <button>{state.editCityMode ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
}
 
export default CityForm;