import React, { Component } from "react";
import Slider from "react-slick";
import { imagePath } from '../../utils/assetUtils';
import styles from './home.scss';

const data = [
  {
    title: 'Want more information on vendors?',
    description: 'With pricing, reviews, and details for thousands of local wedding professionals it has never been easier to find and hire your vendor team.',
    image: 'home1.png',
    hoverimage: 'home1_hover.png',
  },
  {
    title: 'Get the best prices on vendors?',
    description: 'With pricing, reviews, and details for thousands of local wedding professionals it has never been easier to find and hire your vendor team.',
    image: 'home2.png',
    hoverimage: 'home2_hover.png',
  },
  {
    title: 'Want ideas that fit your budget?',
    description: 'Whether you’re having a baller bash or need ideas for weddings on a budget, these tips will help you get started.',
    image: 'home3.png',
    hoverimage: 'home3_hover.png',
  },
];

const SampleNextArrow = (propvalues) => {
  const { className, style, onClick } = propvalues;
  return (
    <button
      className={`${className} ${styles.hButton}`}
      style={{ ...style, 
        display: "block", 
        background: 'url("images/dropicon_home.svg") no-repeat',
        backgroundSize: '50px',
        transform: 'rotate(270deg)'
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
          display: "block", 
          background: 'url("images/dropicon_home.svg") no-repeat',
          transform: 'rotate(90deg)',
          backgroundSize: '50px',
          zIndex: '10' 
      }}
      onClick={onClick}
      >Prev</button>
  );
}

export default class HorizontalMultiCarousel extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className={styles.multiContainer}>
        <Slider {...settings}>
            {
                data.map((item, index) => {
                    return(
                        <div key={index} className={styles.multiItem}>
                            <div className={styles.roundImg}>
                                <img src={imagePath(item.image)} alt="Icon" 
                                onMouseOver={e => e.currentTarget.src = imagePath(item.hoverimage)} 
                                onMouseOut={e => e.currentTarget.src = imagePath(item.image)} 
                                onFocus={() => {}} onBlur={() => {}} />
                            </div>
                            <h3 className="mt-5">{item.title}</h3>
                            <p className={`${styles.pSmall} mt-4`}>
                              {item.description}
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