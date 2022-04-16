
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DayJS from 'react-dayjs';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import "../../assets/css/cardmodule.css"
import axios from 'axios';
function RowDetailsFront({ label, image, idowner, refStudents ,id }) {

  var connectedUser = useSelector(selectConnectedUser)

  const join = (id__) => {
    axios.put(`http://localhost:3000/api/module/adduser/${id__}/${connectedUser.id}`)
      .then(res => {
        window.location.reload(true);
      })
      
  }

  return (
    <>
      <div  >
      {image != null &&
         <img class="img-fluid" alt="..." src={require('../../assets/uploads/module/' + image)} style={{ height: "200px", width: "330px" }} />
        }
      {image == null &&
        <img class="img-fluid" src={require('../../assets/img/Courses.jpg')} alt="" style={{ height: "200px", width: "400px" }} />}
    </div>
        <div class="course-content">


          <h3><a >{label}</a></h3>

          <div class="trainer d-flex justify-content-between align-items-center">
            <div class="trainer-profile d-flex align-items-center">
              <img class="img-fluid" alt="" />
             
            </div>
            <div class="trainer-rank d-flex align-items-center">
              <i class="fa fa-users" style={{ color: "green" }}></i>&nbsp;{refStudents.length}
              &nbsp;&nbsp;
              <i class="fa fa-heart" style={{ color: "red" }}></i>&nbsp;65
            </div>

          </div>

        </div>
        </>

  )
}

export default RowDetailsFront

/*
    <div class="pricing-header">
    <h4 class="plan-title">{label}</h4>
    <div >
      {image != null &&
        <img src={require('../../assets/uploads/module/' + image)} alt="" style={{ height: "200px", width: "330px" }} />}
      {image == null &&
        <img src={require('../../assets/img/Courses.jpg')} alt="" style={{ height: "200px", width: "330px" }} />}
    </div>
  </div>*/