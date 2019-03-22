import React, {Component} from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";

const styles = {
  wrapper: {
    width: 500,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#333',
    display: 'block',
    padding: 10
  },
}

class PieChart extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <Chart
          height={250}
          data={this.props.data}
          padding={[0, 0, 60, 0]}
          forceFit
        >
          <span className='main-title' style={styles.mainTitle}>
            {this.props.chartTitle}
          </span>
          <Coord type="theta" radius={0.9} />
          <Axis name="count" />
          <Legend
            position="bottom"
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="count"
            color={this.props.colorSet}
            tooltip={[
              "item*count",
              (item, count) => {
                return {
                  name: item,
                  value: count
                };
              }
            ]}
            style={{
              lineWidth: this.props.intervalWidth,
              stroke: "#fff"
            }}
          >
          </Geom>
        </Chart>
      </div>
    );
  }
}

PieChart.defaultProps={
  intervalWidth: 2,
  colorSet: 'item',
  chartTitle: 'Pie Chart',
}

export default PieChart