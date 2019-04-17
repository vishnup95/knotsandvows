import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
// import styles from './galleryModal.scss';
import { imagePath } from '../../utils/assetUtils';
import { connect } from 'react-redux';
import * as actions from '../../modules/detailPage/actions'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
    message: state.session.message,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class ProductGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
    }

    handleOnSlide = (index) => {
        this.setState({ currentIndex: index});    
    }

    closeModal = () => {
        this.props.close();
    }

    getImages = (gallery) => {
        let images = [];
        for (let i = 0; i < gallery.length; i++) {
            images.push({
                original: gallery[i].image,
                thumbnail: gallery[i].image
            });
        }
        return images;
    }

    render() {

        const images = this.getImages(this.props.images);
        return (
            <div>
             <img src={imagePath('close-round.svg')} onClick={this.props.close} aria-hidden alt="close button" />
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={images}
                    lazyLoad={true}
                    infinite={true}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showThumbnails={true}
                    onSlide={this.handleOnSlide}
                />
                {/* <div>{this.props.name}</div>
                <div>{`${this.state.currentIndex+1}/${images.length} Photos`}</div> */}
            </div>
        );
    }


}

ProductGallery.propTypes = {
    dispatch: PropTypes.func,
    close: PropTypes.func,
    message: PropTypes.string,
    images: PropTypes.array,
    name: PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductGallery);