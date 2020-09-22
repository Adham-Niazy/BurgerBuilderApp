import React from 'react';

import Styles from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={Styles.DrawerToggle} onClick={props.Toggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;