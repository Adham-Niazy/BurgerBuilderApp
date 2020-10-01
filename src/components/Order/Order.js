import React from 'react';

import Styles from './Order.module.css';

const order = (props) => {
    const Ingredients = [];

    for(let ingredientName in props.ingredients) {
        Ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            });
    }

    const outputtedIngredient = Ingredients.map(ig => 
        <span 
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #CCC',
                padding: '5px',
                textTransform: 'capitalize'
            }} 
            key={ig.name}>
                {ig.name} ({ig.amount})
        </span>);

    return (
        <div className={Styles.Order}>
            <p>Ingredients: {outputtedIngredient}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
};

export default order;