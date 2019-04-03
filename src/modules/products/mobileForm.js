import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as actions from './actions';
import { Button } from 'reactstrap';

import styles from './products.scss';
import InputSelect from '../../components/InputField/InputSelect';

const mapStateToProps = state => ({
    categories: state.home.categories,
});

let selectedFilters = {};

class MobileForm extends Component { 
    constructor(props) {
        super(props);
        this.state = { category: this.props.selectedCategory};
        this.props.filters.map(filter => 
            {   if(filter.values[0].id !== -1) {
                    filter.values.unshift({name: 'All', id: -1})
                }
            }
        );
    } 

    changeCategory = (category) => {
        this.setState({category});
        selectedFilters = {};
    }

    setFilters = (name, value) => {
        if (value !== "-1") {
            selectedFilters[name] = value;
        } else {
            delete selectedFilters[name];
        }
    }

    componentWillReceiveProps(nextProps) {  
        if(nextProps.selectedCategory !== this.state.selectedCategory) { 
            nextProps.filters.map(filter => 
                {
                    if(filter.values[0].id !== -1) {
                        filter.values.unshift({name: 'All', id: -1})
                    }
                }
            );
        }
    }

    render() {
        return(
            <div className={styles.mobileFormOverlay} onClick={() => this.props.toggle()} aria-hidden>
                <div className={styles.mobileFormContainer} onClick={(event) => event.stopPropagation()} aria-hidden>
                    <h5>Search your vendors</h5>
                    <InputSelect placeHolder="I am looking for" id="category" options={this.props.categories} 
                    selectedItem={this.props.selectedCategory} onCategoryChange={this.changeCategory}/>
                    {
                        this.props.filters.map((filter, index) => { 
                            return(
                                <InputSelect key={index} placeHolder={filter.display_name} id={filter.name} 
                                    options={filter.values} selectedItem={filter.values[0].id} onFilterChange={this.setFilters}/>
                            );
                        })
                    }
                    <div className="text-center">
                        <Button color="danger" className="primary-button" onClick={() => this.props.filterSearch(selectedFilters, this.state.category)}>
                            Search
                        </Button>
                    </div>
                </div>
            </div>  
        );
    }
}

MobileForm.propTypes = {
    filters: PropTypes.array,
    categories: PropTypes.array,
    selectedCategory: PropTypes.string,
    filterSearch: PropTypes.func,
    dispatch: PropTypes.func,
    toggle: PropTypes.func
}

export default connect(
    mapStateToProps,
)(MobileForm);