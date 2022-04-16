import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Switch from '@mui/material/Switch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
  
const AddOption = ({AddOptionfn}) => {
    const [checked, setChecked] = useState(false);
    const [texte,setText]=useState("")
    const [texte_error,settexte_error]=useState(false)
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const handleSubmit= (e)=>{
      e.preventDefault();

      if(texte.length==0){
        settexte_error(true)
      }else{
        let t=texte
        let correct=checked
        settexte_error(false);
        setText("")
        setChecked(false)
        document.getElementById("texte").value="";
        AddOptionfn(t,correct)
      }
    }
   

           
return (
  <div class="row my-3">
    <div class="col-6">  
    <input type="texte" id="texte" placeholder="texte" name="texte" class="form-control" onChange={(e)=>setText(e.target.value)}/>
    </div>
     <div class="col-3">  <Switch   checked={checked}
      onChange={handleChange}
      ></Switch> Correct answer 
 </div>
 <div class="col ms-5">
 <a onClick={handleSubmit}><FontAwesomeIcon icon={faPlusCircle}/></a>
 </div>
 {texte_error==true&&
 <div class="alert alert-danger my-3" role="alert"  >
       Texte is required
 </div>
} 
  </div>
  
   )
}
export default AddOption; 