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

const CompanyCard = props => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src="/assets/318x180.svg"
          alt="Company Logo"
        />
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
