import InputGroup from "./InputGroup";
import RowDetails from "./RowDetails";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Alert from "./Alert"
import { Link } from "react-router-dom";

import ListCategory from "../Category/ListCategory";
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function ListModule() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({});
 const [errors, setErrors] = useState({});
 const [message, setMessage] = useState(""); /* message alert*/ 
 const [show, setShow] = useState(false); /* affichage de l'alerte */

   /* delete */
   const OnDelete = (id__)=>{
    if(window.confirm("are you sure to delete this module")){
 
     axios.delete(`http://localhost:3000/api/module/${id__}`)
     .then(res=>{
      setMessage("Module deleted with success")
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
      window.location.reload(true);
     })
    }
   }



  /* find all modules */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/module/').then(res => {
      setModules(res.data)
    })
  },[])
  return (
    <div class="container ">
      <Button size="small" color="inherit" variant="contained">
      <Link to={'/module/add'}> Add Module </Link>
        </Button>
   
     
     
        <div >
          {
              
                <ListCategory   />

             
            } 
      <div class="container ">
      <div class="card-group">
  
  {
              modules.map(({ label, description, date_creation , _id }) => (
                <RowDetails label={label} description={description} date_creation={date_creation} Id={_id} OnDelete={OnDelete} />

              ))
            }
  </div>
</div>
  </div>
 
  <div className="d-flex justify-content-center">
  <Stack spacing={2}>
     
      <Pagination count={10} color="primary" />
      
    </Stack>
    </div>
  <br></br>
  </div>
  );
}

