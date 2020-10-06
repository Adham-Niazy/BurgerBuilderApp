import React , { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from '../../HOC/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler';
import OrderInstance from '../../axios-orders';
import * as actions from '../../store/Actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onFetchingData();
        // OrderInstance.get('/ingredients.json')
        //             .then(response => {
        //                 this.setState({ingredients: response.data})
        //             })
        //             .catch(error => {
        //                 this.setState({error: true});
        //             })
    }

    updatePurchaseState = Ingredient => {
        const sum = Object.keys(Ingredient).map(igKey => Ingredient[igKey]).reduce((curr, el) => { return curr + el }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    cancelPurchasingHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null;

        let burger = this.props.error ? <h5 style={{color: 'red', textAlign: 'center'}}>Ingredients can't be loaded maybe connection failed</h5> : <Spinner />
        if ( this.props.ings ) {
            burger =
            <Wrapper>
                <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        isAuthenticated={this.props.isAuthenticated} 
                        TotalPrice={this.props.totP}
                        AddedIngredient={this.props.onIngredientAdded}
                        DeletedIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}/>
            </Wrapper>;

            orderSummery = 
            <OrderSummery 
                price={this.props.totP}
                cancelClicked={this.cancelPurchasingHandler} 
                continueClicked={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>;
        }
        

        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasingHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totP: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onFetchingData: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, OrderInstance));