import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
// import styles from './galleryModal.scss';
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

    getImages = (details) => {
        let images = [];
        let gallery = details.gallery;
        for (let i = 0; i < gallery.length; i++) {
            images.push({
                original: gallery[i].url,
                thumbnail: gallery[i].url
            });
        }
        return images;
    }

    render() {

        const images = this.getImages(this.props.details);

        return (
            <div>
             <button onClick={this.props.close}>Close</button>
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
            </div>
        );
    }


}

ProductGallery.propTypes = {
    dispatch: PropTypes.func,
    close: PropTypes.func,
    message: PropTypes.string,
    details: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductGallery);