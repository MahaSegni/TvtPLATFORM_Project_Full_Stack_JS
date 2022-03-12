
import InputGroup from "./InputGroup";
import axios from "axios";
import React, {  useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


export default function DetailModule() {
  const history = useHistory();
  const [form, setForm] = useState({});
 const {id} = useParams();
 const [errors, setErrors] = useState({});
 const onChangeHandler = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
  
 };
 
 const onSubmitHandler = (e)=>{
  e.preventDefault();
  axios.put(`http://localhost:3000/api/module/${id}`, form)
  .then(res=>{
    history.push("/module")
  })
  .catch(err=>setErrors(err.response.data))
  
 }
 
 useEffect(async () => {
  await axios.get(`http://localhost:3000/api/module/${id}`).then((res) => {
    setForm(res.data);
  });
 }, []);
 return (
  <div className="container mt-4 col-12 col-lg-4">
          <h1 class="logo mx-auto" style={{ textAlign: "center", color: "#5fcf80" }}>Module update </h1>
         
          <form class="w-50 mx-auto" onSubmit={onSubmitHandler}>
 
              <InputGroup label="Label" name="label" onChangeHandler={onChangeHandler} errors={errors.label} value={form.label} />
              <InputGroup label="Description" name="description" onChangeHandler={onChangeHandler} errors={errors.description}  value={form.description}/>
              <InputGroup label="Image" name="image" onChangeHandler={onChangeHandler} value={form.image}/>
 
              <button type="submit" class="ms-auto my-2 btn get-started-btn">Submit</button>
          </form>
      </div>

      
  
  );
}







































