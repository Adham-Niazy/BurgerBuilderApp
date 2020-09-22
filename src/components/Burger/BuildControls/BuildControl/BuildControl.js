import React from 'react';

import Styles from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={Styles.BuildControl}>
        <div className={Styles.Label}>{props.label}</div>
        <button disabled={props.disabled} onClick={props.Removed} className={Styles.Less}>Less</button>
        <button onClick={props.Add} className={Styles.More}>More</button>
    </div>
);

export default buildControl;