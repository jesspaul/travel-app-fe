import { Link } from 'react-router-dom';
import CountryCard from '../CountryCard/CountryCard';
import CountryForm from '../CountryForm/CountryForm';
import './CountryGrid.css';

const CountryGrid = (props) => {
    const renderCards = () => {
        if (!props.user) return;
        if (props.branch === 'history') {
            return props.state.countries.map((country, idx) =>
                country.visited && 
                <Link className='body-link' to='/details' key={idx} onClick={() => props.selectCountry(country)}>
                    <CountryCard country={country}/>
                </Link>
            );
        } else if (props.branch === 'future') {
            return props.state.countries.map((country, idx) => (
                !country.visited && 
                <Link className='body-link' to='/details' key={idx} onClick={() => props.selectCountry(country)}>
                    <CountryCard country={country}/>
                </Link>
            ))
        }
    }
    return (
        <div className="CountryGrid">
            {props.state.countries.length ? renderCards()
                : <div>No Countries in List</div>
            }
            {
                props.state.status === 'button' ?
                <button className='add-new' onClick={props.toggleStatus}>+ Add New</button>
                :
                <CountryForm
                    state={props.state}
                    handleSubmit={props.handleSubmit}
                    handleChange={props.handleChange}
                />
            }
        </div>
    );
}
 
export default CountryGrid;