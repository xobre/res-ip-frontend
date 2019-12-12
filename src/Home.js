// https://reactjs.org/docs/hooks-intro.html
import React, {useState} from 'react';
import superagent from "superagent";

function Home() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `http://localhost:3001/recipes?food=${query}`;

        superagent.get(url)
        .then(result => {
            // const recipesArray = JSON.parse(result);
            console.log(result);
            setRecipes(result);
        })
    }

    return(
        <div>
            <h1>Res I.P.</h1>
            <h2>pronounced /ˈresəˌpē/</h2>
            <form>
                <label>
                    <input onChange={(e) => setQuery(e.target.value)} type="text" name="name" placeholder="i.e. Noodles" />
                </label>
                <button onClick={handleSubmit}>search</button>
            </form>
        </div>
    );
}

export default Home;