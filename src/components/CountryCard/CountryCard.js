import './CountryCard.css';

const CountryCard = (props) => {
    return (
        <div className="CountryCard">
            <h3 className='country-name'>{props.country.name}</h3>
            <img className='flag' src={props.country.flagPath} alt={`country flag for ${props.country.name}`} />
            <p>{props.country.visited ? 'Already Visited' : 'Want to Visit'}</p>
        </div>
    );
}
 
export default CountryCard;