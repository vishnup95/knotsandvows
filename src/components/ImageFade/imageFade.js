import React, { Component } from 'react';
import styles from './imageFade.scss';
import { imagePath } from '../../utils/assetUtils';

class ImageFade extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        imageSrc: 'banner1.jpg',
        imageSrcTwo: 'banner2.jpg',
        scale: 1
    }
    componentDidMount() {
        let imagebaseName = 'banner';
        let i = 1;
        this.imageUpdater = setInterval(() => {
            i++;
            if (i > 15) {
                i = 1;
            }
            this.setState({ imageSrc: imagebaseName + i + '.jpg', imageSrcTwo: imagebaseName + i + 1 + '.jpg',scale: 1});
            setTimeout(() => {
                this.setState({scale: 1.5})
            }, 500)
        }, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.imageUpdater);
    }

    render() {
        return (
            <div className={styles.imageWrap}>
            {
                styles.homeImage &&
                <div className={styles.homeImage} style={{ backgroundImage: "url(" + imagePath(this.state.imageSrc) + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'  }}></div>
            }
            
                </div>
        );
    }
}
export default ImageFade;
