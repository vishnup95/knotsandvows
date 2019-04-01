import React, { Component } from "react";
import Slider from "react-slick";
// import { imagePath } from '../../utils/assetUtils';
import styles from './horizontalSlider.scss';
import PropTypes from 'prop-types';
import CategoryCard from '../../components/Card/cardCategory';
import { Col } from 'reactstrap';

const SampleNextArrow = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
        <button
            className={`${className} ${styles.hButton}`}
            style={{
                ...style,
                display: "block",
                background: 'url("/images/dropicon_home.svg") no-repeat',
                backgroundSize: '50px',
                transform: 'rotate(270deg)',
                top: '30%',
                right: '-16px'
            }}
            onClick={onClick}
        >Next</button>
    );
}

const SamplePrevArrow = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
        <button
            className={className}
            style={{
                ...style,
                display: "block",
                background: 'url("/images/dropicon_home.svg") no-repeat',
                transform: 'rotate(90deg)',
                backgroundSize: '50px',
                zIndex: '10',
                top: '30%',
                left: '-16px'
            }}
            onClick={onClick}
        >Prev</button>
    );
}
const SampleNextArrowSmall = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
        <button
            className={`${className} ${styles.hButton}`}
            style={{
                ...style,
                display: "block",
                background: 'url("/images/arrow-small.png") no-repeat',
                backgroundSize: 'contain',
                top: '50%',
                right: '-16px',
                width: '20px',
                height: '20px',
                opacity: '.7'
            }}
            onClick={onClick}
        >Next</button>
    );
}

const SamplePrevArrowSmall = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
        <button
            className={className}
            style={{
                ...style,
                display: "block",
                background: 'url("/images/arrow-small.png") no-repeat',
                transform: 'rotate(-180deg)',
                backgroundSize: 'contain',
                zIndex: '10',
                top: '30%',
                left: '-16px',
                width: '20px',
                height: '20px',
                opacity: '.7'
            }}
            onClick={onClick}
        >Prev</button>
    );
}


export default class HorizontalSlider extends Component {
    
    state = {selectedCategoryIndex: 0};

    handleCategoryChange = (selectedCategoryIndex) => {
        this.setState({selectedCategoryIndex});
        this.props.buttonAction(selectedCategoryIndex);
    }
    
    render() {
        var settingsSmall = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrowSmall />,
            prevArrow: <SamplePrevArrowSmall />,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        };
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        };
        
        return (this.props.type === 'small' &&
            <div className={styles.multiContainer}>
                <Slider {...settingsSmall}>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <div key={index} className={styles.sliderItem}>
                                    <div className={styles.sliderWrap}>
                                        {/* <img className={styles.vendorImage} src={item.thumb_image} alt="Icon" /> */}
                                        <div className={`${styles.categoryName} ${index === this.state.selectedCategoryIndex ?  styles.selectedCategory : ''}`} 
                                            aria-hidden onClick={() => this.handleCategoryChange(index)}> 
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </Slider>
            </div> || <div>
                <Slider {...settings}>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <Col key={index}>
                                    <CategoryCard data={item} category={this.props.category} type={'carousel'} id={index}/>
                                </Col>
                            );
                        })
                    }
                    <Col>
                        <div aria-hidden className={styles.addNew} onClick={() => this.props.buttonAction(this.props.category)}><span>View All <br/> Vendors</span></div>
                    </Col>
                </Slider>
            </div>
        );
    }
}
HorizontalSlider.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string,
    category: PropTypes.string,
    buttonAction: PropTypes.func
};0.