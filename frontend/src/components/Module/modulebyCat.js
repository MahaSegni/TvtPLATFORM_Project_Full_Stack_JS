import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from '../../utils/useApi';
import RowDetailsFront from "./RowDetailFront";

import axios from "axios";
import DetailModule from './DetailModule';
export default function ModuleByCat({cat,showmodel}) {
  var connectedUser = useSelector(selectConnectedUser)
  const [selectedId, SetselectedId] = useState(-1);
    let [id,setid]=useState("");
    const [show, setshow] = useState(false);
    const [showdetai, setshowdetai] = useState(false);
    const [modulesbycat, err, reload] = useApi('category/getmodulesfromcategory/'+cat,null,'GET',false);
    if (id!=cat){setid(cat)
        reload();
    }
    const join = (id__) => {
      axios.put(`http://localhost:3000/api/module/adduser/${id__}/${connectedUser.id}`)
        .then(res => {
          window.location.reload(true);
        })
        
    }
    
    

   return (
<>
{modulesbycat && <>
{modulesbycat.map((module,index) =>(
    <>
     {   showdetai==false &&     <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="plan-card plan-one">
                              <RowDetailsFront label={module.label} image={module.image} />
                              <div class="plan-footer">
                                {!module.refStudents.includes(connectedUser.id) &&
                                  <a class="btn btn-update m-2 pull-left  " onClick={() => join(module._id)} >
                                    Join
                                  </a >}
                                {module.refStudents.includes(connectedUser.id) &&
                                  <a class="btn btn-update m-2 pull-left " onClick={() => join(module._id)} >
                                    Show more
                                  </a>}
                                <a class="btn btn-delete m-2 pull-right " onClick={() => {
                                  setshow(!show)
                                  SetselectedId(module._id)
                                  setshowdetai(true)
                                }} >Details</a>
                                <a > .</a>
                              </div>
                            </div>
                          </div>

     } 
    
    </>
   )

   )}
   {
      show == true  && showdetai==true && <DetailModule id={selectedId} />
    }
</>

}
                
                
              
</>
   )}