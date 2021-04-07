const NewCountry = (props) => {
    async function addCountry(evt) {
        if (!props.state.user) return;

        evt.preventDefault();
        const BASE_URL = 'http://localhost:3001/countries';
        const country = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(props.state.newCountry)
        }).then(res => res.json());

        props.setState(prevState => ({
            ...prevState,
            countries: [...prevState.countries, country]
        }));
    }

    return (
        <div className="NewCountry">
            New Country Page
            <form onSubmit={addCountry}>
                <label>
                    Country Name:
                    <input type="text" name="name"/>
                </label>
                <input type="submit" value="Add"/>
            </form>
        </div>
    );
}
 
export default NewCountry;