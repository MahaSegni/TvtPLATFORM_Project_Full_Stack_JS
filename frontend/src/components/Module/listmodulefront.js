
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import DetailModule from "./DetailModule";
import "../../assets/css/cardmodule.css"
import RowDetailsFront from "./RowDetailFront";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function Listemodulefront() {
  let history = useHistory();
  const [modules, setModules] = useState([]);
 
  const [show, setshow] = useState(false);
 
  const [selectedId, SetselectedId] = useState(-1);

  var connectedUser = useSelector(selectConnectedUser)
 
  /* find all modules */
  useEffect(async () => {
    await axios.get('http://localhost:3000/api/module/get').then(res => {
      console.log("tttt")
      setModules(res.data)
    })
   
  }, [])

  return  connectedUser.type == "disconnected" ? (
    <div class="container">
      <div>
        {show == false && <div class="container content">
          <div class="row gutters">
            {modules.map(({ label, description, date_creation, _id, idowner, statusModule, image }) => {
              return (<div class="col-lg-4 col-md-4 col-sm-12">
                <div class="plan-card plan-one">
                  <RowDetailsFront label={label} image={image} />
                  <div class="plan-footer">
                    <a class="btn btn-template m-2 pull-right " onClick={() => {
                      setshow(!show)
                      SetselectedId(_id)
                      
                    }}  >
                      Show more
                    </a>
                    <a>.</a>
                  </div>
                </div>
              </div>)
            })}
          </div>
        </div>
        }{
          show == true &&<DetailModule id={selectedId} />
        }
      </div>
    </div>
  ) : (
    <h1>problem happened</h1>
  )
}

