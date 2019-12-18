// https://reactjs.org/docs/hooks-intro.html
import React, { useState } from 'react';
import superagent from 'superagent';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import './Home.css';

function Home() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    // provides a method to reset the state variables by setting recipes to an empty array
    const clearRecipes = () => {
        setRecipes([]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // after query has been submitted, clear the query state to an empty string
        setQuery("");
        const url = `https://res-ip.azurewebsites.net/recipes?food=${query}`;
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
            {/* adds the nav bar to this page */}
            <Nav clearRecipes={clearRecipes} />
            <div className="container">
                <h1 className="text-center">Res IP</h1>
                <h2 className="text-center">pronounced /ˈresəˌpē/</h2>
                <form className="form-inline search-form">
                    <div className="form-group mx-sm-3 mb-2">
                        {/* creates a text box and submit button on the same line */}
                        <input onChange={(event) => setQuery(event.target.value)} className="form-control" type="text" name="name" placeholder="i.e. Noodles" value={query} />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-2">search</button>
                </form>
                {/* maps over array and applys the Recipe component to each object in the array of objects */}
                {recipes.map((recipeObject, key) => <Recipe key={key} recipe={recipeObject} />)}
            </div>
        </div>
    );
}

function Recipe(props) {
    const handleSave = (event) => {
        // prevents default behavior of button press (reloading page)
        event.preventDefault();
        const url = `https://res-ip.azurewebsites.net/save`; // database URL
        superagent.post(url)
        // sending objects created from prop to the server
        .send({ingredients : props.recipe.ingredients})
        .end((error, response) => console.log(response));
        // calling the end function ends the request
    }
    return(
        <div className="card">
            {/* opening the link provided by the prop in new tab, using the title as a hyperlink */}
            <h5 className="text-center">
                <a href={props.recipe.href} target="_blank" rel="noopener noreferrer" className="card-title">{props.recipe.title}</a>
            </h5>
            {/* prints the ingredients on the line below the title */}
            <p>{`Ingredients: ${props.recipe.ingredients}`}</p>
            <button onClick={handleSave} className="btn">save</button>
        </div>
    )
}
export default Home;