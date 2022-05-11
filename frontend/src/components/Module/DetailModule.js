
import { Avatar, CardMedia, ListItem, ListItemAvatar, ListItemText, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DayJS from 'react-dayjs';

import "../../assets/css/cardDetailModule.css"
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useApi } from "../../utils/useApi";
//import Rating from "./Rating";
import Rate from "./rate";
import { queryApi } from "../../utils/queryApi";
export default function DetailModule({ id }) {
  var connectedUser = useSelector(selectConnectedUser)
  let history = useHistory();
  //const [token, errtoken, reloadToken] = useApi('module/getToken/' + connectedUser.id, null, 'GET', false, connectedUser.token);
  /*if (token == "authorization failed") {
    history.push('/signin')
  }*/
  const [form, setForm] = useState({});
  function handleClick() {
    history.push("/signin");
  }
  const refresh = async (e) => {

    window.location.reload(true);
  }

  useEffect(async () => {
    const [ca, err] = await queryApi('module/getById/' + id, null, 'GET', false);
    setForm(ca);

  }, [])

  return (
    <div class="container">
      <a class="btn btn-template" onClick={refresh} ><i class="fas fa-arrow-left"></i></a>
      <div class="product-content product-wrap clearfix product-deatil">
        <div class="row">
          <div class="col-md-5 col-sm-12 col-xs-12">
            <div class="product-image">
              <div id="myCarousel-2" class="carousel slide">
                {form.image != null &&
                  <img src={form.image} alt="" class="img-responsive" style={{ height: "200px", width: "330px" }} />
                }
                {form.image == null &&
                  <img src="https://res.cloudinary.com/tvtplatform/image/upload/v1651755026/jqozldif65ylqudwzm2u.jpg" alt="" />}
              </div>
            </div>
          </div>

          <div class="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
            <h2 class="name">
              <p>{form.label}</p>

              {connectedUser.type != "disconnected" && form.refStudents?.filter(r => r == connectedUser.id).length > 0 && <>
                <Rate id={id} test={true} rat={form.rating} />
              </>
              }

            </h2>
            <hr />
            <div >

              <span>Created  &nbsp;

                <DayJS element="span" asString={true}>
                  {form.date_creation}
                </DayJS></span>
            </div>
            <hr />
            <div class="description description-tabs">

              <span href="#more-information" data-toggle="tab" class="no-margin">Module Description <br /> {form.description?.replace(/<[^>]*>/g, "")} </span>
              <hr />
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  {connectedUser.type == "user" &&
                    <a class="btn btn-template btn-lg" onClick={() => history.push("/module/" + id + "/allcours")}>Show courses</a>
                  }
                  {connectedUser.type == "disconnected" && <a class="btn btn-template btn-lg" onClick={handleClick}>join</a>}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







































