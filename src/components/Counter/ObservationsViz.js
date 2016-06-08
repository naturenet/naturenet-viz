import React, { Component } from 'react'
import _ from 'lodash'
import pure from 'pure-render-decorator'

import {PieChart, Pie} from 'recharts'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

@pure
class OpenVsCompletedActivities extends Component {

  render(){
    const { data } = this.props

    const groups = _.groupBy(data, 'status')

    const numberOfActivitiesOpen = groups['Open'].length
    const numberOfActivitiesCompleted = groups['Completed'].length

    const pieChartData = [
      {name: 'Completed', value: numberOfActivitiesCompleted},
      {name: 'Open', value: numberOfActivitiesOpen}
    ]

    const chart = <PieChart width={730} height={250}>
      <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label/>
    </PieChart>

    return <div>
      Open: {numberOfActivitiesOpen} activities
      Completed: {numberOfActivitiesCompleted} activities
      { chart }
    </div>
  }
}

import moment from 'moment'

import { binByTime } from './utils'

@pure
class ObservationsOverTime extends Component {

  render(){
    const { data, unit = 'month' } = this.props

    const input = binByTime(data, 'updated_at', unit)
    // console.log('input', input)

    const chart = <LineChart width={600} height={300} data={input}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
              
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>

      </LineChart>

    return <div>
      <h1>Observations over time ({unit})</h1>
      { chart }
    </div>
  }
}

import {Grid, Row, Col} from 'react-flexbox-grid'

@pure
export default class ObservationsViz extends Component {

	render () {
    const { data } = this.props
    if (!data)
      return <div>Loading...</div>
    else
      return <div>
        <h1>Observations</h1>
        <div>Number of observations: {_.keys(data).length}</div>
        <Row>
          <Col xs={12} md={6}>
            <ObservationsOverTime data={data} unit='month'/>
          </Col>
          <Col xs={12} md={6}>
            <ObservationsOverTime data={data} unit='day'/>
          </Col>
        </Row>
      </div>
  }
}
