import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveRadar = ({
  data = [
    { taste: "fruity", chardonay: 31, carmenere: 44, syrah: 94 },
    { taste: "bitter", chardonay: 61, carmenere: 110, syrah: 20 },
    { taste: "heavy", chardonay: 103, carmenere: 68, syrah: 56 },
    { taste: "strong", chardonay: 105, carmenere: 76, syrah: 110 },
    { taste: "sunny", chardonay: 89, carmenere: 108, syrah: 88 },
  ],
}) => {
  return (
    <div className="parent" style={{ height: "800px", width: "800px" }}>
      <ResponsiveRadar
        data={data}
        keys={["chardonay", "carmenere", "syrah"]}
        indexBy="taste"
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
  );
};

export default MyResponsiveRadar;
