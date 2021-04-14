import './CityDetails.css';

const CityDetails = (props) => {
    return (
        <div className='CityDetails'>
            Details for {props.city.name}<br></br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tempore minima ratione deserunt iste odio ex, quasi ipsa? Minima aliquam tempore pariatur mollitia sequi voluptas tenetur suscipit numquam cumque temporibus.
        </div>
    );
}
 
export default CityDetails;