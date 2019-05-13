import React, { Component } from "react";
import Slider from "react-slick";
import { imagePath } from '../../utils/assetUtils';
import { hyphonatedString } from '../../utils/utilities';
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
                background: `url(${imagePath('dropicon_home.svg')}) no-repeat`,
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
                background: `url(${imagePath('dropicon_home.svg')}) no-repeat`,
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
                background: `url(${imagePath('arrow-small.png')}) no-repeat`,
                backgroundSize: 'contain',
                top: '50%',
                right: '-16px',
                width: '12px',
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
                background: `url(${imagePath('arrow-small.png')}) no-repeat`,
                transform: 'rotate(-180deg)',
                backgroundSize: 'contain',
                zIndex: '10',
                top: '29%',
                left: '-16px',
                width: '12px',
                height: '20px',
                opacity: '.7'
            }}
            onClick={onClick}
        >Prev</button>
    );
}
const SampleNextArrowBasic = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
        <button
            className={`${className} ${styles.hButton}`}
            style={{
                ...style,
                display: "block",
                background: `url(${imagePath('arrow-small.png')}) no-repeat`,
                backgroundSize: 'contain',
                top: '50%',
                right: '-15px',
                width: '20px',
                height: '20px',
                backgroundColor:'#f2f2f2'
            }}
            onClick={onClick}
        >Next</button>
    );
}

const SamplePrevArrowBasic = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
        <button
            className={className}
            style={{
                ...style,
                display: "block",
                background: `url(${imagePath('arrow-small.png')}) no-repeat`,
                transform: 'rotate(-180deg)',
                backgroundSize: 'contain',
                zIndex: '10',
                top: '15%',
                left: '-15px',
                width: '20px',
                height: '20px',
                backgroundColor:'#f2f2f2'
            }}
            onClick={onClick}
        >Prev</button>
    );
}

export default class HorizontalSlider extends Component {

    state = { selectedCategoryIndex: 0 };

    handleCategoryChange = (selectedCategoryIndex) => {
        this.setState({ selectedCategoryIndex });
        this.props.buttonAction(selectedCategoryIndex);
    }

    render() {
        var settingsBasic = {
            dots: false,
            infinite: false,
            centerMode: false,
            variableWidth: true,
            nextArrow: <SampleNextArrowBasic />,
            prevArrow: <SamplePrevArrowBasic />,
            initialSlide: 0,
        };
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
                        className: "slider variable-width",
                        dots: false,
                        infinite: true,
                        centerMode: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        variableWidth: true
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
                        slidesToShow: 2.5,
                        slidesToScroll: 2.5,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2.5,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        nextArrow: null,
                        prevArrow: null,
                        slidesToShow: 2.5,
                        slidesToScroll: 2
                    }
                }
            ]
        };
        var ceremonySettings = {
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
                    breakpoint: 1023,
                    settings: {
                        nextArrow: null,
                        prevArrow: null,
                        slidesToShow: 2.5,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        nextArrow: null,
                        prevArrow: null,
                        slidesToShow: 1.5,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        if (this.props.type === 'small') {
            return (
                <div className={styles.multiContainer}>
                    <Slider {...settingsSmall}>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <div key={index} className={styles.sliderItem}>
                                        <div className={styles.sliderWrap}>
                                            {/* <img className={styles.vendorImage} src={item.thumb_image} alt="Icon" /> */}
                                            <div className={`${styles.categoryName} ${index === this.state.selectedCategoryIndex ? styles.selectedCategory : ''}`}
                                                aria-hidden onClick={() => this.handleCategoryChange(index)}>
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Slider>
                </div>
            );
        } else if (this.props.type === 'basic') {
            return (
                <div>
                    <Slider {...settingsBasic}>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <div key={index} className={styles.sliderItemBasic} onClick={() => this.props.buttonAction(item, index)} aria-hidden> 
                                        <div className={styles.sliderWrap}>
                                            {item.display_name}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Slider>
                </div>
            );
        } else if (this.props.type === 'ceremony') {
            return (
                <div>
                    {
                        styles &&
                    <Slider {...ceremonySettings}>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <Col key={index}>
                                    {
                                        styles.ceremonyCard &&
                                        <a href={`/ceremonies/${hyphonatedString(item.ceremony_name, item.ceremony_id)}`} onClick={(event) => this.props.onSelect(item, event)}>
                                        <div className={styles.ceremonyCard}>
                                        {
                                            styles.ceremonyIg && 
                                            <img className={styles.ceremonyIg} src={item.thumb_image} alt={item.ceremony_name}
                                                onError={(e) => { e.target.onerror = null; e.target.src = imagePath('card_2_1.jpg') }}></img>
                                        }
                                            
                                            <h3>{item.ceremony_name}</h3>
                                            
                                        </div>
                                        </a>
                                    }

                                    </Col>
                                );
                            })
                        }
                    </Slider>
                    }
                </div>
            );
        }
        else if (this.props.type === 'image') {
            return (
                <div>
                    {
                        styles &&
                    <Slider {...settings}>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <Col key={index}>
                                    {
                                        styles.ceremonyCard && 
                                        <div aria-hidden>
                                        {
                                            styles.packageImg && 
                                            <img className={styles.packageImg} src={imagePath(item)} alt=""
                                                onError={(e) => { e.target.onerror = null; e.target.src = imagePath('card_2_1.jpg') }}></img>
                                        }
                                            
                                            {/* <h3>{item.ceremony_name}</h3> */}
                                            
                                        </div>
                                    }

                                    </Col>
                                );
                            })
                        }
                    </Slider>
                    }
                </div>
            );
        } else if (this.props.type === 'wishlist') {
            return (
                <div>
                    <Slider {...settings}>
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <Col key={index}>
                                        <CategoryCard data={item} category={this.props.category} type={'carousel'} id={index} isWishlist={true}
                                        isCompare={this.props.isCompare} isChecked={this.props.checkIfSelectedForComparison(item)}
                                        selectedToCompare={(vendor,isRemoving) => this.props.addToCompare(vendor,isRemoving)}/>
                                    </Col>
                                );
                            })
                        }
                        <Col>
                            <div className={styles.addNewMob} onClick={() => this.props.buttonAction()} aria-hidden>
                                <div className={styles.addIconBox}></div>
                            </div>
                        </Col>
                    </Slider>
                </div>
            );
        }
        else {
            return (
                <div>
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
                        <Col className="text-center">
                            <div aria-hidden className={styles.addNew} onClick={() => this.props.buttonAction(this.props.category)}><span>View All <br /> {this.props.categoryName}</span></div>
                        </Col>
                    </Slider>
                </div>
            );
        }
    }
}

HorizontalSlider.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string,
    category: PropTypes.string,
    categoryName: PropTypes.string,
    buttonAction: PropTypes.func,

    checkIfSelectedForComparison: PropTypes.func,
    addToCompare: PropTypes.func,
    isCompare: PropTypes.bool,
    onSelect: PropTypes.func
};
