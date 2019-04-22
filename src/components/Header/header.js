import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import { shortName } from '../../utils/utilities';
import * as actions from '../../reducers/session/actions';
import * as homeActions from '../../modules/home/actions'
import * as modalActions from '../../reducers/modal/actions';
import * as wishlistActions from '../../modules/wishlist/actions';
import { Link } from 'react-router-dom';
import { push, replace } from 'connected-react-router';
import { sendGAEvent } from '../../utils/GAUtilities'
import queryString from 'query-string';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Modal,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import styles from './header.scss';
import modalStyles from '../../modals/forgotPasswordModal/forgotPasswordModal.scss';
import SignInModal from '../../modals/signInModal/SignInModal';
import ForgotPassword from "../../modals/forgotPasswordModal/ForgotPasswordModal"
import { isLoggedIn, hyphonatedString, getDataFromResponse } from '../../utils/utilities';

const mapStateToProps = state => ({
    route: state.router.location.pathname,
    user: state.session.user,
    error: state.session.error,
    apiStatus: state.session.apiStatus,
    showLogin: state.session.showLogin,
    showForgotPassword: state.session.showForgotPassword,
    showResetPassword: state.session.showResetPassword,
    categories: state.home.categories,
    location: state.router.location,
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
            isOpen: false,
            hashValue: null,
            email: null
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user != this.props.user) {
            this.props.dispatch(wishlistActions.fetchMyWishlist());
        }
    }

    componentDidMount() {
        if (isLoggedIn()) {
            this.props.dispatch(actions.fetchMyProfile());
        }
    }

    toggleForgotPasswordModal = () => {
        if (this.props.showForgotPassword) {
            this.props.dispatch(actions.hideForgotPassword());
        } else {
            this.props.dispatch(actions.showForgotPassword());
        }
    }

    toggleResetPasswordModal = () => {
        if (this.props.showResetPassword) {
            this.props.dispatch(actions.hideResetPassword());
            this.props.dispatch(replace("/"));
        } else {
            this.props.dispatch(actions.showResetPassword());
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
                    <Link to={`/categories/${hyphonatedString(item.page_name, item.category_id)}`}>{item.name}</Link>
                </li>
            );
        });

        return listItems;
    }

    logout = () => {
        if (localStorage) {
            localStorage.clear();
        }
        this.props.dispatch(actions.clearUserData());
        this.navigateTo("/");
    }

    componentDidUpdate(prevProps) {
        if (prevProps == undefined) {
            return false;
        }

        if (this.props.location.search != prevProps.location.search) {
            if (this.props.location.pathname === "/resetpassword") {
                var hashValue = queryString.parse(this.props.location.search).code;
                var email = queryString.parse(this.props.location.search).email;
                if (hashValue) {
                    this.setState({ hashValue: hashValue, email });
                    this.props.dispatch(actions.validateLink(hashValue)).then((response) => {
                        let error = getDataFromResponse(response);
                        if (error == null) {
                            this.toggleResetPasswordModal();
                        } else {
                            let modalContent = {
                                heading: 'Reset Password',
                                message: error
                            };
                            this.props.dispatch(modalActions.showModal(modalContent));
                        }
                    },
                        error => {
                            let modalContent = {
                                heading: 'Reset Password',
                                message: error.message
                            };
                            this.props.dispatch(modalActions.showModal(modalContent));
                        });
                }
            }
            else if (this.props.location.pathname === "/verify") {
                const activationCode = queryString.parse(this.props.location.search).activation_code;
                const email = queryString.parse(this.props.location.search).email;
                if (activationCode && email) {
                    this.props.dispatch(actions.verifyEmail(activationCode, email));
                }
            }
            else if (queryString.parse(this.props.location.search).login) {
                // const { from } = this.props.location.state || { from: { pathname: '/' } }
                var login = queryString.parse(this.props.location.search).login;
                if (login == "true" && !isLoggedIn()) {
                    this.toggleModal();
                } else {
                    var redirect = queryString.parse(this.props.location.search).redirect;
                    if (redirect) {
                        this.props.dispatch(replace(`${redirect}`));
                    } else {
                        this.props.dispatch(replace("/"));
                    }
                }
            }
        }

        if (this.props.location.pathname === "/verify") {
            if (this.props.apiStatus == true) {
                let modalContent = {
                    heading: '',
                    message: 'Email has been successfully verified. Please login to continue.',
                    proceedAction: this.toggleModal
                };
                this.props.dispatch(modalActions.showModal(modalContent));
                this.props.dispatch(replace("/"));
            } else if (this.props.apiStatus == false) {
                this.props.dispatch(replace("/"));
                let modalContent = {
                    heading: '',
                    message: this.props.error

                };
                this.props.dispatch(modalActions.showModal(modalContent));
            }
        }
    }

    renderLoginItem = () => {

        if (this.props.user !== null) {
            return (
                <div>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav className={styles.iconLink} style={{ cursor: "pointer", alignItems: "flex-end" }}>
                            <span className={styles.userInfo}>
                                {shortName(this.props.user.name)}
                            </span>
                        </DropdownToggle>

                        <DropdownMenu className={styles.userDropdown} >
                            <DropdownItem className="text-center" onClick={() => this.navigateTo("/profile")}>
                                Profile
                        </DropdownItem>
                            <DropdownItem className="text-center" onClick={() => this.navigateTo("/bookings")}>
                                My bookings
                        </DropdownItem>
                            <DropdownItem className="text-center" onClick={() => this.logout()}>
                                Logout
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            );
        } else {
            return (
                <NavItem>
                    <NavLink className={styles.iconLink} style={{ cursor: "pointer" }} onClick={this.toggleModal}>
                        <img src={imagePath('avatar.svg')} alt="avatar" className="tab-only" />
                        Login / Sign Up
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
            <div className={styles.ahHeader}>
                <div className={styles.navSmall}>

                    <NavbarBrand href="/">
                        <img className={styles.logoTest} src={imagePath('logo.svg')} alt="logo" />
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
                                {/* 
                                this section is temporarily removed
                                <div className={styles.categoriesList}>
                                    <ul>{this.renderCategoryLists(this.props.categories).splice(0, 6)}</ul>
                                    {this.renderCategoryLists(this.props.categories).length > 6 &&

                                        <ul>{this.renderCategoryLists(this.props.categories).splice(6, 6)}</ul>
                                    }
                                    {this.renderCategoryLists(this.props.categories).length > 12 &&

                                        <ul>{this.renderCategoryLists(this.props.categories).splice(12, 6)}</ul>
                                    }
                                </div> */}
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/#packages')}>Packages</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/#ceremonies')}>Ceremonies</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/wishlist')}>Wishlist</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/about')}>About</NavLink>
                            </NavItem>
                            <span className="mobile-only">
                                {this.renderLoginItem()}
                            </span>

                        </Nav>
                    </Collapse>
                </Navbar>
                <Modal isOpen={this.props.showLogin} toggle={this.toggleModal} centered={true} className={styles.loginModal}>
                    <SignInModal close={this.toggleModal} showForgotPassword={this.toggleForgotPasswordModal}></SignInModal>
                </Modal>
                <Modal isOpen={this.props.showForgotPassword} className={modalStyles.forgotContainer} toggle={this.toggleForgotPasswordModal} centered={true}>
                    <ForgotPassword></ForgotPassword>
                </Modal>
                <Modal isOpen={this.props.showResetPassword} toggle={this.toggleResetPasswordModal} className={modalStyles.forgotContainer} centered={true}>
                    <ForgotPassword hash={this.state.hashValue} email={this.state.email}></ForgotPassword>
                </Modal>
                <div className={styles.talkBtn}>
                    <TalkToWeddingPlanner type={'call'} />
                </div>
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
    showForgotPassword: PropTypes.bool,
    showResetPassword: PropTypes.bool,
    history: PropTypes.any,
    categories: PropTypes.array,
    location: PropTypes.object,
    apiStatus: PropTypes.bool,
    error: PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
