import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
                    minLength: 6

                },
                valid: false,
                touched: false
            }
        }
    }
    render() {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                setup: this.state.controls[key]
            })
        }
        const form = formElementsArray.map( element => (
            <Input 
                elementType={element.setup.elementType} 
                elementConfig={element.setup.elementConfig} 
                invalid={!element.setup.valid}
                shouldValidate={element.setup.validation}
                touched={element.setup.touched}
                value={element.setup.value}
                changed={(event) => this.inputChangeHandler(event, element.id)}/>
        ));

        return (
            <div>
                <form>
                    {form}
                    <Button btnType="Success">SIGNUP</Button>
                </form>
            </div>
        );
    }
}

export default Auth;