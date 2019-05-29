import React, { Component } from 'react';
import { imagePath } from '../../utils/assetUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './simpleCarousel.scss';

import {
    Carousel,
    CarouselItem,
    CarouselIndicators
} from 'reactstrap';


class SimpleCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.data.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.data.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const slides = this.props.data.map((item, index) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={index}>
                    <div className={styles.carouselItem}>
                        <div className={styles.carouselImage} style={{ backgroundImage: `url(${imagePath(item)})` }}></div>
                    </div>
                </CarouselItem>
            );
        });

        return (
            <div className={styles.carousel}>
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}>
                {this.props.isIndicator && <CarouselIndicators items={this.props.data} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> }
                {slides}

            </Carousel>
            </div>
        );
    }
}
SimpleCarousel.propTypes = {
    isZoom: PropTypes.bool,
    data: PropTypes.array,
    isIndicator: PropTypes.bool
};

export default connect(
)(SimpleCarousel);