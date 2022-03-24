import styled from "styled-components";
import {useEffect, useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import React from 'react';
export default function UpdateModule({props, update, idu, reload}){
    let id = idu;

    console.log(idu)
    var fileName = ""; 
  let myCurrentDate = new Date();
  const history = useHistory();

  const [module, setModule] = useState({});
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/module/getById/${idu}`, { method: 'GET', })
      .then(res => res.json())
      .then(
        (data) => {
          setModule(data);
          console.log("data",data);
        }
      )
  }, [])

       const [errors,setErrors] = useState({visbile:false,message:""});
         const onChange = (e) => {
            setModule({...module,[e.target.name]:e.target.value})
       }
       
        const refresh= async (e) =>{
       
          window.location.reload(true);
        }
        const onSubmit = async (e) =>{
              e.preventDefault();
               await queryApi('module/update', module, "PUT", false);
            // await fetch(`${process.env.REACT_APP_API_URL}/module/update`,module,"PUT",false)
            //  await queryApi('module/update', module, "PUT", false);
             // window.location.reload(true);
           }
       const {label,description,date_update}= module;
      
;
   return (
            <Wrapper>
              <Form class="w-50 mx-auto" onSubmit={onSubmit} style={{border: "2px solid #5FCF80" ,padding:40, borderRadius:30, width:"84%", marginBottom:15, boxShadow:"2px 2px 2px #5FCF80"}}>
              <h4 class="logo  " style={{ textAlign: "center", color: "#5fcf80" }}>update Module</h4>
                  <div class="form-group">
                      {errors.visbile && <FormError>{errors.message}</FormError>}
                  </div>
                  <div class="form-group">
                    <input style={{ marginTop:30 }} class="form-control" placeholder="Label" 
                            type='text'
                            name="label"
                            value={label}
                            onChange={(e)=>onChange(e)} />
                  </div>
                  <div class="form-group">
                    <input style={{ marginTop:30 }} class="form-control" placeholder="Description" 
                            type='text'
                            name="description"
                            value={description}
                            onChange={(e)=>onChange(e)} />
                  </div>
                  <FormGroup>
                      <FormField
                          type='file'
                          name="image"
                          onChange={(e)=>onChange(e)}
                          >                   
                      </FormField>
                  </FormGroup>
                  <div className="mt-3 text-center" >
                    <button type="submit" className="btn btn-md btn-template" style={{marginRight:"2%"}}>Save</button>
                    <button className="btn btn-md btn-template" id="cancelBtn" type="reset" onClick={refresh}  >Cancel</button>
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

























