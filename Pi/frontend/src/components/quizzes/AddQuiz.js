import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Switch from '@mui/material/Switch';

const schema = yup.object({
    title: yup.string().required(),

  }).required();
  
const AddQuiz = ({QuizEvent}) => {
    const [checked, setChecked] = useState(false);
    const[validechorno,setValidechorno]=useState(true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
     

      const onSubmit =  (data) => { 
        
        if(checked&&validechorno||checked==false)
        QuizEvent(data,checked);
        
      }      
return (
    <form onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group my-3">
          <input type="text" class="form-control" id="title" {...register("title")} placeholder="Title " />
        </div>
        <div class="alert alert-danger" role="alert"  hidden={!errors.title}>
        {errors.title?.message}
        </div>
        <div class="form-group my-3">

        <Switch   checked={checked}
      onChange={handleChange}
      ></Switch> Timer (Minutes)
</div>
<div class="form-group my-3">

        {checked==true&&
        <input class="form-control" type="number" placeholder="minutes" defaultValue={30} {...register("chrono")} onChange={(e)=>setValidechorno(e.target.value>0)}/>
        }
        {validechorno==false&&checked==true&&
        <div class="alert alert-danger my-2" role="alert">
        <p> Timer must be &gt 0</p>
        </div>
        }
        </div>
        <div className="form-group my-3">
          <input type="submit" value="Save"className="form-control btn btn-template " />
        </div>

      </form>)
}
export default AddQuiz; 