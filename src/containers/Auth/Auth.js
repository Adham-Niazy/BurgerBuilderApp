import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/Actions/index';
import Styles from './Auth.module.css'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20

                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if ( !this.props.building && this.props.authRedirectPath !== '/' ) {
            this.props.onSetRedirectPath();
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
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
        if ( rules.isEmail ) {
            const pattern = /^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\.([a-zA-Z]{2,5})$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onAuth(email, password, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }


    render() {

        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                setup: this.state.controls[key]
            })
        }
        let form = formElementsArray.map( element => (
            <Input 
                key={element.id}
                elementType={element.setup.elementType} 
                elementConfig={element.setup.elementConfig} 
                invalid={!element.setup.valid}
                shouldValidate={element.setup.validation}
                touched={element.setup.touched}
                value={element.setup.value}
                changed={(event) => this.inputChangeHandler(event, element.id)}/>
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if ( this.props.error ) {
            errorMessage = <h4 style={{color: 'red'}}>{this.props.error.message}</h4>
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={Styles.Auth}>
                { authRedirect }
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{!this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, mode) => dispatch(actions.Auth(email, password, mode)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);