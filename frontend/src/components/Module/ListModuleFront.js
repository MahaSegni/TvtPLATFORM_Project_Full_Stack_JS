import InputGroup from "./InputGroup";
import RowDetailFront from "./RowDetailFront";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Alert from "./Alert"
import { Link } from "react-router-dom";
import ListCategory from "../Category/ListCategory";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ListModuleFront() {
  const [modules, setModules] = useState([]);
  const [category, setCategory] = useState([]);
 


  /* find all modules */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/module/').then(res => {
      setModules(res.data)
    })
  },[])
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/category/').then(res => {
        setCategory(res.data)
    })
  },[])
  return (
   
    
     
      <div class="container ">
          {
              
                <ListCategory   />

             
            } 
      <div class="card-group">
  
  {
              modules.map(({ label, description, date_creation , _id }) => (
                <RowDetailFront label={label} description={description} date_creation={date_creation} Id={_id}  />

              ))
            }
            
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

