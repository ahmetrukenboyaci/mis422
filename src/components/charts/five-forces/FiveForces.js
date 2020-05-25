import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import "./fiveForces.scss";

class MyResponsiveRadar extends React.Component {
  renderDescription = () => {
    const { data } = this.props;

    return Object.keys(data).map((item, index) => {
      if (item.includes("Description")) {
        return (
          <li key={Object.keys(data).indexOf(item)} className="listItem">
            {data[item]}
            <div className="vl"></div>
          </li>
        );
      }
      return null;
    });
  };
  render() {
    const { dt, companyName } = this.props;
    return (
      <div>
        <div className="parent" style={{ height: "400px" }}>
          <ResponsiveRadar
            data={dt}
            keys={[companyName]}
            indexBy="force"
            maxValue="auto"
            margin={{
              top: 70,
              right: 80,
              bottom: 40,
              left: 80,
            }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{
              from: "color",
            }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={10}
            dotColor={{
              theme: "background",
            }}
            dotBorderWidth={2}
            dotBorderColor={{
              from: "color",
            }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{
              scheme: "nivo",
            }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
        <ul className="fiveForces">{this.renderDescription()}</ul>
      </div>
    );
  }
}

export default MyResponsiveRadar;
