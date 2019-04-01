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
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.filters !== this.props.filters) {
            
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
            <div className={styles.mobileFormContainer}>
                <h5>Search your vendors</h5>
                <InputSelect placeHolder="I am looking for" id="category" options={this.props.categories} 
                selectedItem={this.props.selectedCategory} onCategoryChange={this.changeCategory}/>
                {
                    this.props.filters.map((filter, index) => { 
                        return(
                            <InputSelect key={index} placeHolder={filter.display_name} id={`selectEvent${filter.name}`} 
                                options={filter.values} selectedItem={filter.values[0].id}/>
                        );
                    })
                }
                <div className="text-center">
                    <Button color="danger" className="primary-button">Search</Button>
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
    dispatch: PropTypes.func
}

export default connect(
    mapStateToProps,
)(MobileForm);