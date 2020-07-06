import React, {Component} from 'react';
import axois from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

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
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
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
                    placeholder: 'Your Email'
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
                    options: [{value: 'fastest', displayValue: 'Fastest'},{value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false,      
        loading: false
    }

    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let elementId in this.state.orderForm){
            formData[elementId] = this.state.orderForm[elementId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        try {
            const response = await axois.post('/orders.json', order);
            console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');

        }
        catch (error){
            console.log(error);
            this.setState({loading: false});
        }
    }

    inputChangeHandler = (event, inputId) => {
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[inputId]};
        updatedElement.touched = true;
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidation(updatedElement.value, updatedElement.validation)
        updatedForm[inputId] = updatedElement;
        let formIsValid = true;
        for (let inputId in updatedForm){
            formIsValid = updatedForm[inputId].valid && formIsValid
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid})
    }

    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    render () {
        const formElements = [];
        for (let key in this.state.orderForm){
            formElements.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElements.map(element => (
                <Input 
                key={element.id} 
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                invalid={!element.config.valid}value={element.config.value} 
                touched={element.config.touched}
                shouldValidate={element.config.validation}
                changed={(event) => this.inputChangeHandler(event, element.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Info</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;