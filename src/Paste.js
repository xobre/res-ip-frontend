import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import Nav from './Nav';
import './Paste.css';

function Paste() {

  const handleSave = (event) => {
    event.preventDefault();
    const ingredientsList = getIngredients();
    const url = `https://res-ip.azurewebsites.net/save`;
    superagent.post(url)
      .send({ingredients : ingredientsList})
      .end((error, response) => console.log(response));
}

  function getIngredients(event) {
    const ingredients = event.target.firstChild.value.toLowerCase()
      .split('\n')
      .filter(ingredient => ingredient !== '')
      .map(ingredient => ingredient.trim());

    return ingredients;
  }

  return (
    <div>
      <Nav />
      <div className="container text-center">
        <p>Copy and paste the ingredients list below. Each line will be a new item on your list. Help us out nerds.</p>
        <form onSubmit={handleSave}>
          <textarea />
          <button type="submit" className="btn">save</button>
        </form >
      </div>
    </div>
  )
}

export default Paste;