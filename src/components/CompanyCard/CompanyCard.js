import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

import "./CompanyCard.scss";

const CompanyCard = props => {
  return (
    <div className={"CompanyCard"}>
      <Card>
        <CardImg top width="100%" src="" alt="Company Logo" />
        <CardBody>
          <CardTitle>Company Name</CardTitle>
          <CardSubtitle>Description</CardSubtitle>
          <Button>More Information</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CompanyCard;
