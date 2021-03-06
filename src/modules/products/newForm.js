import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions';
import { 
    Button,
    Dropdown, DropdownMenu, DropdownToggle,
  } from 'reactstrap';

import styles from './products.scss';
import { getId, hyphonatedString } from '../../utils/utilities';
import { imagePath, detectMobile } from '../../utils/assetUtils';

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
        this.props.onSelectionChange(value, this.props.name);
    }
  
    render() {
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()} className={styles.multiDropdown}>
          <DropdownToggle className={styles.dropHeading}
            tag="span"
            onClick={() => this.toggle()}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}>
            <span className={styles.placeholder}>{this.props.placeholder}</span>
            {this.state.selectedItem ? this.state.selectedItem.name : ""} 
            </DropdownToggle>
          <DropdownMenu className={styles.dropMenu}>

            {this.props.options.map((item, index) => {
                let value = this.props.name === "category" ? hyphonatedString(item.name, item.category_id) : item.id;
                let selectedValue = this.props.name === "category" ? hyphonatedString(this.state.selectedItem.name, this.state.selectedItem.category_id) : this.state.selectedItem.id; 
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
    onSelectionChange: PropTypes.func
}

class FormComponent extends Component { 
    constructor(props) {
        super(props);
        this.state = { category: this.props.selectedCategory};
    } 

    componentDidMount(){
        selectedFilters = {};
    }

    onChange = (value, filterName) => {
        if (filterName === 'category') {
            this.props.dispatch(actions.fetchFilters(value, detectMobile() ? false : true));
            this.props.dispatch(actions.fetchOtherCategories(value));
            this.setState({category: value});
            selectedFilters = {};
        } else {
            if (value !== '') {
                selectedFilters[filterName] = value;
            } else {
                delete selectedFilters[filterName];
            }
        }

        if (!detectMobile()) {
            console.log('this.state ', this.state.category)
            this.props.filterSearch(selectedFilters, filterName === 'category' ? value : this.state.category);
        }
    }

    toggleForm = () => {
        if (this.props.toggle){
            this.props.toggle();
        }
    }

    render() {
        let indexOfSelectedCategory = this.props.categories.findIndex(category => 
            category.category_id == getId(this.props.selectedCategory));
            if(!this.props.filters){
                return <div></div>
            }
            
        return(
            
            <div className={`${styles.formContainer} pt-4 pb-4`} onClick={() => this.toggleForm()} aria-hidden>
                <div className={styles.dropContainer} onClick={(event) => event.stopPropagation()} aria-hidden> 
                    <img className={styles.closeBtn} src={imagePath('close-blank.svg')} alt="close button" aria-hidden onClick={() => this.toggleForm()}/>
                    <h5 className="d-block d-sm-none">Search your vendors</h5>
                    <DropdownComponent key="categories" placeholder="i am looking for" name="category" dispatch={this.props.dispatch}
                        options={this.props.categories} selectedItem={this.props.categories[indexOfSelectedCategory]}
                        onSelectionChange={this.onChange}/> 
                    {
                        this.props.filters.map((filter) => { 
                            let selectedItem = filter.values[0];
                            return(
                                <DropdownComponent key={filter.name} placeholder={filter.display_name} name={filter.name} onSelectionChange={this.onChange}
                                dispatch={this.props.dispatch} options={filter.values} selectedItem={selectedItem}/>
                            );
                        })
                    }  

                    <div className="text-center mt-5 d-block d-sm-none">
                        <Button color="danger" className="primary-button" onClick={() => this.props.filterSearch(selectedFilters, this.state.category)}>
                            Search
                        </Button>
                    </div>              
                </div>
            </div>
        );
    }
}

FormComponent.propTypes = {
    filters: PropTypes.array,
    categories: PropTypes.array,
    selectedCategory: PropTypes.string,
    filterSearch: PropTypes.func,
    dispatch: PropTypes.func,
    toggle: PropTypes.func
}

export default connect(
    mapStateToProps,
)(FormComponent);