import './CountryCard.css';

const CountryCard = (props) => {
    return (
        <div className="CountryCard">
            <p>{props.country.name}</p>
            <p>{props.country.visited ? 'Already Visited' : 'Want to Visit'}</p>
        </div>
    );
}
 
export default CountryCard;