import React, { Component } from 'react';

import Wrapper from '../../HOC/Wrapper';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    } 

    render() {
        return (
            <Wrapper>
                <SideDrawer show={this.state.showSideDrawer} Toggle={this.SideDrawerToggleHandler} />
                <Toolbar Toggle={this.SideDrawerToggleHandler}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}

export default Layout;