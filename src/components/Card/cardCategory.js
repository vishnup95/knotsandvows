import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CardTitle,
    CardSubtitle,
    Card,
    CardImg,
    CardBody,
    UncontrolledTooltip,
    Col,
    Button
} from 'reactstrap';
import styles from './card.scss';
import { formatMoney, imagePath } from '../../utils/assetUtils';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { isLoggedIn, hyphonatedString, formatDate } from '../../utils/utilities';
import * as loginActions from '../../reducers/session/actions'
import * as wishlistActions from '../../modules/wishlist/actions';
import LoaderComponent from '../../components/Loader/loader';

const mapStateToProps = state => ({
    wishlistId: state.wishlist.wishListData ? state.wishlist.wishListData.wishlist_id : 4,
    noteloading: state.wishlist.noteloading
});  

const mapDispatchToProps = dispatch => ({
    dispatch
});

class CategoryCard extends Component {
    state = {
        isChecked: false,
        isInWishlist: false,
        showNotes: false,
        showAddNote: false
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        if (event.target.id !== `card${this.props.id}`) {
            this.setState({showNotes: false});
        } else {
            this.toggleNotes(event);
        }
    }

    navigateTo(route) {
        this.props.dispatch(push(route));
        window.scrollTo(0, 0);
    }

    addToWishList = (e) => {
        if (!isLoggedIn()) {
            this.props.dispatch(loginActions.showLogin());
        } else {
            let params = {
                vendor_id: this.props.data.vendor_id,
                wishlist_id: this.props.wishlistId
            };

            this.props.dispatch(wishlistActions.addToWishlist(params));
            this.setState({isInWishlist: !this.setState.isInWishlist ? true: this.state.isInWishlist});          
        }
        e.stopPropagation();
    }

    toggleNotes(e) {
        e.stopPropagation();
        if (!this.state.showNotes) {
            let details = {
                category_id: this.props.data.category_id,
                vendor_id: this.props.data.vendor_id,
                wishlist_id: this.props.wishlistId
            }
            this.props.dispatch(wishlistActions.fetchAllNotes(details));
        }
        this.setState({showNotes: !this.state.showNotes});
    }

    toggleAddNote(e, save) {
        e.stopPropagation();
        this.setState({showNotes: this.state.showAddNote});
        this.setState({showAddNote: !this.state.showAddNote});

        if(save) {
            let params = {
                wishlist_id:1,
                category_id: this.props.data.category_id,
                vendor_id:4,
                note: document.getElementById('note').value
            }
            this.props.dispatch(wishlistActions.addNote(params, this.props.dispatch));
        }
    }

