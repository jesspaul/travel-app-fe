import { useContext } from 'react';
import { CountryContext } from '../../contexts/CountryContext';

const NewCountry = () => {
    const { state, addCountry, handleChange } = useContext(CountryContext);

    return (
        <div className="NewCountry">
            New Country Form
            <form onSubmit={addCountry}>
                <label>
                    Country Name:
                    <input name="name" value={state.newCountry.name} onChange={handleChange}/>
                </label>
                <input type="submit" value="Add"/>
            </form>
        </div>
    );
}
 
export default NewCountry;