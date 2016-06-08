import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import { IndexLink, Link } from 'react-router'

import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-flexbox-grid'

export const HomeView = () => (
  <Grid>
      <Paper style={{padding:10}}>
        <h4>Welcome!</h4>
        <Link to="/Viz">Visualization</Link>
      </Paper>
  </Grid>
)

export default HomeView
