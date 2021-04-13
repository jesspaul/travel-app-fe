import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';
import './NewCountry.css';

const NewCountry = () => {
    const { state, handleSubmit, handleChange } = useContext(CountryContext);

    return (
        <div className="NewCountry">
            <h3>{ state.editMode ? 'Edit Country' : 'Add Country'}</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Country Name:
                    <input className='input-field' name="name" value={state.newCountry.name} onChange={handleChange} required />
                </label>
                {
                    state.branch === 'history' &&
                <label>
                    Month Visited:
                    <input className='input-field' type='month' name="date" value={state.newCountry.date} onChange={handleChange} required />
                </label>
                }
                { state.editMode ? <button>Edit</button> : <button>Add</button>}                
            </form>
        </div>
    );
}
 
export default NewCountry;