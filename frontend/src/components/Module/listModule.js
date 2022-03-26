
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DayJS from 'react-dayjs';
import ListCategory from "../Category/ListCategory";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function listModule() {
 
  const [modules, setModules] = useState([]);
 const [errors, setErrors] = useState({});
  const [add, setAdd] = useState(false);
  let idu = "";
  const [addUser, setAddUser] = useState(false);
  const [update, setUpdate] = useState(false);
  const [show, setshow] = useState(false);
  const [modelshow, setmodelshow] = useState(false);
  
  const [category, setCategoory] = useState([]);
  const [formShowDetail, setFormShowDetail] = useState({});
  const [selectedId, SetselectedId] = useState(-1);
  const [categoryid, setcategoryid] = React.useState('');
  var connectedUser = useSelector(selectConnectedUser)
  const history = useHistory();
  const [token, errtoken, reloadToken] =  useApi('module/getToken/'+ connectedUser.id, null, 'GET', false, connectedUser.token);
  if(token=="authorization failed"){
    history.push('/signin')
  }

  const [valuee, setValuee] = React.useState(0);


  const categoryhandleChange = (event, newValue) => {
    setValuee(newValue);
  };
  const join = (id__) => {
    axios.put(`http://localhost:3000/api/module/adduser/${id__}/${connectedUser.id}`)
      .then(res => {
        window.location.reload(true);
      })
      .then(
        (data) => {
          setAddUser(true);
        })
  }


  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this module")) {

      axios.delete(`http://localhost:3000/api/module/delete/${id__}`)
        .then(res => {
          window.location.reload(true);
        })
    }
  }
  const getowner = (idModule) => {
    useApi('module/getOwner/' + connectedUser.id + '/' + idModule, null, 'GET', false);
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showdetails = (id__) => {
    setshow(true);
    axios.get(`http://localhost:3000/api/module/getById/${id__}`)
      .then(res => {
        setFormShowDetail(res);
      })
  }
  const handleChangee = (event) => {
    setmodelshow(false)
    
    setcategoryid(event.target.value);
    console.log(event.target.value)
    if(event.target.value!=""){
      
    setmodelshow(true)}
   // getbycat(categoryid);
    console.log(categoryid)
  };
  /* find all modules */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/module/get').then(res => {
      setModules(res.data)
    })
    await axios.get('http://localhost:3000/api/category/get').then(resu => {
      setCategoory(resu.data)
    })
  }, [])
  // affichage category 
  /*
                  <ul className="pl-0">
                    {category.map((category)=>(
                      <ul style={{cursor: 'pointer', listStyleType : 'none'}} 
                      key={category} onClick={()=> setCategoory(category)}>
                          {category.label}
                      </ul>
                    )
                      )}
                  </ul>
                  */

  return connectedUser.type == "user" ? (
    // connectedUser.id === "622cc35c8704627ac3801c98" ?(
    <div class="container ">

      <Box sx={{ width: '95%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs ">
            <Tab label="Modules" {...a11yProps(0)} />
            <Tab label="My Modules" {...a11yProps(1)} />
            <Tab label="Add New Module" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Box>

      <div >
        <TabPanel value={value} index={1}>
        <div class="container content">

          <div class="row gutters">

            {
              modules.map(({ label, description, date_creation, _id, idowner, statusModule, image }) => {
                if (idowner == connectedUser.id) {
                  return (


                    <>
                      {update == false &&

                        <div class="col-lg-4 col-md-4 col-sm-12">
                          <div class="plan-card plan-one">
                            <RowDetailsFront label={label} image={image} />
                            <div class="plan-footer">
                              <a class="btn btn-delete m-2 pull-left " onClick={() => OnDelete(_id)} >Delete
                                <i class="fa fa-trash"></i>
                              </a>
                              <a class="btn btn-update m-2  " onClick={() => {
                                setUpdate(!update)
                                SetselectedId(_id)
                              }}>Update </a>
                              <a class="btn btn-template m-1 pull-right " onClick={statusModule ? 'publish' : 'deja'} >Publish <i class="fa fa-google-plus"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      }
                    </>
                  )
                }
              })}
          </div>
        </div>
      </TabPanel>
        {update == true &&
          <UpdateModule idu={selectedId}  tabindex={TabPanel} />}
      </div>

      <div >
        <TabPanel value={value} index={0}>

          <div class=" col-lg-2 col-md-2 ">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
               
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryid}
                autoWidth
                label="Category"
                onChange={handleChangee}
              >
                <MenuItem value="">All</MenuItem>
                {category.map(({ label, _id }) => (
                  <MenuItem value={_id}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
          </div>
          <div class="container content">

            <div class="row gutters">
              <br />
              {categoryid == "" && modules&& 
                modules.map(({ label, description, date_creation, _id, idowner, statusModule, image, refStudents }) => {
                  if (idowner != connectedUser.id) {
                    return (
                      <>
                        {show == false && update == false &&
                          <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="plan-card plan-one">
                              <RowDetailsFront label={label} image={image} />
                              <div class="plan-footer">
                                {!refStudents.includes(connectedUser.id) &&
                                  <a class="btn btn-update m-2 pull-left  " onClick={() => join(_id)} >
                                    Join
                                  </a >}
                                {refStudents.includes(connectedUser.id) &&
                                  <a class="btn btn-update m-2 pull-left " onClick={() => join(_id)} >
                                    Show more
                                  </a>}
                                <a class="btn btn-delete m-2 pull-right " onClick={() => {
                                  setshow(!show)
                                  SetselectedId(_id)
                                }} >Details</a>
                                <a > .</a>
                              </div>
                            </div>
                          </div>
                        }
                      </>
                    )
                  }
                })}
                {categoryid != "" && modelshow==true && show==false&&
                 <>
                 <ModuleByCat cat={categoryid} showmodel={setmodelshow} ></ModuleByCat>
                 </>
                }
           


            </div></div></TabPanel>
        {
          show == true && update == false && <DetailModule id={selectedId} />
        }
      </div>

      <TabPanel value={value} index={2}>
        <AddModule> </AddModule>
      </TabPanel>
    </div>

  ) : connectedUser.type == "disconnected" ? (
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
          show == true && update == false && <DetailModule id={selectedId} />
        }
      </div>
    </div>
  ) : (
    <h1>problem happened</h1>
  )
}

