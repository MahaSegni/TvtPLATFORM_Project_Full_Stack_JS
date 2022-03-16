import styled from "styled-components";
import { useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function AddEvaluation({props, add, reload}){
  var fileName = ""; 
  let myCurrentDate = new Date();
  let idModule="622e1c68ecacff8056ddbc18"
  const history = useHistory();

 

       const[formData,setFormData] = useState({
            title:"",
            date:myCurrentDate.toDateString(),
            image:"",
       }) 
      
  
     const [errors,setErrors] = useState({visbile:false,message:""});
       const onChange = (e) => {
           setFormData({...formData,[e.target.name]:e.target.value})
       }
       const onChangeFile =async (e) => {
        fileName=  Date.now() +  ".png";
         setFormData({...formData,image:fileName})

       
    
        }
       const onSubmit = async (e) =>{
        e.preventDefault();

      
        /*if(formData.image!=""){
        var formDataimage=new FormData();
        formDataimage.append('file',e.target.image.files[0])
        formDataimage.append('filename',formData.image)
      console.log(formDataimage.get('file'))
          
        await queryApi('upload/evaluation',formDataimage,"POST",false);
      }*/
       
          const [result,err] = await queryApi('evaluation/add/'+ idModule,formData,"POST",false);
          reload();
         add(false);
       }
       
       const {title,date,image}= formData;
;
   return (
            <Wrapper>
              <h1 class="logo mx-auto " style={{ textAlign: "center", color: "#5fcf80" }}>Add evaluation</h1>
              <Form class="w-50 mx-auto" onSubmit={onSubmit}>
                  <div class="form-group">
                      {errors.visbile && <FormError>{errors.message}</FormError>}
                  </div>
                  <div class="form-group">
                    <input class="form-control" placeholder="Title" 
                            type='text'
                            name="title"
                            value={title}
                            onChange={(e)=>onChange(e)} />
                  </div>
                  <FormGroup>
                      <FormField
                          type='file'
                          name="image"
                          onChange={(e)=>onChangeFile(e)}
                          >                   
                      </FormField>
                  </FormGroup>
                  <button class="btn btn-template">Save</button>
                  <button class="btn btn-cancel-template mt-2" onClick={()=> add(false)}>Cancel</button>
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