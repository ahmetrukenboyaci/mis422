import React, {Fragment} from "react";
import "./fiveForces.scss";
import Modal from "../../Modal/Modal";
import mis422 from "../../../api/mis-422";
import Chart from "./Chart";

class MyResponsiveRadar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        hoverElement: -1,
        clickElement: -1,
        isModalVisible: false,
        companies: [],
        showChart: false,
        selectedValue: 0,
        newData: [],
        selectedCompanies: [],
        selectedValues: []
    };
  }

    async componentDidMount() {
        let res = await mis422.get('/public/companies/get-name-and-id');
        let companies = res.data.filter(e => e.name !== this.props.companyNames[0]);
        this.setState({ companies: companies, selectedValue: companies[0].id });
    }

    toggleModalVisibility = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible, showChart: false });
    };

  renderModalContent() {
      let {dt, companyNames} = this.props;
      return (
          <Fragment>
              <label htmlFor="companies">Choose a company:</label>
              <select name="companies" id="companies" value={this.state.selectedValue}
                      onChange={(e) => this.setState({selectedValue: e.target.value })}
              >
                {this.state.companies.map((cmp,i) => <option key={i} value={cmp.id}>{cmp.name}</option>)}
              </select>
              <div className="btnContainer">
                  <button onClick={async () => {
                      console.log(this.state.selectedValues);
                      if (this.state.selectedCompanies.length < 3 && this.state.selectedValue !== 0 && !this.state.selectedValues.some(el => el.toString() === this.state.selectedValue.toString())) {
                          let res = await mis422.get(`/api/companies/${this.state.selectedValue}/five-forces`);
                          let dt2 = this.state.newData.length > 0 ? [...this.state.newData] : [...dt];
                          dt2 = dt2.map(e => {e[res.data.company.name] = res.data[e.force.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                              return index === 0 ? word.toLowerCase() : word.toUpperCase();
                          }).replace(/\s+/g, '')+"Value"]*10; return e});
                          let cNames = this.state.selectedCompanies.length > 0 ? [...this.state.selectedCompanies] : [...companyNames];
                          cNames.push(res.data.company.name);
                          this.setState({
                              selectedValues: [...this.state.selectedValues, this.state.selectedValue],
                              selectedCompanies: cNames,
                              newData: dt2,
                              showChart: true,
                              selectedValue: this.state.companies[0].id
                          });
                      } else {
                          if (this.state.selectedCompanies.length >= 4) alert("You cannot compare more than 4 companies");
                          if (this.state.selectedValues.some(el => el.toString() === this.state.selectedValue.toString())) alert("You chose this company before, try with another");
                      }
                  }} className={"btn custom"}>Compare</button>
                  <button className={"btn custom-clear"} onClick={() => this.setState({
                      selectedCompanies: [], newData: [], showChart: false, selectedValue: this.state.companies[0].id, selectedValues: []
                  })}>Clear</button>
              </div>
              <div className="chartContainer">
                  {this.state.showChart && <Chart dt={this.state.newData} companyNames={this.state.selectedCompanies} />}
              </div>
          </Fragment>
    );
  }

  renderDescription = (first=false) => {
    const { data } = this.props;
    const { hoverElement, clickElement } = this.state;

      // eslint-disable-next-line array-callback-return
    return Object.keys(data).filter(item => item.includes("Description")).map((item, index) => {
      if ((first && index < 3) || (!first && index > 2)) {
        return (
          <li id={`listItem${index}`} key={Object.keys(data).indexOf(item)}
              className={`listItem a${index} ${hoverElement === index ? 'hover': ''} ${clickElement === index ? 'clicked': ''}`}
          >
            <h6>
             {item.replace(/([A-Z])/g, " $1")
                 .replace(/^./, function (str) {
                   return str.toUpperCase();
                 })}
            </h6>
            {data[item]}
          </li>
        );
      }
    });
  };
  render() {
    const { isModalVisible } = this.state;
    return (
      <ul style={{width: "100%"}} className="fiveForces">
          {isModalVisible &&
            <Modal content={this.renderModalContent()} title={"Compare Companies with "+this.props.companyNames[0]} onClickOutside={this.toggleModalVisibility} />
          }
        {this.renderDescription(true)}
        <div onMouseEnter={() =>
            Array.from(document.getElementById("parent-div")
                .childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].children)
            // eslint-disable-next-line array-callback-return
                .map((e, i) => {
                  e.addEventListener('mouseover', () => {
                    this.setState({hoverElement: i});
                  });
                  e.addEventListener('mouseleave', () => {
                    this.setState({hoverElement: -1});
                  });
                  e.addEventListener('click', () => {
                    this.setState({clickElement: i});
                    window.scrollTo({
                        top: document.getElementById(`listItem${i}`).offsetTop - 155,
                        left: document.getElementById(`listItem${i}`).offsetLeft,
                        behavior: 'smooth'
                    });
                  });
                })
        } id="parent-div" className="parent" style={{ height: "400px", width: "700px", margin: "auto" }}>
            <Chart dt={this.props.dt} companyNames={this.props.companyNames} />
            <div className={'buttonContainer'}>
                <div onClick={() => this.toggleModalVisibility()} className={'btn btn-info'}>Compare</div>
            </div>
        </div>
        {this.renderDescription()}
      </ul>
    );
  }
}

export default MyResponsiveRadar;
