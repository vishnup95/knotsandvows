import React, { Component } from 'react';
import {
    Label
} from 'reactstrap';
import PropTypes from 'prop-types';

class InputSelect extends Component {
    componentDidMount() {
        this.handleFocus(document.getElementById(this.props.id));
    }

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
                <Label for="exampleSelect" className='input-placeholder'>{this.props.placeHolder}</Label>
                <select name="select" defaultValue="" id={this.props.id} className='input-box' onFocus={() =>  this.handleFocus(event.target)} onBlur={() =>  this.handleBlur(event.target)} onInput={() =>  this.handleInput(event.target)}>
                    {
                        this.props.options.map((item, index) => {
                            return <option key={index}>{item.name}</option>
                        })
                    }

                </select>
                <span className='input-bar'></span>
                <span className='input-error'>Error message.</span>
            </div>
            
        );
    }
}

InputSelect.propTypes = {
    placeHolder: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array,
};

export default InputSelect;