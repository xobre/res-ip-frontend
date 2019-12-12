// https://reactjs.org/docs/hooks-intro.html
import React, {useState} from 'react';
import superagent from "superagent";

function Home() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `http://localhost:3001/recipes?food=${query}`;

        superagent.get(url)
        .then(result => {
            const recipesArray = JSON.parse(result.text);
            console.log(result.text);
            setRecipes(recipesArray);
        })
    }

    return(
        <div>
            <h1>Res I.P.</h1>
            <h2>pronounced /ˈresəˌpē/</h2>
            <form>
                <input onChange={(event) => setQuery(event.target.value)} type="text" name="name" placeholder="i.e. Noodles" />
                <button onClick={handleSubmit}>search</button>
            </form>
            {recipes.map(element => <Recipe recipe={element} />)}
        </div>
    );
}

function Recipe(props) {
    return(
        <div>
            <p>{props.recipe.title}</p>
        </div>
    )
}
export default Home;