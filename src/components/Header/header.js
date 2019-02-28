import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import * as actions from '../../reducers/session/actions';
import * as homeActions from '../../modules/home/actions'
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

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

    toggleModal() {
        if (this.props.showLogin) {
            this.props.dispatch(actions.hideLogin());
        } else {
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

    renderLoginItem = () => {

        if (this.props.user == null) {
            return (
                <NavItem>
                    <NavLink className={styles.iconLink} style={{ cursor: "pointer" }} onClick={this.toggleModal}>
                        <img src={imagePath('avatar.svg')} alt="avatar" />
                        Login
                </NavLink>
                </NavItem>
            );
        } else {
            return (
                <NavItem>
                    <NavLink className={styles.iconLink} style={{ cursor: "pointer" }} onClick={this.logout}>
                        <img src={imagePath('avatar.svg')} alt="avatar" />
                        {this.props.user.name}
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
                        <img className={styles.logoTest} src={imagePath('logo.svg')} alt="logo" />
                    </NavbarBrand>
                    <Nav className={`${styles.iconNav}`} navbar>
                        <NavItem>
                            <NavLink href="" className={styles.iconLink}>
                                <img src={imagePath('vendor.svg')} alt="vendor" />
                                For Vendors
                                </NavLink>
                        </NavItem>
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
                                <NavLink onClick={() => this.navigateTo('/exclusive')}>Packages</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/about')}>About Ahwanam</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/howItWorks')}>How It Works</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => this.navigateTo('/wishlist')}>Wishlist</NavLink>
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
