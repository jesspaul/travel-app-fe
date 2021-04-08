const CountryCard = (props) => {
    return (
        <div className="CountryCard">
            {props.country.name}
        </div>
    );
}
 
export default CountryCard;