
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, toggleButtonClasses } from '@mui/material';
import DayJS from 'react-dayjs';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import "../../assets/css/cardmodule.css"
import axios from 'axios';
import { queryApi } from '../../utils/queryApi';
function RowDetailsFront({ props, label, image, idowner, module, refStudents, id, rating }) {
  const [calculdone, setcalculdone] = useState(false)
  var connectedUser = useSelector(selectConnectedUser)
  const [tot, setTot] = useState({
    ratetot: 0,
  });
  const join = async (id__) => {
    await queryApi('module/adduser/' + id + '/' + connectedUser.id, null, 'PUT', false);
    window.location.reload(true);
  }


  useEffect(() => {
    let sum = 0;
    if (rating?.length != 0) {

      for (let i = 0; i < rating?.length; i++) {
        sum += rating[i].ratemodule;
      }
      let moy = sum / (rating?.length);
      tot.ratetot = parseInt(moy, 10);
      setcalculdone(true)
    } else {
      tot.ratetot = parseInt(0, 10);
      setcalculdone(true)
    }



  })


  return (
    <>
      <div  >
        {image != null &&
          <img class="img-fluid" alt="..." src={image} style={{ height: "200px", width: "400px" }} />
        }
        {image == null &&
          <img class="img-fluid" src="https://res.cloudinary.com/tvtplatform/image/upload/v1651755026/jqozldif65ylqudwzm2u.jpg" alt="" style={{ height: "200px", width: "400px" }} />}
      </div>
      <div class="course-content">


        <h3><a style={{ fontFamily: "sans-serif" }}>{label?.toUpperCase()}</a></h3>

        <div class="trainer d-flex justify-content-between align-items-center">
          <div class="trainer-profile d-flex align-items-center">
            <img class="img-fluid" alt="" />

          </div>
          <div class="trainer-rank d-flex align-items-center">
            <i class="fa fa-users" style={{ color: "green" }}></i>&nbsp;{refStudents.length}
            &nbsp;&nbsp;


            <i class="fa fa-heart" style={{ color: "red" }}></i>&nbsp; {calculdone && tot.ratetot}
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