import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import { CountryContext } from '../../contexts/CountryContext';
import './CityForm.css';

const CityForm = () => {
    const { state } = useContext(CountryContext);
    const { cityState, handleCityChange, handleCitySubmit } = useContext(CityContext);

    return (
        <div className="CityForm">
            
            <h3>{cityState.editCityMode ? 'Edit City' : 'Add New City'}</h3>
            <form onSubmit={handleCitySubmit}>
                <div className="inputs">
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
                </div>
                <button className='form-submit'>{cityState.editCityMode ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
}
 
export default CityForm;