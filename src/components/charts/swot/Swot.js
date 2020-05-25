import React, { Component } from "react";

export default class Swot extends Component {
  renderData = () => {
    const { data } = this.props;

    let keys = Object.keys(data);
    let values = Object.values(data);

    console.log(values);

    values = values.map((value) => {
      return value.map((last) => {
        return (
          <li key={last.id}>
            <h2>{last.itemName}</h2>
            <p>Value: {last.itemValue}</p>
            <p>Description: {last.itemDescription}</p>
          </li>
        );
      });
    });

    let renderIt = keys.map((item, index) => {
      return (
        <ul key={index}>
          <h1>{item.toUpperCase()}</h1>
          {values}
        </ul>
      );
    });

    return renderIt;
  };

  render() {
    return <div>{this.renderData()}</div>;
  }
}
