
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button,  CardActionArea, CardActions } from '@mui/material';
import DayJS from 'react-dayjs';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import "../../assets/css/cardmodule.css"
function RowDetailsFront({label, image  }) {
  var connectedUser = useSelector(selectConnectedUser)
  return (
    <div class="pricing-header">
    <h4 class="plan-title">{label}</h4>
    <div ><img src={require('../../assets/uploads/module/' + image)} alt="" style={{ height: "200px", width: "330px" }} />
    </div>
  </div>
  )
}

export default RowDetailsFront