import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from './actions';
import { 
    Button,
    FormGroup, Label, Input
  } from 'reactstrap';

import styles from './products.scss';

const mapStateToProps = state => ({
    categories: state.home.categories,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

let selectedFilters = {};

export class DropdownComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedItem: this.props.selectedItem};
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedItem !== this.props.selectedItem) {
            this.setState({selectedItem: nextProps.selectedItem});
        }
    }

    handleChange(e) {
        this.setState({selectedItem: e.target.value});

        if (this.props.name === 'category') {
            this.props.dispatch(actions.fetchFilters(e.target.value));
            this.props.onCategoryChange(e.target.value);
            selectedFilters = {};
        } else {
            if (e.target.value) {
                selectedFilters[this.props.name] = e.target.value;
            } else {
                delete selectedFilters[this.props.name];
            }
        }
    }

    render() {
      return (
        <FormGroup className={styles.selectContainer}>
            <Label for="exampleSelect" className={styles.label}>{this.props.placeholder}</Label>
            <Input type="select" name="select" id="exampleSelect"  className={styles.select}
                value={this.state.selectedItem} onChange={(event) => this.handleChange(event)}>
                {
                    this.props.options.map((item, index) => {
                        let value = this.props.name === 'category' ? item.page_name : item.id;
                        return <option key={index} value={value}>{item.name}</option>
                    })
                }
            </Input>   
        </FormGroup>   
      );
    }
}

DropdownComponent.propTypes = {
    options: PropTypes.array,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    selectedItem: PropTypes.any,
    dispatch: PropTypes.func,
    onCategoryChange: PropTypes.func
}

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { category: this.props.selectedCategory};
        this.props.filters.map(filter => filter.values.unshift({name: 'All', id: ''}));
    } 

    changeCategory = (category) => {
        this.setState({category});
    }

    render() {
        return(
            <div className={`${styles.formContainer} pt-4 pb-4`}>
                <div className={styles.dropContainer}> 
                    <DropdownComponent placeholder="i am looking for" name="category" options={this.props.categories} 
                    selectedItem={this.props.selectedCategory} dispatch={this.props.dispatch} onCategoryChange={this.changeCategory}/>
                    {
                        this.props.filters.map((filter, index) => {
                            return <DropdownComponent key={index} placeholder={filter.display_name} name={filter.name} options={filter.values} selectedItem={filter.values[0].id}/>
                        })
                    }         
                </div>
                <Button className={styles.searchButton} name="search button" onClick={() => this.props.filterSearch(selectedFilters, this.state.category)}></Button>   
            </div>
        );
    }
}

FormComponent.propTypes = {
    filters: PropTypes.array,
    categories: PropTypes.array,
    selectedCategory: PropTypes.string,
    dispatch: PropTypes.func,
    filterSearch: PropTypes.func
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent);