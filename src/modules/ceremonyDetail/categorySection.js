import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import styles from './CeremonyDetail.scss';
import { push } from 'connected-react-router';
import { hyphonatedString } from '../../utils/utilities';

class CategorySection extends Component {
    handleViewAllClick = (category) => {
        this.navigateTo(`/categories/${category}`)
    }

    navigateTo(route) {
        this.props.dispatch(push(route));
    }

    render() {
        return(
            <div className="mb-3">
                <Row>
                    <Col>
                        <h3>{this.props.category.name}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col className="no-padding">
                        <HorizontalSlider data={this.props.category.vendors} categoryName={this.props.category.name} category={hyphonatedString(this.props.category.name , this.props.category.category_id)} buttonAction={this.handleViewAllClick} />
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <p className={styles.viewAll} onClick={() => this.handleViewAllClick(hyphonatedString(this.props.category.name , this.props.category.category_id))} aria-hidden >View All</p>
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