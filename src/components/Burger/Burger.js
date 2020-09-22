import React from 'react';

import Styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngrediants/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    return (
        <div className={Styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients.length === 0 ? <p>Please start adding ingredients!</p> : transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;