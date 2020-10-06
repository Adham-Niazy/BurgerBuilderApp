import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={Styles.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {
            props.isAuthenticated ? 
            <NavigationItem link="/orders">Orders</NavigationItem> :
            null
        }
        { 
            props.isAuthenticated ? 
            <NavigationItem link="/logout">Logout</NavigationItem> : 
            <NavigationItem link="/auth">Login</NavigationItem>
        }
    </ul>
);

export default navigationItems;