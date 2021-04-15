import './CountryForm.css';

const CountryForm = (props) => {
    return (
        <div className="CountryForm">
            <h3>{ props.state.editMode ? 'Edit Country' : 'Add Country'}</h3>
            <form onSubmit={props.handleSubmit}>
                <label>
                    Country Name:
                    <input className='input-field' name="name" value={props.state.newCountry.name} onChange={props.handleChange} required />
                </label>
                {
                    props.state.branch === 'history' &&
                <label>
                    Month Visited:
                    <input className='input-field' type='month' name="date" value={props.state.newCountry.date} onChange={props.handleChange} required />
                </label>
                }
                { props.state.editMode ? <button>Edit</button> : <button>Add</button>}                
            </form>
        </div>
    );
}
 
export default CountryForm;