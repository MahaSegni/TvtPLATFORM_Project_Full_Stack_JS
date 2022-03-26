import React, { useEffect, useState } from "react";
import "../../assets/css/suggestions.css"

import $ from "jquery";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useHistory } from "react-router-dom";

import { useApi } from "../../utils/useApi";
import { queryApi } from "../../utils/queryApi";

const Suggestions = (props) => {
   $(document).ready(function () {
        $("#search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#mydiv ").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
   });


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Suggestions, setSuggestions] = useState();
    const [Suggestionssetted, setSuggestionssetted] = useState(false);
    const history = useHistory();
    let connecteduser = useSelector(selectConnectedUser)
    let idUser = useSelector(selectConnectedUser).id
    let [Suggestionsdefault, err, reloadSuggestions] = useApi('friends/getSuggestions/' + idUser, null, 'GET', false, connecteduser.token);
    
    
    function realad() {
        setSuggestionssetted(false);
    }
    if (Suggestionsdefault !== null && Suggestionssetted === false) {
        setSuggestionssetted(true)
        setSuggestions(Suggestionsdefault)
    }

   
    async function sendRequest(id) {
        const [, err] = await queryApi('friends/sendRequest/' + idUser + '/' + id, null
            , 'put', false, connecteduser.token);
        reloadSuggestions();
        realad()

    }
    function removeSuggestion(id) {     
        let index = 0;
         Suggestionsdefault.map((suggestion) => { if (suggestion._id == id) { index = Suggestionsdefault.indexOf(suggestion); console.log(index); } })
        delete Suggestionsdefault[index]
        realad()
    }
    


    return (
        <>


            <div class="container bootstrap snippets bootdey" >
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-body p-t-0">
                                <div class="input-group">
                                    <input type="text" id="search" name="example-input1-group2" class="form-control" placeholder="Search" />
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-effect-ripple btn-template"><i class="fa fa-search" ></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" >

                    {Suggestions &&
                        Suggestions.map((suggestion, index) => (
                            <div class="col-md-6" suggestion={suggestion}
                                key={index}>

                                <div class="card" id="mydiv"  >
                                    <div class="card-body p-t-10">
                                        <div class="media-main">
                                            <a class="pull-left" >{/*require('../../assets/uploads/user/' + suggestion.image*/}
                                                <img class="profile-photo-lg" src={require('../../assets/uploads/avatar7.png')} alt="" />
                                            </a>
                                            <div class="pull-right btn-group-sm">

                                                <a onClick={() => { removeSuggestion(suggestion._id) }} class="btn btn-danger tooltips " style={{ color: "white" }} data-placement="top" data-toggle="tooltip" >
                                                    <i class="fa fa-close"></i>
                                                </a>
                                            </div>
                                            <div class="info" style={{height:"130px"}}>
                                                <h4 class="text-capitalize">{suggestion.name} {suggestion.lastName}</h4>
                                                {suggestion.coursepreferences!="" && <label class="text-muted" >Course Preferences : </label>}
                                                {suggestion.coursepreferences &&
                                                    suggestion.coursepreferences.map((cp) => (
                                                <label style={{color:"#5fcf80" }} >&nbsp; {cp}</label>))}
                                            </div>
                                        </div>
                                        <div class="clearfix">
                                            <hr />
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

