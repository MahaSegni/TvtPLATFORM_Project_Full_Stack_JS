import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Switch from '@mui/material/Switch';
import AddOption from "./AddOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
/**
 
  Questions: {
    type: [
        {
          texte: String,
          QuestionType:String,

          Responses: {
              type:
            [{
                texte:String,
                correct:Boolean,
                idUsers:[String],


              }]
          },
        }
      ],
  },
 */
const schema = yup.object({
    texte: yup.string().required(),

  }).required();
  
const AddQuestion = ({AddQuestionEvent}) => {
    
    const [responses,setResponses]=useState([]);
    const [Errorinoptions,setErrorinoptions]=useState(false);
    const [ErrorinoptionsMsg,setErrorinoptionsMsg]=useState("")
    const { register, handleSubmit, formState:{ errors },reset } = useForm({
        resolver: yupResolver(schema)
      });
     
        function  AddOptionfn(texte,correct){
       setResponses([...responses, {texte,correct}]);
      }
    
      const onSubmit =  (data) => { 
      if(responses.filter((e)=>e.correct==true).length==0){
        setErrorinoptions(true);
        setErrorinoptionsMsg("Question must have at least one Correct Answer");

      }else if((data.QuestionType=="Radio"||data.QuestionType=="Select")&&(responses.filter((e)=>e.correct==true).length>1)){
        setErrorinoptions(true);
        setErrorinoptionsMsg("This Type of Question must have only one Correct Answer ");
      }else{
        setErrorinoptions(false);
        setErrorinoptionsMsg(" ");

      AddQuestionEvent(data,responses)
reset();
setResponses([])
      }
      }
      function deleterep(index){
        console.log(index);
        console.log(responses)
       setResponses([
        ...responses.slice(0, index),
        ...responses.slice(index + 1)
      ]);

      }
return (
    <form onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group my-3">
          <input type="text" class="form-control" id="title" {...register("texte")} placeholder="texte " />
        </div>
        <div class="alert alert-danger" role="alert"  hidden={!errors.texte}>
        {errors.texte?.message}
        </div>
        <div class="form-group my-3">
        <select class="form-control" {...register("QuestionType")}>
        <option value="CheckBox">CheckBox</option>
        <option value="Radio">Radio</option>
        <option value="Select">Select</option>
        </select>
        <div/>
       
        <div class="col-9 ms-2 my-2">
        {responses.length>0 &&
        <h6 class="my-2">Options </h6>}
        {responses&&
         
         responses.map((reponse, index) => (
           <div class="row" key={index}>
             <p class="col-8">{reponse.texte}</p>
             {reponse.correct==true&&
             <p class="col-3">Correct Answer </p>
             }
             {reponse.correct==false&&
             <p class="col-3">False Answer</p>
             }
             <a class="col" ><FontAwesomeIcon style={{color:"red"}}icon={faMinusCircle} onClick={()=>deleterep(index)}/> </a>


           </div>


      ))
      }
     
      </div>
      <h6 class="my-2">Add Options </h6>

      <AddOption AddOptionfn={AddOptionfn}/>
      {Errorinoptions==true&&
       <div class="alert alert-danger" role="alert" >
{ErrorinoptionsMsg}
       </div>
      }
       
</div>
        <div className="form-group my-3">
          <input type="submit" value="Save"className="form-control btn btn-template " />
        </div>

      </form>
          
          );
}
export default AddQuestion; 