import React, { Component } from "react";
import Slider from "react-slick";
import { imagePath } from '../../utils/assetUtils';
import styles from './home.scss';

export default class HorizontalMultiCarousel extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
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
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className={styles.multiContainer}>
        <Slider {...settings}>
            {
                Array(8).fill(1).map((key, index) => {
                    return(
                        <div key={index} className={styles.multiItem}>
                            <div className={styles.roundImg}>
                                <img src={imagePath('multi_carousel.png')} alt="Icon"/>
                            </div>
                            <h3 className="mt-5">Want more information on vendors?</h3>
                            <p className={`${styles.pSmall} mt-4`}>
                            With pricing, reviews, and details for thousands 
                            of local wedding professionals it has never 
                            been easier to find and hire your vendor team.
                            </p>
                        </div>
                    ); 
                })
            }
        </Slider>
      </div>
    );
  }
}