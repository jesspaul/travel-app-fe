import { useContext } from 'react';
import { CityContext } from '../../contexts/CityContext';
import { DetailContext } from '../../contexts/DetailContext';
import './DetailForm.css';

const DetailForm = () => {
    const { cityState } = useContext(CityContext);
    const { handleDetailSubmit, handleDetailChange } = useContext(DetailContext);

    return (
        <div className="DetailForm">
            <h3>{cityState.editDetailMode ? 'Edit Detail' : 'Add New Detail'}</h3>
            <form>
                <textarea id='detail-textarea' name="text" onChange={handleDetailChange}></textarea>
                <button className='form-submit' onClick={handleDetailSubmit}>{cityState.editDetailMode ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
}
 
export default DetailForm;