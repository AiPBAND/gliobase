import React from 'react'
import { Chart, Geom, Axis, Legend, Tooltip } from 'bizcharts'
import DataSet from "@antv/data-set";

const styles = {
  wrapper: {
    width: 400,
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


class BarChart extends React.Component {
  render () {
    const data = this.props.data;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["Validated", "Diagnostic", "Predictive", "Prognostic", "Therapeutic"],
      key: "item",
      value: "count"
    });
    return (
      <div style={styles.wrapper}>
        <Chart
          renderer='canvas'
          width={400}
          height={300}
          data={dv}
          padding={[10, 30, 110, 30]}
        >
          <span className='main-title' style={styles.mainTitle}>
            {this.props.chartTitle}
          </span>
          <Axis name='item'/>
          <Axis name='count' />
          <Tooltip
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Legend />
          <Geom 
            type='interval' 
            position='item*count' 
            color={"name"} 
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
      </div>
    )
  }
}

BarChart.defaultProps={
  chartTitle: null,
}

export default BarChart