import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>NatureNet - Research Data Visualization </h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/Viz' activeClassName={classes.activeRoute}>
      Viz
    </Link>
  </div>
)

export default Header
