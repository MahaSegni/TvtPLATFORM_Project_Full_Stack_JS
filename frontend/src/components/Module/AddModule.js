import styled from "styled-components";
import { useEffect, useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import React from 'react';
import "../../assets/css/cardmodule.css"

import Select from '@mui/material/Select';
import * as yup from "yup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { InputLabel, MenuItem } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const schema = yup.object({
  label: yup.string().required().max(30),
}).required();
export default function AddModule({ props, add, reload }) {
  var fileName = "";
  let myCurrentDate = new Date();
  const history = useHistory();
  var connectedUser = useSelector(selectConnectedUser)
  const [ckedtiorValue, setckedtiorValue] = useState("");
  const [ckedtiorValide, setckedtiorValide] = useState(false);
  const [ckedtiormessage, setckedtiormessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    date_creation: myCurrentDate.toDateString(),
    image: "",
    idowner: connectedUser.id,
  })
  const [categoryid, setcategoryid] = useState("");
  const [category, setCategory] = useState([]);

  const handleChange = (event) => {
    setcategoryid(event.target.value);

  };
  useEffect(async () => {
    const [ca, err] = await queryApi('category/get', null, 'GET', false);
    setCategory(ca);
  }, [])

  const addModuleToCategory = async (id, idModule) => {
    const [, err] = await queryApi('category/addmoduletocategory/' + id + '/' + idModule, null, "PATCH ", false);
    //axios.patch(`http://localhost:3000/api/category/addmoduletocategory/${id}/${idModule}`)
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const [uploadImage, setUploadImage] = useState({
    image: ""
  })
  const onChangeFile = (e) => {
    setUploadImage({ ...uploadImage, image: e.target.files[0] })
  }

  const refresh = async (e) => {
    window.location.reload(true);
  }

  const onSubmit = async (e) => {
    formData.description = ckedtiorValue;
    let result = await updateModule()
    addModuleToCategory(categoryid, result.result._id);
    window.location.reload(true);
  }
  const updateModule = async () => {
    const [result, err2] = await queryApi('module/add', formData, "POST", false, connectedUser.token)
    if (uploadImage.image != "") {
      const [imageResult, err] = await queryApi('module/uploadPicture/' + result.result._id, uploadImage, "PUT", true, connectedUser.token)
    }
    return result
  }

  const { label, description, date_creation } = formData;
  ;
  return (
    <Wrapper>
      <Form class=" mx-auto" onSubmit={handleSubmit(onSubmit)} style={{ border: "2px solid #5FCF80", padding: 40, borderRadius: 30, width: "100%", marginBottom: 15, boxShadow: "2px 2px 2px #5FCF80" }}>
        <h4 class="logo  " style={{ textAlign: "center", color: "#5fcf80" }}>Add Module</h4>
        <div class="form-group">
        </div>
        <div class="form-group">
          <input style={{ marginTop: 30 }} class="form-control" placeholder="Label"
            type='text'
            name="label"
            value={label}
            {...register("label")}
            onChange={(e) => onChange(e)} />
          <div class="alert alert-danger" role="alert" hidden={!errors.title}>
            {errors.label}
          </div>
        </div>
        <div class="form-group my-3">
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setckedtiorValue(data);

              if (data.length == 0) {
                setckedtiormessage("texte is required");
                setckedtiorValide(false);
              } else {
                setckedtiormessage("");
                setckedtiorValide(true);
              }
              console.log(ckedtiorValide)

            }
            }
          />
        </div>

        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={categoryid}
          onChange={handleChange}
          autoWidth
          label="categoryid"
        >

          {category.map(({ label, _id }) => (
            <MenuItem value={_id}>{label}</MenuItem>
          ))}
        </Select>
        <FormGroup>
          <label for="file" class="label-file">Choose image</label>
          <input id="file" class="input-file"
            type='file'
            name="image"
            onChange={(e) => onChangeFile(e)}
          />
        </FormGroup>

        <div className="mt-3 text-center" >
          <button type="submit" className="btn btn-md btn-template" style={{ marginRight: "2%" }} disabled={!ckedtiorValide}>Save</button>
          <button className="btn btn-md btn-update" id="cancelBtn" type="reset" onClick={refresh} >Cancel</button>
        </div>
      </Form>
    </Wrapper>
  );
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


























/** 
import InputGroup from "./InputGroup";
import RowDetails from "./RowDetails";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Alert from "./Alert"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
export default function Add() {
  const history = useHistory();
  
 var connectedUser = useSelector(selectConnectedUser)

const [form, setForm] = useState({});
const [errors, setErrors] = useState({});
const [message, setMessage] = useState(""); 
const [show, setShow] = useState(false);
const onChangeHandler = (e) => {
  setForm({
    ...form,
   
    [e.target.name]: e.target.value
  });
};
const onSubmitHandler = (e) => {
  e.preventDefault();
  form.idowner= connectedUser.id;
  axios.post('http://localhost:3000/api/module/', form)
    .then(res => {
      setMessage(res.data.message)
      console.log(form)
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
         <InputGroup label="Image" name="image" onChangeHandler={onChangeHandler}/>
         
      
         <button type="submit" class="ms-auto my-2 btn get-started-btn" >Submit</button>
       </form>
     </div>
   
  );
}

*/






















