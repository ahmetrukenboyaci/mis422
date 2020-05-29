import React, {Component} from 'react';
import './header.scss';

class Header extends Component {
    render() {
        return (
            <div className={this.props.title.includes('DIGITAL COMPANY GURU') ? 'pageHeader' : 'pageHeader header'}>
                <div className={'title'}>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default Header;
