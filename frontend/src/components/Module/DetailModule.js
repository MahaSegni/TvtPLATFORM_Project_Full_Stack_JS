
import { Avatar, CardMedia, ListItem, ListItemAvatar, ListItemText, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DayJS from 'react-dayjs';

import "../../assets/css/cardDetailModule.css"
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
export default function DetailModule({ id }) {
  var connectedUser = useSelector(selectConnectedUser)
  let history = useHistory();
  const [form, setForm] = useState({});
  function handleClick() {
    history.push("/signin");
  }


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/module/getById/${id}`, { method: 'GET', })
      .then(res => res.json())
      .then(
        (data) => {
          setForm(data);
          console.log("data", data);
        }
      )
  }, [])
  return (
    <div class="container">

      <div class="product-content product-wrap clearfix product-deatil">
        <div class="row">
          <div class="col-md-5 col-sm-12 col-xs-12">
            <div class="product-image">
              <div id="myCarousel-2" class="carousel slide">




                <img src={require('../../assets/uploads/module/course-1.jpg' )}  class="img-responsive" alt="" style={{ height: "200px", width: "330px" }} />



              </div>
            </div>
          </div>

          <div class="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
            <h2 class="name">
              <p>{form.label}</p>

              <i class="fa fa-star fa-2x text-primary"></i>
              <i class="fa fa-star fa-2x text-primary"></i>
              <i class="fa fa-star fa-2x text-primary"></i>
              <i class="fa fa-star fa-2x text-primary"></i>
              <i class="fa fa-star fa-2x text-muted"></i>
              <span class="fa fa-2x"><h5>(109) Votes</h5></span>

            </h2>
            <hr />

            <div >

              <span>Created  &nbsp; 
             
          <DayJS element="span" asString={ true }>
          {form.date_creation}
          </DayJS></span> 
            </div>
            <hr />
            <div class="description description-tabs">

              <span href="#more-information" data-toggle="tab" class="no-margin">Module Description <br /> {form.description} </span>
              <hr />
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  {connectedUser.type=="user" && <a  class="btn btn-template btn-lg">Show courses</a>}
                  {connectedUser.type=="disconnected" && <a  class="btn btn-template btn-lg" onClick={handleClick}>join</a>}
                </div>
                
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      );
}







































