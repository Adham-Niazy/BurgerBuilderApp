import React from 'react';

import burgerLogo from '../../assets/images/133 burger-logo.png';
import Styles from './Logo.module.css';

const logo = (props) => (
    <div className={Styles.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Logo"/>
    </div>
);

export default logo;