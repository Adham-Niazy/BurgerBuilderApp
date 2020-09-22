import React from 'react';

import Styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];
const buildControls = (props) => (
    <div className={Styles.BuildControls}>
        <p>Current Price: <strong>{props.TotalPrice.toFixed(2)} $</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                disabled={props.disabled[ctrl.type]}
                key={ctrl.label} 
                label={ctrl.label}
                Add={() => props.AddedIngredient(ctrl.type)}
                Removed={() => props.DeletedIngredient(ctrl.type)}/>
        ))}
        <button disabled={!props.purchasable}
                className={Styles.OrderButton}
                onClick={props.purchasing}>ORDER NOW!</button>
    </div>
);
export default buildControls;