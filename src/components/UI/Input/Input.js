import React from 'react';

import Styles from './Input.module.css';

const input = (props) => {
    let typeOfInput = null;
    const inputClasses = [Styles.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(Styles.Invalid)
    }

    switch(props.elementType) {
        case('input'):
            typeOfInput = 
                    <input 
                        onChange={props.changed} 
                        className={inputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value} />;
            break;
        case('textarea'):
            typeOfInput = 
                    <textarea 
                        onChange={props.changed} 
                        className={inputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value}/>;
            break;
        case('select'):
            typeOfInput = (
                <select 
                    onChange={props.changed} 
                    className={inputClasses.join(' ')} 
                    value={props.value}>
                    {props.elementConfig.options.map(el => <option key={el.value} value={el.value}>{el.displayedValue}</option>)}
                </select>);
            break;
        default: 
            typeOfInput = 
                <input 
                    onChange={props.changed} 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} value={props.value}/>;
    }
    return (
        <div className={Styles.Input}>
            <label className={Styles.Label}>{props.label}</label>
            {typeOfInput}
        </div>
    )
};

export default input;