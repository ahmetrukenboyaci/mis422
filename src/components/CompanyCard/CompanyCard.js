import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import "./CompanyCard.scss";

const CompanyCard = ({ id, image, category, companyName }) => {
  return (
    <Card id={id} className="card-container">
      <CardImg
        top
        src={image}
        alt="Company Logo"
        className="logo align-self-center"
      />
      <CardBody className="cardBody">
        <CardTitle className="companyName"> {companyName} </CardTitle>
        <CardSubtitle className="category"> {category} </CardSubtitle>
        <Button className="float-right">More Information </Button>
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
