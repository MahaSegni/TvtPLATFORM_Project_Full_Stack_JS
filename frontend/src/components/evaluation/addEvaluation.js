import styled from "styled-components";
import { useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../../assets/css/evaluations.css"

export default function AddEvaluation({props,idModule, add, reload}){
  var fileName = ""; 
  let myCurrentDate = new Date();
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({})
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

     const AddEvaluation=async()=>{
      if (fileuploaded){
        const [result,err] = await queryApi('evaluation/add/'+ idModule,formData,"POST",false);
        if(!err){
         await queryApi('evaluation/upload/'+ result,uploadImage,"PUT",true);}}
        else {const [result,err] = await queryApi('evaluation/add/'+ idModule,formData,"POST",false);}
        reload();
         add(false);
     }
     const validate = (values) => {
      const errors = {};
      const isValidLength = /^.{6,50}$/;
      let err = false;
      if (!values.title) {
          errors.title = "Title is required";
          err = true;
      }
      else if (!isValidLength.test(values.title)) {
        errors.title = "Title length must be between 6 and 50 caracters";
        err = true;
        }
      if (!err) {
          AddEvaluation()
      }
      return errors;
  }
      
       const onSubmit =  (e) =>{
        e.preventDefault();
        setFormErrors(validate(formData))
      
       }
      
       

       const {title,date}= formData;
 
   return (
            <Wrapper style={{marginTop:"2%"}}>
              <Form class="w-50 mx-auto" onSubmit={onSubmit} style={{border: "2px solid #5FCF80" ,padding:30, borderRadius:30, width:"84%", marginBottom:10, boxShadow:"2px 2px 2px #5FCF80"}}>
              <h4 class="logo  " style={{ textAlign: "center", color: "#5fcf80", fontSize:"200%"  }}>Add evaluation</h4>
                  <div class="form-group">
                    <input style={{ marginTop:30}} class="form-control" placeholder="Title" 
                            type='text'
                            name="title"
                            value={title}
                            onChange={(e)=>onChange(e)} />
                  </div>
                  <div class="form-group">
                    <div style={{ color: "red" }}>{formErrors.title}</div>
                  </div>
           
                  <FormGroup>
                    
                  <label for="file" class="label-file">Choose image</label>
                  <input id="file" class="input-file" 
                          type='file'
                          name="image"
                          onChange={(e)=>onChangeFile(e)}
                  />
                      {fileuploaded &&
                      <center><img src={imgSrc} style={{height:"40%", width:"50%"}} /></center>}
                  </FormGroup>
                  <div className="mt-3 text-center" >
                    <button className="btn  btn-template" style={{color:"white"}} id="cancelBtn" type="reset" onClick={()=> add(false)}>Cancel</button>
                    <button type="submit" className="btn btn-md btn-template" style={{marginLeft:"2%"}}>Save</button>
                  </div>
              </Form>
            </Wrapper>
   );
}

const Wrapper = styled.div`
 height: 100%;
 display: flex;
 flex-direction: column;
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
const FormError = styled.p`
 color: #f74b1b;
`;