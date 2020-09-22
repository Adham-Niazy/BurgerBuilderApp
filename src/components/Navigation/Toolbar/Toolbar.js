import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Styles from './Toolbar.module.css';


const toolbar = (props) => (
    <header className={Styles.Toolbar}>
        <DrawerToggle Toggle={props.Toggle}/>
        <Logo height='80%' />
        <nav className={Styles.DesktopOnly} >
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar;