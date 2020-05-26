import React, { Component } from "react";

import './swot.scss'

export default class Swot extends Component {
  renderData = () => {
    const { data } = this.props;

    let keys = Object.keys(data);

    return keys.map((key, i) => {
      let index = i % 2 ? (i === 1 ?  "first orange" : "first lightyellow") : (i === 0 ?  "end red" : "end yellow");
      return <ul className={`swotList ${index}`}>
        <div className={"header"}>{key.charAt(0).toUpperCase()}</div>
        <div className={"swotListCard"}>
          {data[key].map(li => {
            return <li className={"swotListItem"}>
              <h6 className={"itemName"}>{li.itemName}</h6>
              <li className={"description"}>{li.itemDescription}</li>
            </li>
          })}
        </div>
      </ul>
    });
  };

  render() {
    return <div className={'swotContainer'}>{this.renderData()}</div>;
  }
}
