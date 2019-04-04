import React, { Component } from 'react';
import styles from './about.scss';
import { imagePath } from '../../utils/assetUtils';

class MemberComponent extends Component {
    render() {
        return(
            <div className={styles.memberContainer}>
                <div className={styles.imageCover} style={{ backgroundImage: `url(/images/card_1_1.jpg)`}}>
                    <div className={styles.hoverContainer}>
                        <div className={styles.memeberInfo}>
                            <div className={styles.memberName} style={{color: 'white'}}>Founder</div>

                            <div className={styles.memberPosition} style={{color: 'white'}}>CEO - Founder</div>

                            <p className={`${styles.pSmallClass} d-none d-sm-block`}>
                            Manage expectations please use “solutionise” instead of solution ideas! :). 
                            Curate i am dead inside or value-added, and five-year strategic plan. 
                            High touch client re-inventing the wheel, so loop back, yet enough 
                            to wash your face but it’s about managing expectations we need a 
                            paradigm shift. Forcing function at the end of the day strategic 
                            fit I just wanted to give you a heads-up, or organic growth. 
                            Win-win fire up your browser programmatically beef up, so gain 
                            traction. Onward and upward, productize the deliverables and f
                            ocus on the bottom line work synergestic actionables, 
                            but first-order optimal strategies. 
                            </p>

                            <div className={styles.iconContainer}>
                                <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                    <img src={imagePath('footer_fb.png')} alt="Facebook" />
                                </a>
                                <a href='https://www.instagram.com/ahwanamevents/' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('footer_insta.png')} alt="Instagram" />
                                </a>
                                <a href='https://www.pinterest.com' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('pinterest.svg')} alt="Pinterest" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.memeberInfo}>
                    <div className={styles.memberName}>Founder</div>
                    <div className={styles.memberPosition}>CEO - Founder</div>
                </div>
            </div>
        );
    }
}

export default MemberComponent;