import React, {Component} from 'react';
import { 
    Jumbotron, 
    Container, 
    Row, 
    Col,
    Button
} from 'reactstrap';

import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import styles from './jumbotron.scss';


class JumbotronComponentWithCols extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (   
            <div>
                <Jumbotron style={{backgroundColor: this.props.bgcolor}} className="mb-0">
                    <h1 className="text-center">{this.props.data.title}</h1>
                    <hr className="mt-3 mb-5" />
                    <Container>
                        <Row>
                            <Col xs={12} md={6}>
                                <img src={imagePath(this.props.image)} alt="" className={styles.colImage}/>
                            </Col>
                            <Col className="pt-5" xs={12} md={6}>
                                <p className={`col-md-9 no-padding ${styles.pLarge} ${styles.blackFive}`}>
                                    {this.props.data.subtitle}
                                </p>
                                <div className="mt-5">
                                    <Button color="danger" className={styles.button} onClick={this.props.buttonAction}>{this.props.data.buttonText}</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>   
                </Jumbotron>
            </div>
        );
    }
  
}

JumbotronComponentWithCols.propTypes = {
    data: PropTypes.object,
    bgcolor: PropTypes.string,
    image: PropTypes.string,
    buttonAction: PropTypes.func
};

export default JumbotronComponentWithCols;