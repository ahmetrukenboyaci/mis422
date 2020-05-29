import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

import "./CompanyCard.scss";

const CompanyCard = ({ id, image, category, companyName, onClickLogin }) => {
  return (
    <Card id={id} className="card-container">
      <div className="logoContainer">
        <CardImg
          top
          src={`https://logo.clearbit.com/${image}?size=200`}
          alt="Company Logo"
          className="logo align-self-center"
        />
      </div>
      <CardBody className="cardBody">
        <CardTitle className="companyName "> {companyName} </CardTitle>
        {/*<CardSubtitle className="category"> {category} </CardSubtitle>*/}
        <div className="card-bottom">
          <Link
            to={{
              pathname: "/CompanyProfile",
              state: [{ companyId: id, onClickLogin: onClickLogin }],
            }}
          >
            More Information{" "}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
