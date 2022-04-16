
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
import $ from "jquery"
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

export default function ListModule() {

  const [modules, setModules] = useState([]);
  const [errors, setErrors] = useState({});
  const [add, setAdd] = useState(false);
  let idu = "";
  const [addUser, setAddUser] = useState(false);
  const [update, setUpdate] = useState(false);
  const [show, setshow] = useState(false);
  const [modelshow, setmodelshow] = useState(false);
  let [id, setid] = useState("");
  const [category, setCategoory] = useState([]);
  const [formShowDetail, setFormShowDetail] = useState({});
  const [selectedId, SetselectedId] = useState(-1);
  const [categoryid, setcategoryid] = useState('');
  var connectedUser = useSelector(selectConnectedUser)
  const history = useHistory();
  /*const [token, errtoken, reloadToken] = useApi('module/getToken/' + connectedUser.id, null, 'GET', false, connectedUser.token);
  if (token == "authorization failed") {
    history.push('/signin')
  }
*/
  const [valuee, setValuee] = React.useState(0);
  const [modulesbycat, err, reload] = useApi('category/getmodulesfromcategory/' + categoryid, null, 'GET', false);


  const categoryhandleChange = (event, newValue) => {
    setValuee(newValue);
  };
  const join = (id__) => {
    axios.put(`http://localhost:3000/api/module/adduser/${id__}/${connectedUser.id}`)
      .then(res => {
        history.push("/ModuleList");
      })
      .then(
        (data) => {
          setAddUser(true);
        })
  }


  function handleClick() {
    history.push("/signin");
  }
  function getback() {
    setAdd(false);
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
    if (event.target.value != "") {
      setmodelshow(true)
    }
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
  $(document).ready(function () {
    $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#mydiv ").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
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
    <div >
      <main id="main" data-aos="fade-in">
        <div class="breadcrumbs">
          <div class="container">
            <h2  >Courses</h2>
            <p style={{ color: "black" }}>Find the right online course to elevate your career to next level </p>
          </div>
        </div>


        <section id="courses" class="courses">
          <div class="mx-5 row  ">
            {add == false && <div className="col-12 col-lg-2 ">
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
            }
            {add == false &&
            <div className="col-12 col-lg-7 ms-5 pt-2 ">
              <div class="panel panel-default">
                <div class="panel-body p-t-0">
                  <div class="input-group">
                    <input type="text" id="search" name="example-input1-group2" class="form-control" placeholder="Search" />
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-effect-ripple btn-template"><i class="fa fa-search" ></i></button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
}

          </div>


          <br />
          <div class="container" data-aos="fade-up">

            <div class="row" data-aos="zoom-in" data-aos-delay="100">

              {categoryid == "" && <>
                {add == false && <>
                  {modules.map(({ label, description, date_creation, _id, idowner, statusModule, image, refStudents }) => {
                  
                    if (refStudents.filter(r=>r==connectedUser.id).length==0 && connectedUser.id != idowner) {
                      return (
                        <>
                          {<>
                            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                              <div class="course-item" id="mydiv">

                                <RowDetailsFront label={label} image={image} idowner={idowner} refStudents={refStudents} id={_id} />

                                <div class="my-2">
                                  <button type="button" class="btn btn-template ms-5" onClick={() => join(_id)}>Register now</button>
                                  <button type="button" class="btn btn-template mx-3" onClick={() => {
                                    setAdd(true)
                                    SetselectedId(_id)
                                  }}>Show more</button>
                                </div>

                              </div>
                            </div>
                          </>
                          }

                        </>
                      )
                    }

                  }

                  )}



                </>}{add == true && <>
                  <DetailModule id={selectedId} />
                </>
                }
              </>
              }


              {categoryid != "" &&
                <>

                  <ModuleByCat cat={categoryid} ></ModuleByCat>
                </>
              }

            </div>
          </div>
        </section>
      </main>
    </div>

  ) : connectedUser.type == "disconnected" ? (

    <div >
      <main id="main" data-aos="fade-in">
        <div class="breadcrumbs">
          <div class="container">
            <h2>Courses</h2>
            <p>Find the right online course to elevate your career to next level </p>
          </div>
        </div>


        <section id="courses" class="courses">
          {add == false && <div class=" col-lg-2 col-md-2 ">
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
          }
          <br />
          <div class="container" data-aos="fade-up">

            <div class="row" data-aos="zoom-in" data-aos-delay="100">

              {categoryid == "" && <>
                {add == false && <>
                  {modules.map(({ label, description, date_creation, _id, idowner, statusModule, image, refStudents }) => {

                    return (
                      <>
                        {<>
                          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                            <div class="course-item">

                              <RowDetailsFront label={label} image={image} idowner={idowner} refStudents={refStudents} id={_id} />
                              <div class="my-2">
                                <button type="button" class="btn btn-template ms-5" onClick={handleClick}>Register now</button>


                                <button type="button" class="btn btn-template mx-3" onClick={() => {
                                  setAdd(true)
                                  SetselectedId(_id)
                                }}>Show more</button>
                              </div>
                            </div>
                          </div>
                        </>
                        }

                      </>
                    )

                  }

                  )
                  }

                </>}{add == true && <>
                  <DetailModule id={selectedId} />
                </>
                }
              </>
              }

              {categoryid != "" &&
                <>

                  <ModuleByCat cat={categoryid} ></ModuleByCat>
                </>
              }


            </div>
          </div>
        </section>
      </main>
    </div>

  ) : (
    <h1>problem happened</h1>
  )
}

