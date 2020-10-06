import React, { Component } from 'react';
import { connect } from 'react-redux'

import Order from '../../components/Order/Order';
import withErrorHandler from '../../HOC/WithErrorHandler';
import OrderInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/Actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchingOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />
        if ( !this.props.loading ) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingOrders: (token, userId) => dispatch(actions.fetchingOrders(token, userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, OrderInstance));