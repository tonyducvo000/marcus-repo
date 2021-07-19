import React, { Component } from 'react'
import firebase from '../util/firebase';

//for validation - must validate user input to ensure user
//submitted string is an email
import Joi from 'joi-browser';


class CallToActionForm extends Component {

    state = {
        data: {},
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label('Email'),  //input rule: should be string, email form
    };


    validate = () => {
        const options = { abortEarly: true }
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;


        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message; // save error message to errors['email]
        return errors;

    }


    handleSubmit = () => {
        //push user input into backend
        const emailFirebase = firebase.database().ref("email");
        const emailData = ({ emailInput: this.state.data })
        emailFirebase.push(emailData);

    }

    handleChange = ({ currentTarget: input }) => {
        //this.setState({ userInput: e.target.value })
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;  //save error message into errors['email']
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;  //  save input value into data['email']
        this.setState({ data, errors });

    }

    validateProperty = ({ name, value }) => {

        const obj = { [name]: value };  // save user input into obj and validate it against rules in schema['email']
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;

    }

    render() {

        return (
            <div>
                <label>Call to action:</label>
                <input
                    //value="" loads default value
                    name="email"
                    id="email"
                    className="email-input"
                    type="text"
                    onChange={this.handleChange}
                />{this.state.errors["email"] && <div className="alert alert-danger">{this.state.errors["email"]}</div>}
                <button
                    disabled={this.validate()}
                    onClick={this.handleSubmit}>Submit</button>
            </div>
        );

    }
}

export default CallToActionForm;