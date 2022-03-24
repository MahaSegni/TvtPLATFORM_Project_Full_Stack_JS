

import axios from "axios";
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import styled from "styled-components";
export default function ListCategory() {
  const [category, setCategory] = useState([]);
  var connectedUser = useSelector(selectConnectedUser)
  const [form, setForm] = useState({label: "",image:""});
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const onSubmitHandler = (e) => {
   // e.preventDefault();
    axios.post('http://localhost:3000/api/category/', form)
        
      .catch(err=>setErrors(err.response.data))
  }

  /* find all cat */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/category/get').then(res => {
        setCategory(res.data)
    })
  },[])
  const { label, image } = form;
  return  connectedUser.type == "admin" ?(
    <div>
    <div>
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
</div>
<div>
<Wrapper>
      <Form class=" mx-auto" onSubmitHandler={onSubmitHandler()} style={{ border: "2px solid #5FCF80", padding: 40, borderRadius: 30, width: "100%", marginBottom: 15, boxShadow: "2px 2px 2px #5FCF80" }}>
        <h4 class="logo" style={{ textAlign: "center", color: "#5fcf80" }}>Add category</h4>
        <div class="form-group">

        </div>
        <div class="form-group">
          <input style={{ marginTop: 30 }} class="form-control" placeholder="Label"
            type='text'
            name="label"
            value={label}
            onChange={(e) => onChange(e)} />
         
        </div>
        
        <FormGroup>
          <FormField
            type='file'
            name="image"
            onChange={(e) => onChange(e)}
          >
          </FormField>
        </FormGroup>
        <div className="mt-3 text-center" >
          <button type="submit" className="btn btn-md btn-template" style={{ marginRight: "2%" }}>Save</button>
         </div>
      </Form>
    </Wrapper>
    </div>
    </div>
 
   ) : (
    <h1>problem happened</h1>
  )
}

const FormButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")
  };
  color: #5FCF80;

  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #5FCF80;
  border-radius: 3px;
`;
const Wrapper = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;


 
`;
const Title = styled.h2`
 text-transform: uppercase;
 color: black;
`;
const FormGroup = styled.div`
 margin: 10px 0;
 display: flex;
 flex-direction: column;
`;
const Form = styled.form`
 text-transform: uppercase;
 color: black;
 display: flex;
 flex-direction: column;
 width: 33%;
 align-self: center;
`;
const FormField = styled.input`
 color: black;
 padding: 15px;
 outline: 0;
 border-width: 0 0 2px;
 border-color: #ebebeb;
 ::placeholder {
   text-transform: uppercase;
   font-family: "Kiona";
   font-size: large;
   letter-spacing: 0.1rem;
 }
`;
const FormError = styled.p`
 color: #f74b1b;
`;
const Spinner = () => (
  <Loader viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="2"
    />
  </Loader>
);
const Loader = styled.svg`
 animation: rotate 2s linear infinite;
 display: flex;
 align-self: center;
 width: 50px;
 height: 50px;
 & .path {
   stroke: #5652bf;
   stroke-linecap: round;
   animation: dash 1.5s ease-in-out infinite;
 }
 @keyframes rotate {
   100% {
     transform: rotate(360deg);
   }
 }
 @keyframes dash {
   0% {
     stroke-dasharray: 1, 150;
     stroke-dashoffset: 0;
   }
   50% {
     stroke-dasharray: 90, 150;
     stroke-dashoffset: -35;
   }
   100% {
     stroke-dasharray: 90, 150;
     stroke-dashoffset: -124;
   }
 }
`;

