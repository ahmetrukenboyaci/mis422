import React, {Component} from 'react';

import logo from '../../../resim.png'
import './mobilePage.scss';

class MobilePage extends Component {
    render() {
        return (
            <div className={"emptyPage"}>
                <div className="logoEmpty">
                    <img className={"logo"} src={logo} alt={"logo"} />
                    <span>DIGITAL COMPANY</span> GURU
                </div>
                <div className={"redirect"}>MOBILE DEVICES ARE NOT SUPPORTED PLEASE TRY ON PC</div>
                <div className="socialMedia">
                    <a target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/in/digital-company-guru"}>
                        <i className="fab fa-linkedin"/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={"https://twitter.com/digitalcomguru"}>
                        <i className="fab fa-twitter"/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={"https://instagram.com/digitalcompanyguru"}>
                        <i className="fab fa-instagram"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default MobilePage;
