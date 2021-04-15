import CountryGrid from '../components/CountryGrid/CountryGrid';

const ListPage = (props) => {
    const branch = props.match.path.slice(1);
    return (
        <div className="ListPage">
            <h2>{props.state.branch[0].toUpperCase() + props.state.branch.slice(1) + ' Page'}</h2>
            <CountryGrid
                branch={branch}
                user={props.user}
                state={props.state}
                selectCountry={props.selectCountry}
                toggleStatus={props.toggleStatus}
                handleSubmit={props.handleSubmit}
                handleChange={props.handleChange}
            />
        </div>
    );
}
 
export default ListPage;