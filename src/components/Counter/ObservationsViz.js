import React, { Component } from 'react'
import _ from 'lodash'
import pure from 'pure-render-decorator'

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart, Area, Bar, PieChart, Pie, Dot, Surface, Rectangle,
  Layer, Curve
} from 'recharts'

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

    const chart = <LineChart width={600} height={300} data={input}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>

       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>

      </LineChart>

    return <div>
      { chart }
    </div>
  }
}


@pure
class ObservationsByUsers extends Component {

  computeFeatures(){

    const { data } = this.props

    const groups = _(data)
        .groupBy('observer')
        .value()

    const fs = _(groups)
      .map((d, key) => {

        const timeStamps = _.map(d, 'updated_at')
        const firstObservationTimeStamp = _.min(timeStamps)
        const activeDays = moment(_.max(timeStamps)).diff(firstObservationTimeStamp, 'day')
        const daysSinceFirstObservation = _.map(timeStamps, (t) => moment(t).diff(firstObservationTimeStamp, 'day'))

        return {
          id: key,
          activeDays,
          daysSinceFirstObservation
        }
      })
      .sortBy('activeDays')
      .reverse()
      .value()

    console.log('fs', fs)
    return {
      people: fs,
      summary: {
        numberOfPeople: fs.length
      }
    }
  }

  render(){

    const features = this.computeFeatures()

    const Person = ({data}) => {

      const IndividualObservations = ({daysArray}) =>
        <Layer>
          {
            _.map(daysArray, (d) => {
              return <Dot cx={d} cy={2} r={1} fill="#333333"/>
            })
          }
        </Layer>

      const ActiveDuration = ({days}) =>
        <Rectangle x={0} y={0} width={days} height={5} fill="#00ff73"/>

      return <Layer>
        <Dot cx={2.5} cy={-3} r={2.5} fill="#ff7300"/>
        <ActiveDuration days={data.activeDays}/>
        <IndividualObservations daysArray={data.daysSinceFirstObservation}/>
      </Layer>
    }

    const people = _.map(features.people, (d, i)=>{
      return <Layer transform={`translate(0, ${i*6})`}>
          <Person data={d}/>
        </Layer>
    })

    const grid = <Layer>
        { _.map([100,200,300], (x) => {
            return <g>
              <Curve type='linear' points={[{x,y:0},{x,y:380}]} stroke="#aaaaaa"/>
              <text x={x+2} y={380}>{x} days</text>
            </g>
        })}
    </Layer>

    return <div style={{width:'100%', height:'100%'}}>
      <div>
        { features.summary.numberOfPeople } users
      </div>
      <Surface width={800} height={400}>
        { people }
        { grid }
      </Surface>
      <div>
      This is a custom visualization to show the active period of each user. The
      active period is defined as the period between the first and the
      most recent observation. The length of the period is represented by the
      length of each horizontal bar. The first observation is represented by
      a large, orange dot. Each subsequent observation is represented by a
      small, black dot.
      </div>
    </div>
  }
}


import {Grid, Row, Col} from 'react-flexbox-grid'
import { Tile } from './common'

@pure
export default class ObservationsViz extends Component {

	render () {
    const { data } = this.props
    if (!data)
      return <div>Loading...</div>
    else
      return <Row>
        <Tile title='Observations by months'>
            <ObservationsOverTime data={data} unit='month'/>
        </Tile>
        <Tile title='Observations by days'>
            <ObservationsOverTime data={data} unit='day'/>
        </Tile>
        <Tile title='User active period based on observations'>
            <ObservationsByUsers data={data}/>
        </Tile>
      </Row>
  }
}
