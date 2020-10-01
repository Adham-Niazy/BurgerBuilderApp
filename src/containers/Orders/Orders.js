import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../HOC/WithErrorHandler';
import OrderInstance from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        OrderInstance.get('/orders.json')
            .then(res => {
                // console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(res => {
                this.setState({loading: false});
            })
    }

    render() {
        const orders = this.state.orders.map(order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, OrderInstance);