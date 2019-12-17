import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import Nav from './Nav';
import './Paste.css';

function Paste() {

  const handleSave = (event) => {
    event.preventDefault();
    let ingredientsList = getIngredients(event);
    const url = `https://res-ip.azurewebsites.net/save`;
    superagent.post(url)
      .send({ingredients : ingredientsList.join(', ')})
      .end((error, response) => console.log(response));
}

  const getIngredients = (event) => {
    return event.target.firstChild.value.toLowerCase()
      .split('\n')
      .filter(ingredient => ingredient !== '')
      .map(ingredient => ingredient.trim());
  }

  return (
    <div>
      <Nav />
      <div className="container text-center">
        <p>Copy and paste the ingredients list below. Each line will be a new item on your groceries list.</p>
        <form onSubmit={handleSave}>
          <textarea />
          <button type="submit" className="btn" value="Clear">save</button>
        </form >
      </div>
    </div>
  )
}

export default Paste;