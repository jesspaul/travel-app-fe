import './CityForm.css';

const CityForm = (props) => {
    console.log(props.cityState)
    return (
        <div className="CityForm">
            <h3>{props.cityState.editCityMode ? 'Edit City' : 'Add New City'}</h3>
            <form onSubmit={props.handleCitySubmit}>
                <label>
                    City Name:
                    <input name="name" value={props.state.currentCountry.newCity.name} onChange={props.handleCityChange} required />
                </label>
                {
                    props.state.branch === 'history' &&
                <label>
                    Date Visited:
                    <input type='date' name="date" value={props.state.currentCountry.newCity.date} onChange={props.handleCityChange} required />
                </label>
                }
                <button>{props.cityState.editCityMode ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
}
 
export default CityForm;