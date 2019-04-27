import React, { Component } from 'react';
import styles from './about.scss';
import { Row, Col } from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';

class MemberContainerComponent extends Component {
    renderMemeber(index) {
        return(
            <div className={styles.member}>
                <img src={imagePath(members[index].displayPic)} alt="member"/>
                <div className={styles.memberHover}>
                    <p className={styles.pSmallClass}>{members[index].name}</p>
                    <p className={styles.pSmallLight}>{members[index].title}</p>
                </div>
            </div>
        );
    }

    renderPinkContainer(index) {
        return(
            <div className={styles.pinkContainer}>
                <p className={styles.pClass}>{aboutWordings[index].heading}</p>
                <p className={styles.pSmallClass}>{aboutWordings[index].description}</p>
            </div>
        );
    }

    render() {
        return(
            <Row className={styles.memberContainer}>
                <Col xs="12" md="6" className="no-padding">
                    <Row className="m-0">
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(0)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(1)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(2)}</Col>
                    </Row>
                    <Row className="m-0">
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(5)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(6)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(7)}</Col>
                    </Row>
                    <Row className="m-0">
                        <Col xs="8" className="p-2">{this.renderPinkContainer(2)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(9)}</Col>
                    </Row>
                </Col>

                <Col xs="12" md="6" className="no-padding">
                    <Row className="m-0">
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(3)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(4)}</Col>
                        <Col xs="4" className="p-2">{this.renderPinkContainer(0)}</Col>
                    </Row>
                    <Row className="m-0">
                        <Col xs="8" className="p-2">{this.renderPinkContainer(1)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(8)}</Col>
                    </Row>
                    <Row className="m-0">
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(10)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(11)}</Col>
                        <Col xs="4" className={styles.noPadding}>{this.renderMemeber(12)}</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default MemberContainerComponent;

const members = [
    {
        name: 'Full Name',
        displayPic: 'members/1.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/2.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/3.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/4.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/5.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/6.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/7.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/8.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/9.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/10.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/11.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/12.png',
        title: 'Job Title'
    },
    {
        name: 'Full Name',
        displayPic: 'members/13.png',
        title: 'Job Title'
    },
];

const aboutWordings = [
    {
        heading: 'Fueling aspirations',
        description: 'We fuel our customers aspirations.'
    },
    {
        heading: 'Understanding values',
        description: 'For every wedding we touch we first understand and internalize our customers values  ( do you want a green wedding, do you want celebrations steeped in tradition, are you a minimalist..)'
    },
    {
        heading: 'Science of memories',
        description: 'We apply research proven methods in planning to maximize long term memory creation'
    }
];