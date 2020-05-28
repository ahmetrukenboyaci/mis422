import React, {Component, Fragment} from "react";

/**styles */
import "./CompanyPageTableG.scss";

/**This component is created for all users to see */

class CompanyPageTableG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
    };
  }

  renderCompanyCard(isOdd=false, newKey) {
    const { companyInfo } = this.props;

    let newCompany = {...companyInfo};

    Object.keys(newCompany).map(oKey => {
      if (newCompany[oKey] === null) {
        delete newCompany[oKey];
      } else {
        if (oKey.includes('founders') && oKey.includes('Linkedin')) {
          newCompany['foundersNames'+oKey.charAt(oKey.length-1)] += "*,"+newCompany[oKey];
          delete newCompany[oKey];
        }
        if (oKey.includes('Student') && oKey.includes('linkedin')) {
          newCompany['nameOfTheStudent' + oKey.substring(oKey.length -3, oKey.length)] += "*,"+newCompany[oKey];
          delete newCompany[oKey];
        }
      }
    });

    let finalObject = Object.keys(newCompany).reduce((acc, curr) => {
      let c = curr
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
        .replace(/\d+/g, "");

      if (c.includes("One") || c.includes("Two"))
        c = 'Reporters';

      if ((c in acc)) {
        if (newCompany[curr] !== null) acc[c] += ",  " + newCompany[curr];
      } else {
        if (newCompany[curr] !== null) acc[c] = newCompany[curr];
      }

      return acc;
    }, {});

    function isLink(item) {
      if (typeof item == "string") {
        if (item.includes('*') || item.includes('Student')) {
          var items = item.split(",");
          console.log(items);
          var hrefs = [];
          var els = [];
          items.map(el => {
            if (el.includes('.com') ) {
              hrefs.push(el);
            } else {
              els.push(el);
            }
          });
          var icon = () => <i className={'fab fa-linkedin'} />;
          return els.map((el, i) => {
            return <div>{el.replace("*", " ") +" "}<a target="_blank" href={hrefs[i]}>{icon()}</a></div>;
          })
        }
        return item.includes(".com") ? (
          <a target="_blank" href={item}>{item}</a>
        ) : (
          <span>{item}</span>
        );
      }
      return;
    }

    if (!isOdd) {
      return Object.keys(finalObject).map((key, id) => {
        if (key !== "Id" && key !== "Name" && id % 2 === 0) {
            return (
                <tr key={id}>
                  <th scope="row">{key}</th>
                  <td style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{isLink(finalObject[key])}</td>
                  {this.renderCompanyCard(id % 2 === 0, id+1)}
                </tr>
            );
        }
      });
    } else {
      return (
          <Fragment>
            <th scope="row">{Object.keys(finalObject)[newKey]}</th>
            <td style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{isLink(finalObject[Object.keys(finalObject)[newKey]])}</td>
          </Fragment>
      );
    }
  }

  render() {
    const { name, website } = this.props.companyInfo;

    return (
      <div className={"CompanyTableG"}>
        <table style={{tableLayout:"fixed"}} className="table">
          <thead>
            <tr>
              <th colSpan={2} scope="col">
                <img
                  className="companyLogo"
                  src={`https://logo.clearbit.com/${website}?size=200`}
                />
              </th>
              <th colSpan={2} scope="col" className="companyName">
                <span>{name}</span>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderCompanyCard()}</tbody>
        </table>
      </div>
    );
  }
}

export default CompanyPageTableG;
