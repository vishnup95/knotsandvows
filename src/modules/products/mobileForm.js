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
        this.props.filters.map(filter => filter.values.unshift({name: 'All', id: ''}))
    } 

    componentWillReceiveProps(nextProps) {
        if(nextProps.filters !== this.props.filters) {
            nextProps.filters.map(filter => filter.values.unshift({name: 'All', id: ''}))
        }
    }

    render() {
        return(
            <div className={styles.mobileFormContainer}>
                <h5>Search your vendors</h5>
                <InputSelect placeHolder="I am looking for" id="category" options={this.props.categories}/>
                {
                    this.props.filters.map((filter, index) => { 
                        return(
                            <InputSelect key={index} placeHolder={filter.display_name} id={`selectEvent${filter.name}`} options={filter.values}/>
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