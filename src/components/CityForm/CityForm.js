import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import './CityForm.css';

const CityForm = () => {
    const { state } = useContext(CountryContext);
    return (
        <div className="CityForm">
            <h3>Add New City</h3>
            <form>
                <label>
                    City Name:
                    <input name="name" value='' required />
                </label>
                {
                    state.branch === 'history' &&
                <label>
                    Date Visited:
                    <input type='date' name="date" value='' required />
                </label>
                }
                <button>Add</button>
            </form>
        </div>
    );
}
 
export default CityForm;