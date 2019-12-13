import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

function List() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const url = `http://172.20.200.23:3001/list`;
    superagent.get(url)
    .then(result => {
      const ingredientsArray = JSON.parse(result.text);
      setIngredients(splitList(ingredientsArray));
    });
  }, []);

  function splitList(recipesArray){
    let ingreds = new Set();
    for (let i = 0; i < recipesArray.length; i++) {
      if (recipesArray[i].ingredients !== null){
        let temp = recipesArray[i].ingredients.split(', ');
        for (let j = 0; j < temp.length; j++) {
          ingreds.add(temp[j].toLowerCase());
        }
      }
    }

   return Array.from(ingreds);
  }

  return(
    <div>
      <h1>Shopping List</h1>
      {ingredients.map((ingredient, i) => <Checkbox key={i} ingredient={ingredient} /> )}
    </div>
  )
}

function Checkbox(props) {
  return(
    <div>
      <input type="checkbox" name={`ingredient${props.key}`}/>
      <label htmlFor={`ingredient${props.key}`}>{props.ingredient}</label>
    </div>
  )
}

export default List;