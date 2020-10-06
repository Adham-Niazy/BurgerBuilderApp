import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    Toggle={this.SideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.showSideDrawer} 
                    Toggle={this.SideDrawerToggleHandler} />

                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);