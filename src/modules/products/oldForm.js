import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    Button,
    Dropdown, DropdownMenu, DropdownToggle,
  } from 'reactstrap';

import styles from './products.scss';

const selectedFilters = {};

const mapStateToProps = state => ({
    categories: state.home.categories,
});

export class DropdownComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dropdownOpen: false,
        checkBoxes: Array(this.props.options.length).fill(false),
        category: props.selectedCategory
      };

      if (!selectedFilters[props.name]) {
          selectedFilters[props.name] = [];
      } 

      if (this.props.name === 'category') {
          let indexOfSelectedCategory = this.props.options.findIndex(category => category.name.toLowerCase() === props.selectedCategory.toLowerCase());
          this.state.checkBoxes[indexOfSelectedCategory] = true;
      }
    }
  
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    handleSelection(index, id) {
        if (this.props.selectMultiple) {
            this.handleCheckBox(index, id);
        } else {
            const checkboxes = this.state.checkBoxes.slice().fill(false);
            checkboxes[index] = true;
            this.setState({checkBoxes: checkboxes, category: this.props.options[index].name});
        }
    }

    handleCheckBox(index, id) {
        const checkboxes = this.state.checkBoxes.slice();
        checkboxes[index] = !checkboxes[index];
        this.setState({checkBoxes: checkboxes});

        if (checkboxes[index]) {
            selectedFilters[this.props.name].push(id);
        } else {
            selectedFilters[this.props.name].splice( selectedFilters[this.props.name].indexOf(id), 1 );
        }
    }
  
    render() {
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()} className={styles.multiDropdown}>
          <DropdownToggle className={this.props.name==="category" ?styles.categoryHeading : styles.dropHeading}
            tag="span"
            onClick={() => this.toggle()}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            {this.props.name==="category" ? this.state.category : this.props.placeholder}
          </DropdownToggle>
          <DropdownMenu className="no-padding no-margin">

            {this.props.options.map((item, index) => {
                return(
                    <div key={index} onClick={() => this.handleSelection(index, this.props.name==="category" ? item.serviceId : item.id)} aria-hidden role="menuitem" 
                        className={`${styles.dropMenu} ${this.state.checkBoxes[index] ? styles.selected : ''}`}>

                        {this.props.selectMultiple ?  <input type="checkbox" 
                            checked={this.state.checkBoxes[index]} 
                            onChange={() => {}}
                            name="vehicle1" 
                            value="Bike"/> : <span></span>}
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
    selectMultiple: PropTypes.bool,
    name: PropTypes.string,
    selectedCategory: PropTypes.string
}

class FormComponent extends Component {   
    render() {
        return(
            <div className={`${styles.formContainer} pt-4 pb-4`}>
                <div className={styles.dropContainer}> 
                    <DropdownComponent key="categories" placeholder="Looking for" name="category"
                        options={this.props.categories} selectMultiple={false} selectedCategory={this.props.selectedCategory}/> 
                    {
                        this.props.filters.map((filter) => {
                            return(
                                <DropdownComponent key={filter.name} placeholder={filter.display_name} name={filter.name}
                                    options={filter.values} selectMultiple={filter.is_mutliple_selection}/>
                            );
                        })
                    }                
                </div>
                <Button color="danger" className={styles.searchButton} name="search button"></Button>   
            </div>
        );
    }
}

FormComponent.propTypes = {
    filters: PropTypes.array,
    categories: PropTypes.array,
    selectedCategory: PropTypes.string
}

export default connect(
    mapStateToProps,
)(FormComponent);