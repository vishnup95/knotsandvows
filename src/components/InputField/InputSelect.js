import React, { Component } from 'react';
import {
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

class InputSelect extends Component {
    handleFocus(inputBox) {
        inputBox.parentNode.classList.add('is-focussed');
        inputBox.parentNode.classList.remove('error');
    }
      
    handleBlur(inputBox) {
        if(inputBox.value.length == 0) {
            inputBox.parentNode.classList.remove('is-focussed');
        }

        this.validateInput(inputBox);
    }
      
    handleInput(inputBox) {
        if(inputBox.value.length > 0) {
            inputBox.parentNode.classList.add('is-dirty');
        } else {
            inputBox.parentNode.classList.remove('is-dirty');
        }
    }

    validateInput(inputBox) {
        if(inputBox.validity.valid) {
            inputBox.parentNode.classList.remove('error');
        } else {
            inputBox.parentNode.classList.add('error');
        }
    }
    
    render() {
        return (
            <div className='input-field floating-label'>
                <Label for="exampleSelect" className='input-placeholder'>Type of Event</Label>
                <select name="select" defaultValue="" id="exampleSelect" className='input-box' onFocus={() =>  this.handleFocus(event.target)} onBlur={() =>  this.handleBlur(event.target)} onInput={() =>  this.handleInput(event.target)}>
                    <option value="" disabled></option>
                    <option>Wedding</option>
                    <option>Photography</option>
                    <option>Photography</option>
                    <option>Photography</option>
                    <option>Photography</option>
                </select>
                <span className='input-bar'></span>
                <span className='input-error'>Error message.</span>
            </div>
            
        );
    }
}

InputSelect.propTypes = {
    placeHolder: PropTypes.string,
    id: PropTypes.string
};

export default InputSelect;