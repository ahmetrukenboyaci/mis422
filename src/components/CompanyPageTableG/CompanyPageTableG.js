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

    // eslint-disable-next-line array-callback-return
    Object.keys(newCompany).map((oKey) => {
      if (newCompany[oKey] === null || newCompany[oKey] === "") {
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
        c = 'Prepared by';

      if ((c in acc)) {
        if (newCompany[curr] !== null) acc[c] += ",  " + newCompany[curr];
      } else {
        if (newCompany[curr] !== null) acc[c] = newCompany[curr];
      }

      return acc;
    }, {});

    function isLink(item, isWeb=false) {
      if (typeof item == "string") {
        if (item.includes('*') || item.includes('Student')) {
          var items = item.split(",");
          var hrefs = [];
          var els = [];
          // eslint-disable-next-line array-callback-return
          items.map(el => {
            if (el.includes('.com') ) {
              hrefs.push(el);
            } else {
              els.push(el);
            }
          });
          var icon = () => <i className={'fab fa-linkedin'} />;
          return els.map((el, i) => {
            let link = hrefs[i]?.includes('http') ? hrefs[i] : "https://"+hrefs[i];
            return <div key={i}><a target="_blank" rel="noopener noreferrer" href={link}>{el.replace("*", " ") +" "}</a>
              <a target="_blank" rel="noopener noreferrer" href={link}>{icon()}</a></div>;
          })
        }
        if (isWeb) {
          if (!item.includes('http')) item = "https://"+item;
        }
        return (item.includes("http") && !item.includes(",")) ? (
          <a target="_blank" rel="noopener noreferrer" href={item}>{item}</a>
        ) : (
          <span>{item}</span>
        );
      }
      return item;
    }

    if (!isOdd) {
      // eslint-disable-next-line array-callback-return
      return Object.keys(finalObject).map((key, id) => {
        if (key !== "Id" && key !== "Name" && id % 2 === 0) {
          return (
                <tr key={id}>
                  <th scope="row">{key}</th>
                  <td>{isLink(finalObject[key], key.toLowerCase().includes('website'))}</td>
                  {this.renderCompanyCard(id % 2 === 0, id+1)}
                </tr>
            );
        }
      });
    } else {
      return (
          <Fragment>
            <th scope="row">{Object.keys(finalObject)[newKey]}</th>
            <td>{isLink(finalObject[Object.keys(finalObject)[newKey]], Object.keys(finalObject)[newKey].toLowerCase().includes('website'))}</td>
          </Fragment>
      );
    }
  }

  render() {
    const { name, website } = this.props.companyInfo;
    const { isAuthorized } = this.props;

    return (
      <div className={`CompanyTableG ${!isAuthorized ? "large" : ""}`}>
        <table style={{tableLayout:"fixed"}} className={`table ${!isAuthorized ? "large" : ""}`}>
          <thead>
            <tr>
              <th colSpan={2} scope="col">
                <img
                  className="companyLogo"
                  alt={"company logo"}
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
