import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import './NewCountry.css';

const NewCountry = () => {
    const { state, addCountry, handleChange } = useContext(CountryContext);

    return (
        <div className="NewCountry">
            <h3>Add New Country</h3>
            <form onSubmit={addCountry}>
                <label>
                    Country Name:
                    <input name="name" value={state.newCountry.name} onChange={handleChange} required />
                </label>
                {
                    state.branch === 'history' &&
                <label>
                    Month Visited:
                    <input type='month' name="date" value={state.newCountry.date} onChange={handleChange} required />
                </label>
                }
                <input type="submit" value="Add"/>
            </form>
        </div>
    );
}
 
export default NewCountry;