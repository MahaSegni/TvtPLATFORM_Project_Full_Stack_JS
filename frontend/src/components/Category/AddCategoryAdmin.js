

import axios from "axios";
import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

export default function Add() {
  // ajout 
const [form, setForm] = useState({});
const [errors, setErrors] = useState({});
const onChangeHandler = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });

};
const onSubmitHandler = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3000/api/category/', form)
      
    .catch(err=>setErrors(err.response.data))
}
   return (
       <div class="my-5">
       <h1 class="logo mx-auto" style={{ textAlign: "center", color: "#5fcf80" }}>Category </h1>
   
       <form class="w-50 mx-auto" onSubmit={onSubmitHandler}>

       
         

         <button type="submit" class="ms-auto my-2 btn get-started-btn"><Link to={'/modulefront'} style={{ textAlign: "center", color: "black" }} >Submit</Link></button>
       </form>
     </div>
   
  );
}
























