import React , { Component } from 'react';
import OrderInstance from '../../axios-orders';

import Wrapper from '../../HOC/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        // ingredients: null,   
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 1
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     OrderInstance.get('/ingredients.json')
    //                 .then(response => {
    //                     this.setState({ingredients: response.data})
    //                 })
    //                 .catch(error => {
    //                     this.setState({error: true});
    //                 })
    // }

    updatePurchaseState = Ingredient => {
        const sum = Object.keys(Ingredient).map(igKey => Ingredient[igKey]).reduce((curr, el) => { return curr + el }, 0);
        this.setState({purchasable: sum > 0 })
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // To update in imutable way
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const AdditionPrice = INGREDIENT_PRICES[type];
        const NewPrice = this.state.totalPrice + AdditionPrice;
        this.setState({totalPrice: NewPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        // To update in imutable way
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const DeductionPrice = INGREDIENT_PRICES[type];
        const NewPrice = this.state.totalPrice - DeductionPrice;
        this.setState({totalPrice: NewPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchasingHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for ( let i in this.state.ingredients ) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice.toFixed(2));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null;

        let burger = this.state.error ? <h5 style={{color: 'red', textAlign: 'center'}}>Ingredients can't be loaded maybe connection failed</h5> : <Spinner />
        if ( this.state.ingredients ) {
            burger =
            <Wrapper>
                <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        TotalPrice={this.state.totalPrice}
                        AddedIngredient={this.addIngredientHandler}
                        DeletedIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler}/>
            </Wrapper>;

            orderSummery = 
            <OrderSummery 
                price={this.state.totalPrice}
                cancelClicked={this.cancelPurchasingHandler} 
                continueClicked={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>;
        }
        
        if ( this.state.loading ) {
            orderSummery = <Spinner />
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

export default withErrorHandler(BurgerBuilder, OrderInstance);