import React from 'react';

import Styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../HOC/Wrapper';

const sideDrawer = (props) => {
    let attachedClasses = [Styles.SideDrawer, Styles.Close];
    if  (props.show) {
        attachedClasses = [Styles.SideDrawer, Styles.Open];
    }

    return (
        <Wrapper>
            <Backdrop show={props.show} clicked={props.Toggle}/>
            <div className={attachedClasses.join(' ')}>
            <Logo height="11%" />
                <nav style={{marginTop: "32px"}}>
                    <NavigationItems />
                </nav>
            </div>
        </Wrapper>
    );
}

export default sideDrawer;