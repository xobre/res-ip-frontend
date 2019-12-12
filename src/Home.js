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
        // gets info from the server and parses it into JSON and inserts each object into an array
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
                {/* creates a text box and submit button on the same line */}
                <input onChange={(event) => setQuery(event.target.value)} type="text" name="name" placeholder="i.e. Noodles" />
                <button onClick={handleSubmit}>search</button>
            </form>
            {/* maps over array and applys the Recipe component to each object in the array of objects */}
            {recipes.map((recipeObject, key) => <Recipe key={key} recipe={recipeObject} />)}
        </div>
    );
}

function Recipe(props) {
    const handleSave = (event) => {
        event.preventDefault();
        const url = `http://localhost:3001/save`; // database URL
        superagent.post(url)
        // sending objects created from prop to the server
        .send({title : props.recipe.title, ingredients : props.recipe.ingredients, href : props.recipe.href})
        .end((error, response) => console.log(response));
        // calling the end function ends the request
    }
    return(
        <div>
            {/* opening the link provided by the prop in new tab, using the title as a hyperlink */}
            <a href={props.recipe.href} target="_blank" rel="noopener noreferrer">{props.recipe.title}</a><br></br>
            <button onClick={handleSave}>Save</button>
            {/* prints the ingrediens on the line below the title */}
            <p>{props.recipe.ingredients}</p>
        </div>
    )
}
export default Home;