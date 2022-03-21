import React, { useEffect, useState } from "react";
import "../../assets/css/friendList.css"

import $ from "jquery";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useHistory } from "react-router-dom";

import { useApi } from "../../utils/useApi";
import { queryApi } from "../../utils/queryApi";


const FriendList = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();
    let connecteduser=useSelector(selectConnectedUser)
    let idUser = useSelector(selectConnectedUser).id
    let [Friends, err, reloadFriends] = useApi('friends/getMyFriends/' + idUser, null, 'GET', false,connecteduser.token);
    console.log(Friends)
    
    async function deleteFriend(id) {
          const [, err] = await queryApi('friends/deleteFriend/' + idUser+'/'+id,null
             , 'get', false,connecteduser.token);
             reloadFriends();
       
    }

    return (
        <>
<div class="container mt-3 mb-4" >

    <div class="row">
      <div class="col-md-12">
        <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
          <table class="table manage-candidates-top mb-0">
            <thead>
              <tr>
                <th>Friends</th>
                <th class="text-center">Status</th>
                <th class="action text-right">Action</th>
              </tr>
            </thead>
            <tbody>
            {Friends &&
                            Friends.map((user, index) => (
                                <tr class="candidates-list" 
                                    key={index}>
                <td class="title">
                  <div class="thumb">
                    <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/>
                  </div>
                  <div class="candidate-list-details">
                    <div class="candidate-list-info">
                      <div class="candidate-list-title " >
                        <h5 class="mb-0"><a style={{color:"black"}}  >{user.name} {user.lastName}</a></h5>
                      </div>
                      <div class="candidate-list-option">
               
                        <ul class="list-unstyled">
                              <label class="text-muted" >Course Preferences : </label>
                        {user.coursepreferences &&
                        user.coursepreferences.map((cp) => (
                       <li style={{color:"#5fcf80" }}>&nbsp; {cp}</li>
                     
                          ))} </ul>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="candidate-list-favourite-time text-center">

                  <span class="candidate-list-time order-1">{user.state===1 && <label> <img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" style={{width:20}}/>Connected</label> }{user.state===0 && "Disconnected" }</span>
                  
                </td>
                <td>
                  <ul class="list-unstyled mb-0 d-flex justify-content-end">
                    <li><a  class="text-primary" data-toggle="tooltip" title="" data-original-title="view"><i class="far fa-eye"></i></a></li>
                    <li><a class="text-danger" data-toggle="tooltip" title="" data-original-title="Delete" onClick={()=>{deleteFriend(user._id)}}><i class="far fa-trash-alt"></i></a></li>
                  </ul>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

</div>




        </>


    );
}




export default FriendList;

