import React, {Component} from 'react';
import './header.scss';

class Header extends Component {
    render() {
        return (
            <div className={'pageHeader'}>
                <div className={'title'}>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default Header;
