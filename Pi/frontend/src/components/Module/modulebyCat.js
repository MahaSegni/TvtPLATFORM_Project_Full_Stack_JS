import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from '../../utils/useApi';
import RowDetailsFront from "./RowDetailFront";

import axios from "axios";
import DetailModule from './DetailModule';
import { useHistory } from 'react-router-dom';
export default function ModuleByCat({ cat }) {
  var connectedUser = useSelector(selectConnectedUser)
  const [selectedId, SetselectedId] = useState(-1);
  let [id, setid] = useState("");
  const [show, setshow] = useState(false);
  const [showdetai, setshowdetai] = useState(false);

  const history = useHistory();
  
  const [modulesbycat, err, reload] = useApi('category/getmodulesfromcategory/' + cat, null, 'GET', false);
  if (id != cat) {
    setid(cat)
    reload();
  }
  function handleClick() {
    history.push("/signin");
  }
 
  const join = (id__) => {
    axios.put(`http://localhost:3000/api/module/adduser/${id__}/${connectedUser.id}`)
      .then(res => {
        window.location.reload(true);
      })

  }



  return connectedUser.type == "user" ? (
    <>
      {modulesbycat && show==false && <>
       
       
        {modulesbycat.map((module, index) => {
     if(module.idowner!=connectedUser.id && module.refStudents!=connectedUser.id){
            return (
              <>
                {<>
                  <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div class="course-item">
                    
                      <RowDetailsFront label={module.label} image={module.image} idowner={module.idowner} refStudents={module.refStudents} id={module._id} />
                      <div class="my-2">
                      {module.idowner != connectedUser.id &&<>
                        <button type="button" class="btn btn-template ms-5" onClick={() => join(module._id)}>Register now</button>
                        <button type="button" class="btn btn-template mx-3" onClick={() => {
                          setshow(true)
                          SetselectedId(module._id)
                        }}>Show more</button>
                      </>}
                     
                      </div>
                       
                  </div>
                  </div>
                </>
                }

              </>
            )
          }
          
        }

        )}
       

              
      </>

      }{
        show==true && <DetailModule id={selectedId} />
      }



    </>
  ) : connectedUser.type == "disconnected" ? (
    <>
      {modulesbycat && show ==false && <>
      
       
        {modulesbycat.map((module, index) => {
          
            return (
              <>
                {<>
                  <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div class="course-item">
                    
                      <RowDetailsFront label={module.label} image={module.image} idowner={module.idowner} refStudents={module.refStudents} id={module._id} />
                      <div class="my-2">
                        <button type="button" class="btn btn-template ms-5" onClick={handleClick}>Register now</button>
                      
                        <button type="button" class="btn btn-template mx-3" onClick={() => {
                          setshow(true)
                          SetselectedId(module._id)
                        }}>Show more</button>
                       </div>
                  </div>
                  </div>
                </>
                }
                

              </>
            )
         
        }

        )}

              
      </>

      }{
        show==true && <DetailModule id={selectedId} />
      }
      </>
  ): (
    <h1>problem happened</h1>
  )
}