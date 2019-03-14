import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import * as actions from '../../reducers/session/actions';
import * as homeActions from '../../modules/home/actions'
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { sendGAEvent } from '../../utils/GAUtilities'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Modal
} from 'reactstrap';
import styles from './header.scss';
import SignInModal from '../../modals/signInModal/SignInModal';


const mapStateToProps = state => ({
    route: state.router.location.pathname,
    user: state.session.user,
    showLogin: state.session.showLogin,
    categories: state.home.categories
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});
class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    static fetchData(store) {
        // Normally you'd pass action creators to "connect" from react-redux,
        // but since this is a static method you don't have access to "this.props".

        // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
        return store.dispatch(homeActions.fetchCategories());
    }

    toggleModal() {
        if (this.props.showLogin) {
            this.props.dispatch(actions.hideLogin());
        } else {
            sendGAEvent("Header", "Show Login");
            this.props.dispatch(actions.showLogin());
        }
    }

    componentWillMount() {
        if (this.props.categories.length === 0) {
            this.props.dispatch(homeActions.fetchCategories());
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    renderCategoryLists(list) {
        const listItems = list.map((item, index) => {
            return (
                <li key={index}>
                    <Link to={`/categories/${item.page_name}`}>{item.name}</Link>
                </li>
            );
        });

        return listItems;
    }

    logout = () => {
        this.props.dispatch(actions.logoutProcedure(this.props.history));
        // this.props.dispatch(push('/'));
    }

    shortName = (userName) => {
        let name = userName;
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        console.log(initials);
        return (initials);
    }

    renderLoginItem = () => {

        if (this.props.user == null) {
            return (
                <NavItem>
                    <NavLink className={styles.iconLink} style={{ cursor: "pointer" }} onClick={this.toggleModal}>
                        <img src={imagePath('avatar.svg')} alt="avatar" />
                        Login / Sign Up
                </NavLink>
                </NavItem>
            );
        } else {
            return (
                <NavItem>
                    <NavLink className={styles.iconLink} style={{ cursor: "pointer", alignItems: "flex-end" }} onClick={this.logout}>
                        {/* <img src={imagePath('avatar.svg')} alt="avatar" /> */}
                        <span className={styles.userInfo}>
                            {this.shortName(this.props.user.name)}
                        </span>
                        {/* {this.props.user.name} */}
                    </NavLink>
                </NavItem>
            );
        }
    }

    navigateTo(route) {
        this.props.dispatch(push(route));

    }

    render() {

        return (
            <div className={`${styles.ahHeader}`}>
                <div className={styles.navSmall}>

                    <NavbarBrand href="/">
                        <img className={styles.logoTest} src={imagePath('logo.jpg')} alt="logo" />
                    </NavbarBrand>
                    <Nav className={`${styles.iconNav}`} navbar>
                        {/* <NavItem>
                            <NavLink href="" className={styles.iconLink}>
                                <img src={imagePath('vendor.svg')} alt="vendor" />
                                For Vendors
                                </NavLink>
                        </NavItem> */}
                        {this.renderLoginItem()}
                    </Nav>
                </div>
                <Navbar color="" expand="md" className={styles.ahNav}>
                    <NavbarToggler className={this.state.isOpen ? 'close-nav' : ''} onClick={this.toggle} />
                    <Collapse navbar className={`${styles.ahCollapse} ${this.state.isOpen ? 'show' : ''}`} >
                        <Nav className="" navbar>
                            <NavItem className={styles.vendors}>
                                <NavLink onClick={() => this.navigateTo('/categories')}>Vendors</NavLink>
                                <ul className={styles.categoriesList}>
                                    {this.renderCategoryLists(this.props.categories)}
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/packages')}>Packages</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/wishlist')}>Wishlist</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/services')}>Services</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/about')}>About</NavLink>
                            </NavItem>

                        </Nav>
                    </Collapse>
                </Navbar>
                <Modal isOpen={this.props.showLogin} toggle={this.toggleModal} centered={true} className={styles.loginModal}>
                    <SignInModal close={this.toggleModal}></SignInModal>
                </Modal>
            </div>
        );
    }

}

Header.propTypes = {
    route: PropTypes.string,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    showLogin: PropTypes.bool,
    history: PropTypes.any,
    categories: PropTypes.array,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
