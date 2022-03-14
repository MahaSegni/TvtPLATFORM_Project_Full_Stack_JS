import React, { useEffect, useState } from "react";
import "../../assets/css/suggestions.css"

import $ from "jquery";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useHistory } from "react-router-dom";

import { useApi } from "../../utils/useApi";
import { queryApi } from "../../utils/queryApi";

const Suggestions = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();
    let connecteduser=useSelector(selectConnectedUser)
    let idUser = useSelector(selectConnectedUser).id
    let [Suggestions, err, reloadSuggestions] = useApi('friends/getSuggestions/' + idUser, null, 'GET', false);
    
    async function sendRequest(id) {
          const [, err] = await queryApi('friends/sendRequest/' + idUser+'/'+id,null
             , 'put', false);
             reloadSuggestions();
       
    }
        
     function removeSuggestion(id) {
        console.log(id);
        Suggestions.filter((item) => item.id !== id);

 
        history.go(0)
  }

    return (
        <>
      

<div class="container bootstrap snippets bootdey">
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-body p-t-0">
                    <div class="input-group">
                        <input type="text" id="example-input1-group2" name="example-input1-group2" class="form-control" placeholder="Search"/>
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-effect-ripple btn-template"><i class="fa fa-search" ></i></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="mydiv">
        
    {Suggestions &&
                            Suggestions.map((suggestion, index) => (
                                <div class="col-md-6" suggestion={suggestion}
                                    key={index}>
       
            <div class="card">
                <div class="card-body p-t-10">
                    <div class="media-main">
                        <a class="pull-left" href="#">
                            <img class="profile-photo-lg"  src={require('../../assets/uploads/avatar7.png')}alt=""/>
                        </a>
                        <div class="pull-right btn-group-sm">
                          
                            <a  onClick={() => { removeSuggestion(suggestion._id) }} class="btn btn-danger tooltips" data-placement="top" data-toggle="tooltip" data-original-title="Delete">
                                <i class="fa fa-close"></i>
                            </a>
                        </div>
                        <div class="info">
                            <h4>{suggestion.name} {suggestion.lastName}</h4>
                            <p class="text-muted">Graphics Designer</p>
                        </div>
                    </div>
                    <div class="clearfix">
                        <hr/>
                        <a onClick={() => { sendRequest(suggestion._id) }} class="btn btn-template pull-right ">Add Friend</a>
                    </div>
                    
                   
                </div>
            </div>
        </div>
            ))}
    </div>
</div>


        </>


    );
}




export default Suggestions;

