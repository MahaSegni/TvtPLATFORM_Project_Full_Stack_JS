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

  let connecteduser = useSelector(selectConnectedUser)
  let idUser = useSelector(selectConnectedUser).id
  const [requests, err, reloadRequests] = useApi('friends/getRequests/' + idUser, null, 'GET', false, connecteduser.token);

  async function acceptRequest(id) {
    const [, err] = await queryApi('friends/acceptRequest/' + idUser + '/' + id, null, 'put', false, connecteduser.token);
    reloadRequests();

  }

  async function rejectRequest(id) {
    const [, err] = await queryApi('friends/rejectRequest/' + idUser + '/' + id, null, 'put', false, connecteduser.token);
    reloadRequests();

  }


  return (
    <>

      <div class="container bootstrap snippets bootdey">



        <div class=" list-content">
          <ul class="list-group">
            <li class="list-group-item title">
              <h6>Friends Requests</h6>
            </li>
            {requests &&
              requests.map((user, index) => (
                <li class="list-group-item text-left"
                  key={index}>

                  {user.image.startsWith("https") &&

                    <img src={user.image} class="profile-photo-lg"
                      referrerpolicy="no-referrer"></img>
                  }
                  {!user.image.startsWith("https") && <img class="profile-photo-lg" src={require('../../assets/uploads/user/' + user.image)} alt=""
                  />
                  }
                 <label class="name text-capitalize" > <a  style={{color:"black"}}href={`/check/${user._id}`}>{user.name} {user.lastName}   <br />{user.birthDate && <label class="text-muted" style={{ fontSize: 13 }}> {user.birthDate.substring(0, 10)}</label>}</a></label> 

                  <label class="pull-right">
                    <a onClick={() => { acceptRequest(user._id) }} class="btn  btn-accept  " data-placement="top" style={{ background: ("#5fcf80"), color: ("white") }} data-toggle="tooltip" data-original-title="Delete">
                      <i class="fa fa-check" aria-hidden="true"></i> </a>
                    <a onClick={() => { rejectRequest(user._id) }} class="btn btn-danger " style={{ color: ("white") }} data-placement="top" data-toggle="tooltip" data-original-title="Delete">
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

