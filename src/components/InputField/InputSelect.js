import React, { Component } from 'react';
import {
    Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../modules/products/actions';

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class InputSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedItem: this.props.selectedItem};
    }

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

    handleChange(e) {
        this.setState({selectedItem: e.target.value});

        if (this.props.id === 'category') {
            this.props.dispatch(actions.fetchFilters(e.target.value));
            this.props.onCategoryChange(e.target.value);
        } 
        else {
            this.props.onFilterChange(this.props.id, e.target.value);
        }
    }

    render() {
        return (
            <div className='input-field floating-label'>
                <Label for="exampleSelect" className='input-placeholder'>{this.props.placeHolder}</Label>
                <select name="select" id={this.props.id} className='input-box' 
                value={this.state.selectedItem} onFocus={() =>  this.handleFocus(event.target)} 
                onBlur={() =>  this.handleBlur(event.target)} 
                onInput={() =>  this.handleInput(event.target)} onChange={(event) => this.handleChange(event)}>
                    {
                        this.props.options.map((item, index) => {
                            let value = this.props.id === 'category' ? item.page_name : item.id;
                            return <option key={index} value={value}>{item.name}</option>
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
    selectedItem: PropTypes.any,
    onCategoryChange: PropTypes.func,
    onFilterChange: PropTypes.func,
    dispatch: PropTypes.func
};
export default connect(
    mapDispatchToProps
)(InputSelect);
