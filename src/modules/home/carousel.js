import React, { Component } from 'react';
import { imagePath } from '../../utils/assetUtils';

import styles from './home.scss';

import {
    Carousel,
    CarouselItem,
    CarouselIndicators
} from 'reactstrap';

const items = [
    {
        src: 'carousel_1.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Great food is what makes your ceremony memorable and you happy! Check out the menus and services offered by our vendors and choose the ones that match your taste',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Name',
    },{
        src: 'carousel_1.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Great food is what makes your ceremony memorable and you happy! Check out the menus and services offered by our vendors and choose the ones that match your taste',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Name',
    },{
        src: 'carousel_1.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Great food is what makes your ceremony memorable and you happy! Check out the menus and services offered by our vendors and choose the ones that match your taste',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Name',
    },{
        src: 'carousel_1.jpg',
        altText: 'Slide 1',
        caption: 'Paneer Pudina Tikka and Mutton Sheesh Kabab?',
        shortDescription: 'Great food is what makes your ceremony memorable and you happy! Check out the menus and services offered by our vendors and choose the ones that match your taste',
        buttonText: 'Browse caterers',
        pathToRedirect: 'wishlist',
        descAuthor: 'Name',
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
                    key={index} className={styles.carouselItem}>
                    <div className={styles.carousalImage} style={{ backgroundImage: `url(${imagePath(item.src)})` }}></div>
                    <div className={styles.carouselContent}>
                        <img  src={imagePath('quote.svg')} alt="quote" />
                        <p className={styles.carouselText}>{item.shortDescription}</p>
                        <p className={styles.author}>{item.descAuthor}</p>
                    </div>

                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}

            </Carousel>
        );
    }
}

export default CarouselComponent;