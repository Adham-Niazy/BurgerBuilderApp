import React, { Component } from 'react';

import Styles from './Modal.module.css';
import Wrapper from '../../../HOC/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
            return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Wrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={Styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Wrapper>
        )
    }
};

export default Modal;
