import React, {useState, useEffect} from 'react';
import superagent from "superagent";

function List() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3001/list`;
    superagent.get(url)
    .then(result => {
      const ingredientsArray = JSON.parse(result.text);
      console.log(result.text);
      setIngredients(ingredientsArray);
    });
  }, []);
}

export default List;