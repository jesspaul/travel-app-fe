import CountryDetails from "../components/CountryDetails/CountryDetails";

const DetailsPage = (props) => {
    return (
        <div className="DetailsPage">
            <CountryDetails
                state={props.state}
                handleDelete={props.handleDelete}
                toggleEditMode={props.toggleEditMode}
                toggleStatus={props.toggleStatus}
                cityState={props.cityState}
                toggleCityEditMode={props.toggleCityEditMode}
                handleCityDelete={props.handleCityDelete}
                selectCity={props.selectCity}
                handleCitySubmit={props.handleCitySubmit}
                handleCityChange={props.handleCityChange}
                toggleDetailStatus={props.toggleDetailStatus}
                toggleDetailEditMode={props.toggleDetailEditMode}
                handleDetailDelete={props.handleDetailDelete}
                handleDetailChange={props.handleDetailChange}
                handleDetailSubmit={props.handleDetailSubmit}
            />
        </div>
    );
}
 
export default DetailsPage;