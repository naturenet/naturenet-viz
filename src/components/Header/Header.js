import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'


import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors'

export const Header = () =>
  <AppBar
    style={{
      backgroundColor: Colors.lightGreen800
    }}
    title="NatureNet: Research Viz"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />


  // <div>
  //   <h1>NatureNet - Research Data Visualization </h1>
  //   <IndexLink to='/' activeClassName={classes.activeRoute}>
  //     Home
  //   </IndexLink>
  //   {' · '}
  //   <Link to='/Viz' activeClassName={classes.activeRoute}>
  //     Viz
  //   </Link>
  // </div>

export default Header
