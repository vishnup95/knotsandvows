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


export default class HorizontalSlider extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (this.props.type === 'small' &&
            <div className={styles.multiContainer}>
                <Slider {...settings}>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <div key={index} className={styles.sliderItem}>
                                    <div className={styles.sliderWrap}>
                                        <img className={styles.vendorImage} src={item.thumb_image} alt="Icon" />
                                        <div className={styles.categoryName}>{item.page_name}</div>
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
                                    <CategoryCard data={item} />
                                </Col>
                            );
                        })
                    }
                    <Col>
                        <div className={styles.addNew}>View All</div>
                    </Col>
                </Slider>
            </div>
        );
    }
}
HorizontalSlider.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string
};