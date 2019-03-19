import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import styles from './CeremonyDetail.scss';
import { push } from 'connected-react-router';

class CategorySection extends Component {
    handleViewAllClick = (category) => {
        this.navigateTo(`/categories/${category}`)
    }

    navigateTo(route) {
        this.props.dispatch(push(route));
    }

    render() {
        return(
            <div>
                <Row>
                    <Col>
                        <h3>{this.props.category.name}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col className="no-padding">
                        <HorizontalSlider data={this.props.category.vendors} category={this.props.category.page_name} buttonAction={this.handleViewAllClick} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p className={styles.viewAll} onClick={() => this.handleViewAllClick(this.props.category.page_name)} aria-hidden >View All</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

CategorySection.propTypes = {
    category: PropTypes.object,
    dispatch: PropTypes.func
}

export default CategorySection;