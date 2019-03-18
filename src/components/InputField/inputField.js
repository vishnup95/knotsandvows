import React, { Component } from 'react';
import {
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

const defaultPatterns = {
    email: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
    password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z][A-Za-z0-9!@#$%^&*()_+]{5,19}$',
    text: '[A-Za-z0-9]+',
}

class InputField extends Component {
   state = {errorMessage: ''};

    handleFocus(inputBox) {
        inputBox.parentNode.classList.add('is-focussed');
        inputBox.parentNode.classList.remove('error');
    }

    validateFormInput(inputBox) {
        return this.handleBlur(inputBox);
    }
      
    handleBlur(inputBox) {
        if(inputBox.value.length == 0) {
            inputBox.parentNode.classList.remove('is-focussed');
        }

       return this.validateInput(inputBox);
    }
      
    handleInput(inputBox) {
        if(inputBox.value.length > 0) {
            inputBox.parentNode.classList.add('is-dirty');
        } else {
            inputBox.parentNode.classList.remove('is-dirty');
        }
    }

    validateInput(inputBox) {
        if(inputBox.value.length == 0) {
            inputBox.parentNode.classList.add('error');   
            this.props.required ? this.setState({errorMessage: 'Required Field'}) : ''; 
            return this.props.required ? false : true; 

        } else if(inputBox.validity.valid) {
            inputBox.parentNode.classList.remove('error');
            return true;

        } else {
            this.setState({errorMessage: 'Invalid'});
            inputBox.parentNode.classList.add('error');
            return false;

        }
    }

    render() {
        return (
            <div className='input-field floating-label'>
              <input className='input-box' 
                type={this.props.type} id={this.props.id} required={this.props.required}
                pattern={this.props.pattern || defaultPatterns[this.props.type]}
                onFocus={() =>  this.handleFocus(event.target)} 
                onBlur={() =>  this.handleBlur(event.target)} 
                onInput={() =>  this.handleInput(event.target)} 
                onChange={() => this.props.onChange(event)}/>
              <Label className='input-placeholder' htmlFor={this.props.id}>{this.props.placeHolder}</Label>
              <span className='input-bar'></span>
              <span className='input-error'>{this.state.errorMessage}</span>
            </div>
        );
    }
}

InputField.propTypes = {
    placeHolder: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    pattern: PropTypes.string
};

InputField.defaultProps = {
    required: true,
}

export default InputField;
