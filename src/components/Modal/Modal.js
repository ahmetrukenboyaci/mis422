import React, {Component} from 'react';
import './modal.scss';

class Modal extends Component {
    render() {
        let {onClickOutside, title ,content, footer} = this.props;
        return (
            <div onScroll={e => {e.stopPropagation(); e.preventDefault();}} onClick={() => onClickOutside()} className="modalContainer">
                <div onClick={(e) => {e.stopPropagation(); e.preventDefault();}} className="customModal">
                    <div onClick={() => onClickOutside()} className="closeIcon">X</div>
                    <h4 className="title">{title}</h4>
                    <div className="content">{content}</div>
                    <div className="footer">{footer}</div>
                </div>
            </div>
        );
    }
}

export default Modal;
