import CountryGrid from '../components/CountryGrid/CountryGrid';

const ListPage = (props) => {
    const branch = props.match.path.slice(1);
    return (
        <div className="ListPage">
            <h2>{branch[0].toUpperCase() + branch.slice(1) + ' Page'}</h2>
            <CountryGrid branch={branch} />
        </div>
    );
}
 
export default ListPage;