import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions';
import { 
    Button,
    Dropdown, DropdownMenu, DropdownToggle,
  } from 'reactstrap';

import styles from './products.scss';

let selectedFilters = {};

const mapStateToProps = state => ({
    categories: state.home.categories,
});

export class DropdownComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dropdownOpen: false,
        selectedItem: this.props.selectedItem
      };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedItem !== this.props.selectedItem) {
            this.setState({selectedItem: nextProps.selectedItem});
        }
    }
  
    toggle() {
      this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    handleSelection(index, value) {
        this.toggle();
        this.setState({selectedItem: this.props.options[index]});

        if (this.props.name === 'category') {
            this.props.dispatch(actions.fetchFilters(value, false));
            this.props.onCategoryChange(value);
            selectedFilters = {};
        } else {
            if (value) {
                selectedFilters[this.props.name] = value;
            } else {
                delete selectedFilters[this.props.name];
            }
        }
    }
  
    render() {
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()} className={styles.multiDropdown}>
            <span className={styles.placeholder}>{this.props.placeholder}</span>
          <DropdownToggle className={styles.dropHeading}
            tag="span"
            onClick={() => this.toggle()}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}>
            {this.state.selectedItem.name} 
            </DropdownToggle>
          <DropdownMenu className={styles.dropMenu}>

            {this.props.options.map((item, index) => {
                let value = this.props.name === "category" ? item.page_name : item.id;
                let selectedValue = this.props.name === "category" ? this.state.selectedItem.page_name : this.state.selectedItem.id; 
                return(
                    <div  key={index} className={`${styles.dropItem} ${value === selectedValue ? styles.selectedItem : ''}`}
                    onClick={() => this.handleSelection(index, value)} aria-hidden >
                        <span>{item.name}</span> 
                    </div>
                );
            })}
          </DropdownMenu>
        </Dropdown>
      );
    }
}

DropdownComponent.propTypes = {
    options: PropTypes.array,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    selectedItem: PropTypes.any,
    selectedCategory: PropTypes.string,
    dispatch: PropTypes.func,
    onCategoryChange: PropTypes.func
}

class FormComponent extends Component { 
    constructor(props) {
        super(props);
        this.state = { category: this.props.selectedCategory};
        this.props.filters.map(filter => filter.values.unshift({name: 'All', id: ''}))
    } 

    componentWillReceiveProps(nextProps) {
        if(nextProps.filters !== this.props.filters) {
            nextProps.filters.map(filter => filter.values.unshift({name: 'All', id: ''}))
        }
    }

    changeCategory = (category) => {
        this.setState({category});
    }

    render() {
        let indexOfSelectedCategory = this.props.categories.findIndex(category => 
            category.page_name.toLowerCase() === this.props.selectedCategory.toLowerCase());
        return(
            
            <div className={`${styles.formContainer} pt-4 pb-4`}>
                <div className={styles.dropContainer}> 
                    <DropdownComponent key="categories" placeholder="Looking for" name="category" dispatch={this.props.dispatch}
                        options={this.props.categories} selectedItem={this.props.categories[indexOfSelectedCategory]}
                        onCategoryChange={this.changeCategory}/> 
                    {
                        this.props.filters.map((filter) => { 
                            return(
                                <DropdownComponent key={filter.name} placeholder={filter.display_name} name={filter.name}
                                dispatch={this.props.dispatch} options={filter.values} selectedItem={filter.values[0]}/>
                            );
                        })
                    }                
                </div>
                <Button color="danger" className={styles.searchButton} name="search button" onClick={() => this.props.filterSearch(selectedFilters, this.state.category)}></Button>   
            </div>
        );
    }
}

FormComponent.propTypes = {
    filters: PropTypes.array,
    categories: PropTypes.array,
    selectedCategory: PropTypes.string,
    filterSearch: PropTypes.func,
    dispatch: PropTypes.func
}

export default connect(
    mapStateToProps,
)(FormComponent);