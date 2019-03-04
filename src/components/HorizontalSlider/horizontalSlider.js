import React, { Component } from "react";
import Slider from "react-slick";
// import { imagePath } from '../../utils/assetUtils';
import styles from './horizontalSlider.scss';
import PropTypes from 'prop-types';
import CategoryCard from '../../components/Card/cardCategory';
import { Col } from 'reactstrap';



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
                        <div className={styles.addNew}> Add new</div>
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