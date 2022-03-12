

import axios from "axios";
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, InputLabel } from "@mui/material";

export default function ListCategory() {
  const [category, setCategory] = useState([]);



  /* find all cat */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/category/').then(res => {
        setCategory(res.data)
    })
  },[])
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
    <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          label="Category">
       { category.map(({ label}) => (
             
             <MenuItem >{ label}</MenuItem>
                           ))}
      
    </Select>
  </FormControl>
  </Box>
    /*
     
      <div class="container ">
         <form name="nom" size="1" className="form-inline ml-auto p-2">
         <div class="input-group">
   <select class="custom-select ">
   { category.map(({ label}) => (
             
<option >{label} </option>
              ))}
              </select>
            
             </div>
     </form>
  </div>
*/

 /*
    <div>
      <form size="1" className="form-inline ml-auto p-2">
        <div class="input-group">
    <select class="custom-select ">
    <optgroup label="Category" />
  
  {
              category.map(({ label}) => (
          <option >{label} </option>
              ))
            }
             </select>
             </div>
             </form >
          </div >*/

          
        /*  <div>
      <form size="1" className="form-inline ml-auto p-2">
        <div class="input-group">
    <select class="custom-select ">
    <optgroup label="Category" />
    {
          category.forEach(function(item){
            <option >{item.label} </option>
          })
        }
         </select>
             </div>
             </form >
          </div >
*/

 
  );
}

