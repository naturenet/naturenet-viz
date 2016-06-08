import React, { Component } from 'react'
import classes from './Counter.scss'
import _ from 'lodash'


import ActivitiesViz from './ActivitiesViz'
import ObservationsViz from './ObservationsViz'

export const Counter = ({increment, doubleAsync, counter, loadData, data}) =>
  <div>
    { data && <ObservationsViz data={data.observations}/> }
    { data && <ActivitiesViz data={data.activities}/> }
  </div>

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
