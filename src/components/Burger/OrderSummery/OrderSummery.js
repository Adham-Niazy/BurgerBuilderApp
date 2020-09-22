import React from 'react';

import Wrapper from '../../../HOC/Wrapper';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {
    const IngredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>;
    });
    return (
        <Wrapper>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {IngredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
            <Button btnType='Danger' clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continueClicked}>CONTINUE</Button>
        </Wrapper>
    )
}

export default orderSummery;