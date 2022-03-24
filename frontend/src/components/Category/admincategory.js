import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import RowDetails from "./RowDetails";
import axios from "axios";
import Alert from "./Alert";
import { TextField } from "@mui/material";


function admincategory() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/api/category/', form)
    .then(res=>{
      setMessage(res.data.message)
      /* hide form after save */
      setForm({})
      /* hide errors after save */
      setErrors({})
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  
  /* find all users */
  useEffect(async () => {
    await axios.get("http://localhost:3000/api/category/get").then((res) => {
      setUsers(res.data);
    });
  });
  return (
    <>
    <button className="btn btn-template" type="submit" onClick={()=>setAdd(!add)}>Add Category</button>
    <div className="row p-4">
      
     {add==true && <><Alert message={message} show={show}/>
      <div className="mt-4">
        <h2>Category</h2>
      </div>
      <div className="col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="label"
            type="text"
            name="label"
            onChangeHandler={onChangeHandler}
            errors={errors.label}
          />
          <InputGroup
            label="image"
            type="text"
            name="image"
            onChangeHandler={onChangeHandler}
            errors={errors.image}
          />
         
          <button className="btn btn-template" type="submit">Add Category</button>
        </form>
      </div>
      </>
      }
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">label</th>
              <th scope="col">image</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map(({ label, image }) => (
               <tr>
               <th>{label}</th>
               <td>{image}</td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></>
  );
}

export default admincategory;
