import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import OrderInstance from '../../../axios-orders';
import Styles from './ContactData.module.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayedValue: 'Fastest'},
                        {value: 'cheapest', displayedValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = event => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const PurchasedOrder = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
            
        }
        OrderInstance.post('/orders.json', PurchasedOrder)
                .then(response => {
                    this.setState({ loading: false});
                    this.props.history.push('/');
                })
                .catch(error => {
                    this.setState({ loading: false});
                });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }


    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier] 
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for ( let elements in updatedOrderForm ) {
            formIsValid = updatedOrderForm[elements].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    render() {
        const formElementsArray = [];
        for ( let key in this.state.orderForm ) {
            formElementsArray.push({
                id: key,
                setup: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
                        {formElementsArray.map( el => 
                                <Input 
                                    key={el.id}
                                    elementType={el.setup.elementType} 
                                    elementConfig={el.setup.elementConfig} 
                                    invalid={!el.setup.valid}
                                    shouldValidate={el.setup.validation}
                                    touched={el.setup.touched}
                                    value={el.setup.value}
                                    changed={(event) => this.inputChangeHandler(event, el.id)}/>)}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER NOW!</Button>
                    </form>);
        if ( this.state.loading ) {
            form = <Spinner />
        }

        return (
            <div className={Styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;