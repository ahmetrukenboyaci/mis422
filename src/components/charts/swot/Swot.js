import React, { Component } from "react";

import './swot.scss'

export default class Swot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      modalTitle: "",
      desc: ""
    }
  }

  modalOpen = (title="", desc="") => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      modalTitle: title,
      desc: desc
    });
  };

  renderModalContent() {
    return (
      <div onClick={() => this.modalOpen()} className={"swotModal"}>
        <div onClick={(e) => {e.stopPropagation(); e.preventDefault();}} className={"swotModalContent"}>
          <div className={"swotModalTitle"}>
            <div className={"title"}>{this.state.modalTitle.toUpperCase()}</div>
            <div onClick={() => this.modalOpen("", "")} className={"closeIcon"}>X</div>
          </div>
          <div className={"swotModalText"}>
            {this.state.desc}
          </div>
        </div>
      </div>
    );
  }

  renderData = () => {
    const { data } = this.props;

    let keys = Object.keys(data);

    return keys.map((key, i) => {
      let index = i % 2 ? (i === 1 ?  "first orange" : "first lightyellow") : (i === 0 ?  "end red" : "end yellow");
      return <ul key={i} className={`swotList ${index}`}>
        <div className={"header"}>{key.charAt(0).toUpperCase()}</div>
        <div className={"swotListCard"}>
          {data[key].map((li, j) => {
            return <li onClick={() => this.modalOpen(li.itemName, li.itemDescription)} key={`${i}${j}`} className={"swotListItem"}>
              <h6 className={"itemName"}>{li.itemName}</h6>
              <div className={"description"}>{li.itemDescription}</div>
            </li>
          })}
        </div>
      </ul>
    });
  };

  render() {
    return (
      <div className={'swotContainer'}>
        {this.state.isModalOpen && this.renderModalContent()}
        {this.renderData()}
      </div>
    )
  }
}
