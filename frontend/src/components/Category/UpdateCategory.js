import styled from "styled-components";
import { useEffect, useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";

import "../../assets/css/cardmodule.css"
import InputGroup from "./InputGroup";
import Alert from "./Alert";
import { FormGroup } from "@mui/material";
export default function UpdateCategory({ idu }) {
  
    const [form, setForm] = useState({});
    const [update, setUpdate] = useState(false);
    const [errors, setErrors] = useState({});
    var connectedUser = useSelector(selectConnectedUser)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let result = await updateimageCategory()
        
       window.location.reload(true);
      }
      const updateimageCategory = async () => {
    
        const [result, err2] = await queryApi('category/update', form, "PUT", false, connectedUser.token)
        setForm({})
        setErrors({})
        setUpdate(false)
        if (uploadImage.image != "") {
          const [imageResult, err] = await queryApi('category/uploadPicture/' + result.result._id, uploadImage, "PUT", true, connectedUser.token)
    
        }
    
        return result
      }
    const onChangeHandler = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
      
    };
  
 
    const [uploadImage, setUploadImage] = useState({
        image: ""
      })
    
      const onChangeFile = (e) => {
        setUploadImage({ ...uploadImage, image: e.target.files[0] })
        //updateImage()
      }
    
    useEffect(async () => {
      await axios.get(`http://localhost:3000/api/category/get/${idu}`).then((res) => {
        setForm(res.data);
      });
    }, []);
    return (
<>
     {update==false && <div className="container mt-4 col-12 col-lg-4">
          <form onSubmit={onSubmitHandler}>
            <InputGroup
              label="label"
              type="text"
              name="label"
              onChangeHandler={onChangeHandler}
              errors={errors.label}
              value={form.label}
            />
             <FormGroup>
                  <label for="file" class="label-file">Choose image</label>
                  <input id="file" class="input-file"
                    type='file'
                    name="image"
                    onChange={(e) => onChangeFile(e)}
                  />
                </FormGroup>
            
            <button className="btn btn-template" type="submit">Update category</button>
          </form>
        </div>}
        </>
    )
  }

