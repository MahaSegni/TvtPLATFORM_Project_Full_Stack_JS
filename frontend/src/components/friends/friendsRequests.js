import React, { useEffect, useState } from "react";
import "../../assets/css/friendsRequests.css"

import $ from "jquery";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useHistory } from "react-router-dom";

import { useApi } from "../../utils/useApi";
import { queryApi } from "../../utils/queryApi";

const FriendsRequests = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();
    let connecteduser=useSelector(selectConnectedUser)
    let idUser = useSelector(selectConnectedUser).id
    const [requests, err, reloadRequests] = useApi('friends/getRequests/' + idUser, null, 'GET', false);
    
    async function acceptRequest(id) {
          const [, err] = await queryApi('friends/acceptRequest/' + idUser+'/'+id,null, 'put', false);
          reloadRequests();
       
    }
    
    async function rejectRequest(id) {
        const [, err] = await queryApi('friends/rejectRequest/' + idUser+'/'+id,null, 'put', false);
        reloadRequests();
     
  }
       
    
    return (
        <>
      
<div class="container bootstrap snippets bootdey">



  <div class=" list-content">
    <ul class="list-group">
      <li href="#" class="list-group-item title">
      <h6>Friends Requests</h6> 
      </li>
      {requests &&
                            requests.map((user, index) => (
                                <li href="#" class="list-group-item text-left"
                                    key={index}>
       
      
        <img class="profile-photo-lg" src="https://bootdey.com/img/Content/User_for_snippets.png"/>
        
        <label class="name" >{user.name} {user.lastName}  <br/><label class="text-muted" style={{fontSize:13}}>{user.birthDate.substring(0, 10)}</label></label> 
        
        <label class="pull-right">
            <a href="#"  onClick={() => { acceptRequest(user._id) }} class="btn  btn-accept  " data-placement="top" style={{background:("#5fcf80"),color:("white")}} data-toggle="tooltip" data-original-title="Delete">
            <i class="fa fa-check" aria-hidden="true"></i> </a>
            <a href="#"  onClick={() => { rejectRequest(user._id) }} class="btn btn-danger " data-placement="top" data-toggle="tooltip" data-original-title="Delete"> 
            <i class="fas fa-trash-alt"></i></a>
        </label>
        <div class="break"></div>
      </li>
                            ))}
    </ul>
  </div>
  </div>
                                                                             


        </>


    );
}




export default FriendsRequests;

