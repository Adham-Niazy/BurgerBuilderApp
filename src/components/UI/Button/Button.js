import React from 'react';

import Styles from './Button.module.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[Styles.Button, Styles[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;