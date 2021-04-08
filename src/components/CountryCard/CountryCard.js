import './CountryCard.css';

const CountryCard = (props) => {
    return (
        <div className="CountryCard">
            <h3 className='country-name'>{props.country.name}</h3>
            <img className='flag' src={props.country.flagPath} alt={`country flag for ${props.country.name}`} />
            {props.country.visited && <p>{props.country.date}</p>}
        </div>
    );
}
 
export default CountryCard;