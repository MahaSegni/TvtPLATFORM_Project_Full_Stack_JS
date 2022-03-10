import styled from "styled-components";
import { useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";

export default function AddEvaluation(props){
 
  let myCurrentDate = new Date();
  const history = useHistory();
 /* let fileName;
  console.log(req.file) ;
  if (req.file !== null) {
  fileName = Math.floor(Math.random()* Date.now())  + ".jpg";
 
  file !== null ? "assets/uploads/evaluation" + fileName : ""
  */
 

       const[formData,setFormData] = useState({
            title:"",
            date:myCurrentDate.toDateString(),
            image:"",
       }) 
       const[FormDataimage,setFormDataimage] = useState({
       image:"",
   }) 
       const [errors,setErrors] = useState({visbile:false,message:""});
       const onChange = (e) => {
           setFormData({...formData,[e.target.name]:e.target.value})
       }
       const onChangeFile = (e) => {
        //fileName ="../../assets/uploads/evaluation"+ Math.floor(Math.random()* Date.now())  + ".jpg";
        //setFormData({...formData,image:fileName})
       // setFormDataimage({...FormDataimage,image:e.target.files[0]})
       }
       const onSubmit = async (e) =>{
        
          e.preventDefault();
          history.push('/evaluations')
          const [result,err] = await queryApi('evaluation/add',formData,"POST",false);
          //console.log(formData);  
       }
       
       const {title,date,image}= formData;
       const {}= FormDataimage;
   return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    {errors.visbile && <FormError>{errors.message}</FormError>}
                </FormGroup>
                <FormGroup>
                    <FormField
                        type='text'
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(e)=>onChange(e)}
                        >                   
                    </FormField>
                </FormGroup>
          
                <FormGroup>
                    <FormField
                        type='file'
                        name="image"
                        onChange={(e)=>onChangeFile(e)}
                        >                   
                    </FormField>
                </FormGroup>
                <FormButton>Save</FormButton>
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