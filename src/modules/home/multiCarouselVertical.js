import React, { Component } from "react";
import Slider from "react-slick";
import styles from './home.scss';
import PropTypes from 'prop-types';
import { imagePath } from "../../utils/assetUtils";

const SampleNextArrow = (propvalues) => {
    const { className, style, onClick } = propvalues;
    return (
      <button
        className={`${className} ${styles.hButton}`}
        style={{ ...style, 
          display: "block", 
          top: 'auto',
          left: '41%',
          background: 'url("images/dropicon_home.svg") 4% 49% no-repeat',
          backgroundSize: '50px' 
        }}
        onClick={onClick}
      >Next</button>
    );
  }
  
const  SamplePrevArrow = (propvalues) =>  {
    const { className, style, onClick } = propvalues;
    return (
        <button
        className={className}
        style={{ ...style, 
            display: "none", 
        }}
        onClick={onClick}
        >Prev</button>
    );
}

export default class VerticalMultiCarousel extends Component {

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      initialSlide: 0,
      vertical: true,
      verticalSwiping: false,
      beforeChange: function(currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide) {
        console.log("after change", currentSlide);
      }
    };

    return (
      
      <div className={styles.verticalMultiContainer}>
        <Slider {...settings}>
            {
                this.props.ceremonies.map((ceremony, index) => {
                    return(
                        <div key={index} className={`${styles.verticalMultiItem} ${index%2 === 0  ? '' : styles.evenStyle}`} aria-hidden onClick={() => this.props.onSelect(ceremony)}>
                            <img className={styles.imageContainer} style={{ background: "url(" + ceremony.thumb_image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} alt="" 
                            onError={(e)=>{e.target.onerror = null; e.target.src=imagePath('card_2_1.jpg')}}></img>
                            
                            <div className={styles.detailContainer}>
                              <div className={styles.handle}></div>
                              <h3>{ceremony.ceremony_name}</h3>
                              <p className="mt-3" style={{maxLines:3}}>{ceremony.short_description}</p>
                              <p className="text-right font-weight-bold">View more...</p>
                            </div>
                        </div>
                    );
                })
            }
        </Slider>
      </div>
    );
  }
}

VerticalMultiCarousel.propTypes = {
  ceremonies: PropTypes.array,
  onSelect: PropTypes.func
};