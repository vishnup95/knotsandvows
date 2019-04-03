import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProgressButton extends Component {

    render() {
        return (
            <button className="primary-button" type="button" disabled = {this.props.isLoading} onClick={this.props.onClick}>
            {this.props.isLoading && <span className="spinner-border spinner-border-sm spinner-margin" role="status" aria-hidden="true"></span>}
                {this.props.title}
          </button>
        );
      }
}

ProgressButton.propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    loadingTitle: PropTypes.string,
    onClick : PropTypes.func
};

export default ProgressButton;