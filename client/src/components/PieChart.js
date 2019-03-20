import React, {Component} from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

class PieChart extends Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(this.props.data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={210}
          data={dv}
          scale={cols}
          padding={[0, 100, 20, 100]}
          forceFit
        >
          <Coord type="theta" radius={0.9} />
          <Axis name="count" />
          {/* <Legend
            position="right"
            offsetY={0}
            offsetX={0}
          /> */}
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 2,
              stroke: "#fff"
            }}
          >
            <Label
              content="count"
              offset={-22}
              textStyle={{
                rotate: 0,
                textAlign: "center",
                fontWeight: 'bold',
                shadowBlur: 2,
                shadowColor: "rgba(0, 0, 0, .45)"
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default PieChart