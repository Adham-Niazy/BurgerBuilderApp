import React from 'react';

import Styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => (
    <div className={Styles.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width: '100%', height: '300px', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
            btnType="Danger"
            clicked={props.cancelled}>CANCEL</Button>
        <Button 
            btnType="Success"
            clicked={props.continued}>CONTINUE</Button>
    </div>
);

export default checkoutSummary;