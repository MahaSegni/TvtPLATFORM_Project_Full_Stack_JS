
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DayJS from 'react-dayjs';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ModuleByCat from "./modulebyCat"
import { useSelector } from "react-redux";

import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import AddModule from "./AddModule";
import UpdateModule from "./UpdateModule";
import { useApi } from "../../utils/useApi";
import DetailModule from "./DetailModule";
import "../../assets/css/cardmodule.css"
import RowDetailsFront from "./RowDetailFront";


export default function listemodulefront() {
 
  const [modules, setModules] = useState([]);
 
  const [show, setshow] = useState(false);
 
  const [selectedId, SetselectedId] = useState(-1);

  var connectedUser = useSelector(selectConnectedUser)
 
  /* find all modules */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/module/get').then(res => {
      setModules(res.data)
    })
   
  }, [])

  return  connectedUser.type == "disconnected" ? (
    <div class="container">
      <div>
        {show == false && <div class="container content">
          <div class="row gutters">
            {modules.map(({ label, description, date_creation, _id, idowner, statusModule, image }) => {
              return (<div class="col-lg-4 col-md-4 col-sm-12">
                <div class="plan-card plan-one">
                  <RowDetailsFront label={label} image={image} />
                  <div class="plan-footer">
                    <a class="btn btn-template m-2 pull-right " onClick={() => {
                      setshow(!show)
                      SetselectedId(_id)
                    }} >
                      Show more
                    </a>
                    <a>.</a>
                  </div>
                </div>
              </div>)
            })}
          </div>
        </div>
        }{
          show == true &&<DetailModule id={selectedId} />
        }
      </div>
    </div>
  ) : (
    <h1>problem happened</h1>
  )
}

