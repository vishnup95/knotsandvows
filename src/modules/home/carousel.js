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
        src: 't1.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Though everything was in place, getting the right venue for my wedding was proving to be a huge task. SevenVows helped me find that perfect venue at the right price. I love the fact that I could select only the specific service that I needed and not go for the entire package.',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Haritha K',
    }, {
        src: 't2.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'I really thought that I can plan my own wedding with help of my friends & family. After talking to SevenVows I realized the amount of work & stress the planning would be. Their services & price made it a no brainer for me to pick them as my wedding planner. ',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Rajesh G',
    }, {
        src: 't3.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'SevenVows really helped me turn my dreams into reality. From the decor to the food and from the photographer to the mehendi artist, everything was top-notch to say the least.',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Akhila V',
    }, {
        src: 't4.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'I thank my friend for recommending SevenVows. I was planning a simple wedding but with a lot of warmth. With the help of SevenVows, I achieved exactly that. ',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Nishanth B',
    }
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
                        <div className={styles.carouselImage} style={{ backgroundImage: `url(${imagePath(item.src)})` }}></div>
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