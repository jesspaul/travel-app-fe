import Detail from '../Detail/Detail';
import DetailForm from '../DetailForm/DetailForm';
import './CityDetails.css';

const CityDetails = (props) => {
    return (
        <div className='CityDetails'>
            { props.cityState.currentCity.name === props.cityState.open ? (
                <>
                    <ul>
                        { props.cityState.currentCity.details.length ? props.cityState.currentCity.details.map((detail, idx) =>
                        <Detail
                            key={idx} 
                            detail={detail}
                            cityState={props.cityState}
                            toggleDetailEditMode={props.toggleDetailEditMode}
                            handleDetailDelete={props.handleDetailDelete}
                        />)
                        : <li>No Details</li>}
                    </ul>
                    { props.cityState.detailStatus === 'new' ? <button onClick={props.toggleDetailStatus} >+ Add New</button> :
                    <DetailForm
                        cityState={props.cityState}
                        handleDetailChange={props.handleDetailChange}
                        handleDetailSubmit={props.handleDetailSubmit}
                    />}
                    
                </>
            ) : null }
        </div>
    );
}
 
export default CityDetails;