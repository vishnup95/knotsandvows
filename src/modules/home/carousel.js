import React, { Component } from 'react';
import { imagePath } from '../../utils/assetUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './home.scss';

import {
    Carousel,
    CarouselItem,
    CarouselIndicators
} from 'reactstrap';

// const mapStateToProps = state => ({});  

// const mapDispatchToProps = dispatch => ({
//     dispatch
// });
const items = [
    {
        src: 'testimonial1.png',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry`s standard dummy text ever since.',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'John Smith, Director',
    }, {
        src: 'testimonial2.png',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry`s standard dummy text ever since.',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'John Smith, Director',
    },
];

class CarouselComponent extends Component {
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
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const slides = items.map((item, index) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={index}>
                    <div className={styles.carouselItem}>
                        <div className={styles.carousalImage} style={{ backgroundImage: `url(${imagePath(item.src)})` }}></div>
                        <div className={styles.carouselContent}>
                            <img src={imagePath('quote.svg')} alt="quote" />
                            <p className={`${styles.carouselText} ${this.props.isZoom ? styles.carouselTextLarge : ''}`}>{item.shortDescription}</p>
                            <p className={styles.author}>{item.descAuthor}</p>
                        </div>
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
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}

            </Carousel>
            </div>
        );
    }
}
CarouselComponent.propTypes = {
    isZoom: PropTypes.bool,
};

export default connect(
)(CarouselComponent);