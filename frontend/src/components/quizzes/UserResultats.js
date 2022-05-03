import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from '../../utils/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { queryApi } from '../../utils/queryApi';
import { Spinner } from 'react-bootstrap';
const UserResult = ({ props }) => {
    var connectedUser = useSelector(selectConnectedUser)
    const[isLoading,setIsLoading]=useState(false);

    ///findStudent/:studentid
    const [Student, errorStudent, reloadStudent] = useApi('quiz/findStudent/' + props[0].idUser, null, 'GET', false, connectedUser.token);
  
   async function EvaluateBehavior(){
    setIsLoading(true);
    
    let time_s=props[0].time.h*3600 + props[0].time.m*60+props[0].time.s;

    const [r, err] =  await queryApi('quiz/runScriptPython' ,{
        click:props[0].totalClicksofmap,
        time_s:time_s,
        nbr_mod:Student.refmodules.length,
        Note:props[0].Note

    }
   , 'POST', false,connectedUser.token);

   const [, err2] =  await queryApi('quiz/updateBehavior' ,{
    idquiz:props[1]._id,
    userId:Student._id,
    behavior:r,}
, 'PATCH', false,connectedUser.token);

setIsLoading(false);

document.getElementById("behavior"+Student._id).innerHTML=r;


 }
    return (

        <div class="col-xs-12 col-sm-6 col-md-4">
            {Student &&
                <div class="image-flip" >
                    <div class="mainflip flip-0">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    {Student.image.startsWith("https") &&

                                        <p> <img class="img-fluid" src={Student.image} referrerpolicy="no-referrer"></img> </p>
                                    }
                                    {!Student.image.startsWith("https") &&
                                        <p> <img src={require('../../assets/uploads/user/' + Student.image)} alt="" class="img-fluid" /></p>
                                    }

                                    <h4 class="card-title">{Student.name + " " + Student.lastName}</h4>
                                    <p class="card-text">{Student.email}</p>
                                    <a class="btn btn-primary btnResults btn-sm"><i class="fa fa-rotate-left"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <h4 class="card-title">{Student.email}</h4>
                                    <p class="card-text">Score : {props[0].Note} / {props[1].Questions.length}</p>
                                    {props[0].time &&
                                        <div>
                                            <p class="card-text">Time spent to pass the quiz  : </p>
                                            <p class="card-text">  {props[0].time.h}h {props[0].time.m}m {props[0].time.s}s</p>
                                        </div>}
                                    {props[0].Behavior&&
                                       <p class="card-text" id={"behavior"+Student._id}>{props[0].Behavior}</p>

                                    }
                                    {!props[0].Behavior&&
                                    <p class="card-text" id={"behavior"+Student._id}></p>

                                    }

                                        
                                                                  
                                </div>
                                <div class="card-footer">
                                <button class="btn btn-primary btnResults form-control" onClick={()=>EvaluateBehavior()} hidden={isLoading}>
                                <FontAwesomeIcon icon={faBrain} /> Evaluate Behavior  </button>
{isLoading&&
                                <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>                  
}                                

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }</div>
    )
}
export default UserResult; 