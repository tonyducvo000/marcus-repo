import React, { Component } from 'react'
import Input from './Input'
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
        email: Joi.string().required().email().label('Email'),  //input rule: should be string, is required, email form
        firstName: Joi.string().required().label('First name'),  //input rule: should be string, is required 
        lastName: Joi.string().required().label('Last name'),  //input rule: should be string, is required 
    };


    validate = () => {
        const options = { abortEarly: true }
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;


        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message; // save error message to errors[name]
        return errors;

    }


    handleSubmit = () => {
        const { email, firstName, lastName } = this.state.data;  //destructure the data

        const Firebase = firebase.database().ref("inputData");
        //const inputSet = ({ dataInput: this.state.data}) //can push bundled data onto if desired
        const inputSet = ({ emailInput: email, firstNameInput: firstName, lastNameInput: lastName });

        Firebase.push(inputSet);

    }

    handleChange = ({ currentTarget: input }) => {

        //this.setState({ userInput: e.target.value })
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);  //input will be an object captured from event
        if (errorMessage) errors[input.name] = errorMessage;  //save error message into errors['email']
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;  //  save input value into data['email']
        this.setState({ data, errors });
    }

    // handleChange = (e) => {
    //     console.log(e);
    // }



    validateProperty = ({ name, value }) => {

        const obj = { [name]: value };  // save user input into obj and validate it against rules in schema[name], where name is captured from event
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    }

    render() {

        return (

            <div>
                <Input
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    type="text"
                    error={this.state.errors['firstName']}
                    onChange={this.handleChange}
                >
                </Input>

                <Input
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    type="text"
                    error={this.state.errors['lastName']}
                    onChange={this.handleChange}
                >
                </Input>

                <Input Input
                    label="Email"
                    name="email"
                    id="email"
                    type="text"
                    error={this.state.errors['email']}
                    onChange={this.handleChange}
                >
                </Input>

                <button
                    disabled={this.validate()}
                    onClick={this.handleSubmit}>Submit</button>
            </div>

        );

    }
}

export default CallToActionForm;