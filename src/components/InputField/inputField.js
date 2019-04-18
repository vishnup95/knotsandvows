import React, { Component } from 'react';
import {
    Label,
    UncontrolledTooltip
} from 'reactstrap';
import PropTypes from 'prop-types';

const defaultPatterns = {
    email: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
    password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z][A-Za-z0-9!@#$%^&*()_+]{5,19}$',
    text: '[A-Za-z0-9_ ]+',
    tel: '[0-9]{10}'
}

class InputField extends Component { 
    state = {errorMessage: '', value: ''};  
    
    componentDidMount() {
        if (this.props.value) {
            this.setState({value: this.props.value})
            this.handleFocus(document.getElementById(this.props.id));
        } 
        if (this.props.type == "date"){
            var today = new Date();
            let day = today.getDate();
            let month = today.getMonth()+1;//January is 0
            let year = today.getFullYear();
            if(day<10){
                    day='0'+day
            } 
            if(month<10){
                month='0'+month
            }
            this.minDate = year+'-'+month+'-'+day;
            this.maxDate = (year+4)+'-'+month+'-'+day;
        }
    }

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
        this.setState({value: inputBox.value});
        if(inputBox.value.length > 0) {
            inputBox.parentNode.classList.add('is-dirty');
        } else {
            inputBox.parentNode.classList.remove('is-dirty');
        }
    }

    validateInput(inputBox) {
        if(inputBox.value.length == 0) {
            if(this.props.required) {
                inputBox.parentNode.classList.add('error'); 
                this.setState({errorMessage: 'Required Field'});
                return false;
            } else {
                inputBox.parentNode.classList.remove('error'); 
                return true;
            }

        } else if(inputBox.validity.valid) {
            inputBox.parentNode.classList.remove('error');
            return true;

        } else {
            if (this.props.phoneCheck) { 
                if (/^\d{10}$/.test(inputBox.value)) {
                    inputBox.parentNode.classList.remove('error');
                    return true;
                } else {
                    this.setState({errorMessage: `Please enter a valid ${this.props.placeHolder}`});
                    inputBox.parentNode.classList.add('error');
                    return false;
                }
            }else{
                this.setState({errorMessage: `Please enter a valid ${this.props.placeHolder}`});
                inputBox.parentNode.classList.add('error');
                return false;
            }
        }
    }

    // togglePasswordMask(maskToggleIcon) {
    //     var inputWrapper = maskToggleIcon.parentNode,
    //         inputBox = inputWrapper.firstElementChild;
        
    //     if(inputWrapper.classList.contains('password-unmasked')) {
    //         inputBox.setAttribute('type', 'password');
    //         inputBox.setAttribute('pattern', defaultPatterns.password);
    //         inputWrapper.classList.remove('password-unmasked');
    //     } else {
    //         inputBox.setAttribute('type', 'text');
    //         inputWrapper.classList.add('password-unmasked');
    //     }
    // }

    render() {

        let title = null;
        if (this.props.type == "password" && !this.props.disabled) {
            title = "Use at least 6 characters including at least 1 letter, 1 capital letter and 1 number";
        }
        
        return (
            <div className='input-field floating-label'>
                {
                    this.props.id === 'comments' ? 
                    <textarea className='input-box' rows="1"
                        type={this.props.type} id={this.props.id} required={this.props.required}
                        pattern={this.props.pattern || defaultPatterns[this.props.type]}
                        onFocus={() =>  this.handleFocus(event.target)} 
                        onBlur={() =>  this.handleBlur(event.target)} 
                        onInput={() =>  this.handleInput(event.target)} 
                        onChange={() => this.props.onChange(event)}
                        disabled={this.props.disabled}
                        value={this.state.value}
                    ></textarea> : 

                    <input className='input-box' 
                        type={this.props.type} id={this.props.id} required={this.props.required}
                        pattern={this.props.pattern || defaultPatterns[this.props.type]}
                        onFocus={() =>  this.handleFocus(event.target)} 
                        onBlur={() =>  this.handleBlur(event.target)} 
                        onInput={() =>  this.handleInput(event.target)} 
                        onChange={() => this.props.onChange(event)}
                        disabled={this.props.disabled}
                        value={this.state.value}
                        title={title}
                        min={this.minDate}
                        max={this.maxDate}
                    />
                }
              
                <Label className={`${this.props.type === 'date' ? 'date-placeholder' : 'input-placeholder'} ${this.props.id === 'comments' ? 'input-placeholder' : ''}`} 
                    htmlFor={this.props.id}>
                  {this.props.placeHolder}
                </Label>
              <span className='input-bar'></span>
              <span className='input-error'>{this.state.errorMessage}</span>
              {/* {this.props.type === 'show-mask-password' && <span className='input-password-mask' aria-hidden onClick={() => this.togglePasswordMask(event.target)}></span>} */}
              {this.props.type === 'password' && this.props.disabled == false && <div><span className='input-password-mask'></span>
              <UncontrolledTooltip placement="right" target={this.props.id}>
                {title}
              </UncontrolledTooltip></div>}
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
    pattern: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    phoneCheck: PropTypes.bool
};

InputField.defaultProps = {
    required: true,
    disabled: false,
    value:'',
    phoneCheck: false
}

export default InputField;
