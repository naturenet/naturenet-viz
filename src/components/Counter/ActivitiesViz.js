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
      Open: {numberOfActivitiesOpen},
      Completed: {numberOfActivitiesCompleted}
      { chart }
    </div>
  }
}

import moment from 'moment'

const binByTime = (data) => {
  // const groups = _.groupBy(data, 'status')
  const startTime = _.min(_.map(data, 'created_at'))
  const endTime = _.max(_.map(data, 'created_at'))
  const duration = (endTime - startTime)

  const numOfBins = 5
  const durationPerBin = duration / numOfBins

  const processedData = _.mapValues(data, (d) => {
    return {
      ...d,
      binId: Math.ceil((d.created_at - startTime) / durationPerBin)
    }
  })

  const groups = _.groupBy(processedData, 'binId')
  const bins = _.map(groups, (g, key) => {
    return {
      name: key,
      pv: g.length
    }
  })
  return bins
}

@pure
class ActivitiesOverTime extends Component {

  render(){
    const { data } = this.props

    const input = binByTime(data)
    console.log('input', input)

    const chart = <LineChart width={600} height={300} data={input}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>

      </LineChart>

    return <div>
      <h1>Activities cross time </h1>
      { chart }
    </div>
  }
}

@pure
export default class ActivitiesViz extends Component {

	render () {
    const { data } = this.props
    if (!data)
      return <div>Loading...</div>
    else
      return <div>
        <h1>Activities</h1>
        <OpenVsCompletedActivities data={data}/>
        { false && <ActivitiesOverTime data={data}/> }
      </div>
  }
}
