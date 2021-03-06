import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import styles from './map.scss';
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapDispatchToProps = dispatch => ({
    dispatch
});

class MapComponent extends Component {

    navigateTo(route) {
        this.props.dispatch(push(route));
        window.scrollTo(0, 0);
    }

    onInfoWindowClose = () => {
        
    }

    onMarkerClick = () => {
        
    }

    render() {

         let lat = this.props.lat;
         let lng = this.props.lng;
        return (
            <div className={styles.mapWrap}>
                <Map className={styles.map} google={this.props.google} zoom={8}
                initialCenter={{
                    lat: lat,
                    lng: lng
                  }}
                  streetViewControl = {false}
                  mapTypeControl = {false}
                >
            <Marker
                 name={this.props.title}
                 position={{ 
                    lat: lat,
                    lng: lng
                  }} />
            <Marker />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: {process.env.GOOGLE_MAP_KEY},
    mapDispatchToProps
})(MapComponent);

MapComponent.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    title:PropTypes.string,
    dispatch: PropTypes.func,
    google:PropTypes.object
};

// export default connect(
//     mapDispatchToProps
// )(MapComponent);