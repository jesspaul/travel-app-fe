import './City.css';

const City = (props) => {
    return (
        <li className="City">
            <h3>{props.city.name}</h3>
        </li>
    );
}
 
export default City;