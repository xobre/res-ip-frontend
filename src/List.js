import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import Nav from './Nav';
import './List.css';

function List() {
  const [ingredients, setIngredients] = useState([]);

  // loads ingredients from DB on page load
  useEffect(getList, []); // [] ensures that the this only happens on page load

  function getList () {
    const url = `https://res-ip.azurewebsites.net/list`;
    superagent.get(url)
    .then(result => {
      const ingredientsArray = JSON.parse(result.text);
      // calls below function to split the string into an array
      setIngredients(ingredientsArray);
    });
  }

  function handleDelete (event) {
    const toDelete = getCheckedValues();
    if (toDelete.length !== 0) {
        const url = `https://res-ip.azurewebsites.net/delete`;
        superagent.post(url)
        .send({ids : toDelete})
        .then(stuff => getList())
        .catch((error) => console.log(error));
    }
  }

  function getCheckedValues () {
    // https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
    // source for the loop
    let checkedValues = []; 
    let inputElements = document.getElementsByClassName('form-check-input');
    for(let i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           checkedValues.push(parseInt(inputElements[i].value));
           inputElements[i].checked = false;
      }
    }
    return checkedValues;
  }

  return(
    <div>
      <Nav />
      <div className="container">
        <h1 className="text-center">Shopping List</h1>
        {/* maps over the array of ingredients and lists them as checkboxes */}
        {ingredients.map((ingredient, i) => <Checkbox index={i} ingredient={ingredient} /> )}
        <button onClick={handleDelete} type="button" className="btn btn-danger mb-2">DELETE</button>
      </div>
    </div>
  )
}

// makes each entry a list item with checkbox
function Checkbox(props) {
  return(
      <div key={props.index} className="form-check">
        <input id={`ingredient${props.index}`} 
                type="checkbox" 
                name={`ingredient${props.index}`} 
                value={props.ingredient.id} 
                className="form-check-input"
        />
        <label htmlFor={`ingredient${props.index}`} className="capital-case strikethrough">
          {props.ingredient.ingredients}
        </label>
      </div>
  )
}

export default List;