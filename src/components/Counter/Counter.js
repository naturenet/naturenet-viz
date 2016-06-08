import React, { Component } from 'react'
import classes from './Counter.scss'
import _ from 'lodash'

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

// import firebase from './fire'
import pure from 'pure-render-decorator'

import {PieChart, Pie} from 'recharts'

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

@pure
class ActivitiesOverTime extends Component {

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

@pure
class ActivitiesViz extends Component {

	render () {
    console.log('render', this.props)
    const { data } = this.props
    if (!data)
      return <div>Loading...</div>
    else
    return <div>
      <OpenVsCompletedActivities data={data}/>
      <ActivitiesOverTime data={data}/>
    </div>
  }
}

export const Counter = ({increment, doubleAsync, counter, loadData, data}) =>
  <div>
    <h2 className={classes.counterContainer}>
      Counter:
      {' '}
      <span className={classes['counter--green']}>
        {counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={doubleAsync}>
      Double1 (Async)
    </button>
    <button className='btn btn-default' onClick={loadData}>
      Load Data (Saga)
    </button>

    <ActivitiesViz data={data}/>


  </div>

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
