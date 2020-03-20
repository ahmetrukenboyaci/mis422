import React from "react";
import { Table } from "reactstrap";
import "./CategoryTable.scss";

const CategoryCard = props => {
  return (
    <div className={"Table"}>
      <Table className="table">
        <tr>
          <th>Company</th>
          <th>Description</th>
          <th>Year</th>
          <th>Headquarter</th>
          <th>CEO</th>
        </tr>
        <tbody>
          <tr>
            <td>Logo and Company Name</td>
            <td>Company Description</td>
            <td>Foundation Year</td>
            <td>Headquarter City</td>
            <td>CEO Name</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryCard;
