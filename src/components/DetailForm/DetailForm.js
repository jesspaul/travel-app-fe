import './DetailForm.css';

const DetailForm = (props) => {
    return (
        <div className="DetailForm">
            <h3>{props.cityState.editDetailMode ? 'Edit Detail' : 'Add New Detail'}</h3>
            <form>
                <textarea id='detail-textarea' name="text" onChange={props.handleDetailChange}></textarea>
                <button onClick={props.handleDetailSubmit}>{props.cityState.editDetailMode ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
}
 
export default DetailForm;