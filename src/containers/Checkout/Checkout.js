import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render() {
        let summary = <Redirect to="/"/>
        if ( this.props.ings ) {
            summary = 
                <div>
                    {this.props.purchased ? <Redirect to="/"/> :  null}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        cancelled={this.cancelHandler}
                        continued={this.continueHandler} />
                    <Route 
                        path={this.props.match.path +'/contact-info'}
                        component={ContactData} />
                </div>
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);