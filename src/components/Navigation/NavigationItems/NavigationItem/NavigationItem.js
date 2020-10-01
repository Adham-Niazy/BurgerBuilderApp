import React from 'react';
import { NavLink } from 'react-router-dom';

import Styles from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={Styles.NavigationItem}>
        <NavLink 
            exact
            to={props.link}
            activeClassName={Styles.active}>{ props.children }</NavLink>
    </li>
);

export default navigationItem;