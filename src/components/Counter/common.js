import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export const Tile = ({title, children}) =>
  <Col xs={12} md={6} style={{padding:20}}>
    <Card>
     <CardHeader
       title={title}
     />
     <CardText>
       {children}
     </CardText>
   </Card>
 </Col>
