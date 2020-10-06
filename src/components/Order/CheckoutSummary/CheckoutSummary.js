import React from 'react';

import Styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => (
    <div className={Styles.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div>
            <Burger ingredients={props.ingredients}/>
        </div>
        <div>
            <Button 
                btnType="Danger"
                clicked={props.cancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.continued}>CONTINUE</Button>
        </div>
    </div>
);

export default checkoutSummary;