    renderCardBody() {
        let rating = Math.floor(parseFloat(this.props.data.rating) * 2) / 2;
        let halfstar = 0, fullstar = 0, emptystar = 0;
        if (rating * 2 % 2 === 0) {
            fullstar = rating;
            emptystar = 5 - rating;
        } else {
            halfstar = 1;
            fullstar = rating - 0.5;
            emptystar = 5 - (rating + 0.5);
        }

        return (
            <div className={styles.cardbodyContainer} id={`card${this.props.id}`}>

                <div className={styles.mainContent}>
                    <CardTitle className={`mb-1 ${styles.cardTitleCat}`}>{this.props.data.name || 'Name(Default)'}</CardTitle>
                    <CardSubtitle className={`mb-2 ${styles.cardText}`}>{this.props.data.city || 'City(Default)'}</CardSubtitle>
                    <p className={`${styles.charges}`}>
                        <span>{formatMoney(this.props.data.price.minimum_price)}</span> {this.props.data.charge_type}
                    </p>
                </div>

                <div className={styles.ratingContainer}>
                    <p className={`mb-2`}>
                        <img src={imagePath(this.state.isInWishlist ? 'wishlist_selected.svg' : 'wishlist_unselected.svg')} className={styles.heartImg}
                            alt="Unselected heart" onClick={(e) => this.addToWishList(e)} aria-hidden id={`WishListTooltip${this.props.id}`} />
                        {!this.props.isInWishList &&
                            <UncontrolledTooltip placement="top" target={`WishListTooltip${this.props.id}`}>
                                {this.state.isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                            </UncontrolledTooltip>
                        }
                    </p>

                    <div>
                        <p className={`${styles.rating} mb-1`}>
                            {Array(fullstar).fill().map((key, index) => {
                                return <span key={index}><img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar" /></span>;
                            })}
                            {Array(halfstar).fill().map((key, index) => {
                                return <span key={index}><img src={imagePath('halfstar.png')} className={styles.starImg} alt="Halfstar" /></span>;
                            })}
                            {Array(emptystar).fill().map((key, index) => {
                                return <span key={index}><img src={imagePath('outline_star.svg')} className={styles.starImg} alt="Outline" /></span>;
                            })}

                        </p>

                        <p className={styles.rating}>
                            {this.props.data.reviews_count}&nbsp;<span>Reviews</span>
                        </p>
                    </div>

                </div>
            </div>
        );
    }

    handleCardClick = () => {
        this.navigateTo(`/${this.props.category}/${hyphonatedString(this.props.data.name,this.props.data.vendor_id)}`);
    }

    selectCard = (e) => {
        this.setState({ isChecked: !this.state.isChecked });
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <Card className={`${styles.categoryCard} ${this.props.type === 'carousel' ? styles.carouselCard : ''}`} onClick={this.handleCardClick}>
                    {
                        this.props.isWishlist &&
                        <div>
                            <div className={`${styles.addIcon} ${styles.cardIcon}`} onClick={(event) => this.toggleNotes(event)} aria-hidden></div>
                            <div className={`${styles.deleteIcon} ${styles.cardIcon}`}></div>
                            {/* <div className={`${styles.viewIcon} ${styles.cardIcon}`}>2</div> */}
                        </div>
                    }

                    <CardImg
                        className={styles.cardImage}
                        top
                        width="100%"
                        src={this.props.data.pic_url || imagePath('card_1_1.jpg')}
                        alt="Card image cap"
                        onError={(e) => { e.target.onerror = null; e.target.src = `${imagePath('card_1_1.jpg')}` }}
                    />
                    
                    <CardBody className={styles.categoryBody} style={{ backgroundColor: '#f7f7f7' }}>
                        {this.renderCardBody()}
                    </CardBody>
                    {
                        this.props.isCompare &&
                        <div className={styles.compareMask} onClick={(e) => this.selectCard(e)} aria-hidden>
                            <span className={`${styles.checkbox} ${this.state.isChecked ? styles.checked : ''}`}></span>
                        </div>
                    }
                    {
                        this.state.showAddNote &&
                        <div className={styles.addNote}>
                            <div className={styles.noteHeader}><span>Add Note</span> <img className={styles.closeNote} src={imagePath('close-blank.svg')} alt="close button" /></div>
                            <textarea id="note" rows="6" maxLength="1000" placeholder="Maximum 1000 Charectors" onClick={(event) => { event.stopPropagation() }}></textarea>
                            <div className="text-right">
                                <Button className="text-btn" onClick={(event) => this.toggleAddNote(event, false)}>Cancel</Button>
                                <Button className="primary-button" onClick={(event) => this.toggleAddNote(event, true)}>Save</Button>
                            </div>
                        </div>
                    }
                    {
                       this.state.showNotes && <Col className={styles.noteContainer}>
                            <Col className={`${styles.noteSection}`}>
                                <Col md="12" className={`${styles.rightSubSection} text-left`}>
                                    <h4 className={styles.noteTitle} onClick={(event) => this.toggleAddNote(event)} aria-hidden>Add a note</h4>
                                    {this.props.noteloading &&
                                    <div className="row">
                                        <div className="col-12">
                                        <LoaderComponent />
                                        </div>
                                    </div>}
                                    {
                                        this.props.data.notes.map((note, index) => {
                                            return(
                                            <div className={styles.noteWrap} key={index}>
                                                <div>            
                                                    <span className={styles.noteTitle}>Binu</span>
                                                    <span className={styles.noteDate}>{formatDate(note.added_datetime)}</span>
                                                </div>
                                                <div className={styles.noteText}>
                                                    <div>
                                                        <span className="edit-icon"></span>
                                                        <span className="delete-icon"></span>
                                                    </div>
                                                    <div>
                                                        {note.notes}
                                                    </div>
                                                </div>
                                            </div>)
                                        })
                                    }
                                    
                                </Col>
                            </Col>
                        </Col>
                    }
                </Card>
            </div>
        );
    }
}

CategoryCard.propTypes = {
    data: PropTypes.object,
    buttonAction: PropTypes.func,
    dispatch: PropTypes.func,
    category: PropTypes.string,
    type: PropTypes.string,
    isCompare: PropTypes.bool,
    id: PropTypes.number,
    isWishlist: PropTypes.bool,
    isInWishList: PropTypes.bool,
    wishlistId: PropTypes.number,
    noteloading: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryCard);