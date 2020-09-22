import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch(this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={Styles.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={Styles.BreadTop}>
                        <div className={Styles.Seeds1}></div>
                        <div className={Styles.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={Styles.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={Styles.Cheese}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={Styles.Bacon}></div>;
                break;
            case ('salad'):
                ingredient = <div className={Styles.Salad}></div>;
                break;

            default:
                ingredient = null;
        }

        return ingredient;
    }
    
};

BurgerIngredient.proptype = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;