import React, { Component } from 'react';
import styles from './imageFade.scss';
import { imagePath } from '../../utils/assetUtils';
import PropTypes from 'prop-types';
class ImageFade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: this.props.data[0],
      imageSrcTwo: this.props.data[1],
      scale: 1
    };
  }

  componentDidMount() {
    let i = 0;
    let imagesLength = this.props.data.length;
    this.imageUpdater = setInterval(() => {
      this.setState({
        imageSrc: this.props.data[i]
      });
      if (i <= imagesLength - 2) {
        i++;
      } else {
        i = 0;
      }
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.imageUpdater);
  }

  render() {
    return (
      <div
        className={
          this.props.fromServices ? styles.imageAtServices : styles.imageWrap
        }
      >
        {styles.homeImage && (
          <div
            className={styles.homeImage}
            style={{
              backgroundImage: 'url(' + imagePath(this.state.imageSrc) + ')',
              backgroundPosition: 'center top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </div>
    );
  }
}

ImageFade.propTypes = {
  data: PropTypes.array,
  fromServices: PropTypes.bool
};

export default ImageFade;
