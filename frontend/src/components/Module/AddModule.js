
import InputGroup from "./InputGroup";
import RowDetails from "./RowDetails";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Alert from "./Alert"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Add() {
  const history = useHistory();
  // ajout 
const [form, setForm] = useState({});
const [errors, setErrors] = useState({});
const [message, setMessage] = useState(""); /* message alert*/ 
const [show, setShow] = useState(false); /* affichage de l'alerte */
const onChangeHandler = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });

};
const onSubmitHandler = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3000/api/module/', form)
    .then(res => {
      setMessage(res.data.message)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
      history.push("/module")
    })
   
    .catch(err=>setErrors(err.response.data))
}
   return (
       <div class="my-5">
       <h1 class="logo mx-auto" style={{ textAlign: "center", color: "#5fcf80" }}>Modules </h1>
       <Alert message={message} show={show}/>
       <form class="w-50 mx-auto" onSubmit={onSubmitHandler}>

         <InputGroup label="Label" name="label" onChangeHandler={onChangeHandler} errors={errors.label}/>
         <InputGroup label="Description" name="description" onChangeHandler={onChangeHandler} errors={errors.description}/>
         <InputGroup label="Image" name="image" onChangeHandler={onChangeHandler} />

         <button type="submit" class="ms-auto my-2 btn get-started-btn" >Submit</button>
       </form>
     </div>
   
  );
}
























