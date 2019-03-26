import React from 'react'
import { Chart, Geom, Axis, Legend, Tooltip } from 'bizcharts'

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
    return (
      <div style={styles.wrapper}>
        <Chart
          renderer='canvas'
          width={400}
          height={300}
          data={this.props.data}
          padding={[10, 30, 110, 30]}
        >
          <span className='main-title' style={styles.mainTitle}>
            {this.props.chartTitle}
          </span>
          <Axis name='count'/>
          <Axis name='item' />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Legend />
          <Geom type='interval' position='item*count' color='item' />
        </Chart>
      </div>
    )
  }
}

BarChart.defaultProps={
  chartTitle: 'Bar Chart',
}

export default BarChart