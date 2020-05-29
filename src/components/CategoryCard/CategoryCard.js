import React, { Component } from "react";

export default class CategoryCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">{this.props.cardBody}</div>
      </div>
    );
  }
}
