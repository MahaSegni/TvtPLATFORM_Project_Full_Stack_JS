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
  const [fileuploaded,setfileuploaded]=useState(false)
  const [uploadImage, setUploadImage] = useState({image:""})
  const [imgSrc,setimgSrc]=useState()

  
  const[formData,setFormData] = useState({
    title:"",
    date:myCurrentDate.toDateString()
  }) 
      
      
  
  const [errors,setErrors] = useState({visbile:false,message:""});
  const onChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

    const onChangeFile = (e) => {  setfileuploaded(true)
      var file =  e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
  
    reader.onloadend = function (e) {
      setimgSrc(reader.result) }.bind(this);
     setUploadImage({ ...uploadImage, image: e.target.files[0] })}
      
       const onSubmit = async (e) =>{
        e.preventDefault();
        if (fileuploaded){
        const [result,err] = await queryApi('evaluation/add/'+ idModule,formData,"POST",false);
        if(!err){
         await queryApi('evaluation/upload/'+ result,uploadImage,"PUT",true);}}
        else {const [result,err] = await queryApi('evaluation/add/'+ idModule,formData,"POST",false);}
        reload();
         add(false);
       }
       
       const {title,date}= formData;
 
   return (
            <Wrapper style={{marginTop:"2%"}}>
              <Form class="w-50 mx-auto" onSubmit={onSubmit} style={{border: "2px solid #5FCF80" ,padding:30, borderRadius:30, width:"84%", marginBottom:10, boxShadow:"2px 2px 2px #5FCF80"}}>
              <h4 class="logo  " style={{ textAlign: "center", color: "#5fcf80", fontSize:"200%"  }}>Add evaluation</h4>
                  <div class="form-group">
                      {errors.visbile && <FormError>{errors.message}</FormError>}
                  </div>
                  <div class="form-group">
                    <input style={{ marginTop:30 }} class="form-control" placeholder="Title" 
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
                      {fileuploaded &&
                      <center><img src={imgSrc} style={{height:"50%", width:"50%"}} /></center>}
                  </FormGroup>
                  <div className="mt-3 text-center" >
                    <button type="submit" className="btn btn-md btn-template" style={{marginRight:"2%"}}>Save</button>
                    <button className="btn btn-md btn-template" id="cancelBtn" type="reset" onClick={()=> add(false)}>Cancel</button>
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
 
 color: black;
`;
const FormGroup = styled.div`
 margin: 10px 0;
 display: flex;
 flex-direction: column;
`;
const Form = styled.form`

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