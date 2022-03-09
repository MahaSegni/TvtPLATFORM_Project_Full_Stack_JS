import React, { useEffect, useState } from "react";
import "./suggestions.css";

import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useHistory } from "react-router-dom";

const Suggestions = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Suggestions, setSuggestions] = useState([]);
    const history=useHistory();
    let idUser = useSelector(selectConnectedUser).id
  
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/friends/getSuggestions/${idUser}`, { method: 'GET', })
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);

                    setSuggestions(data);
                },
                (error) => {

                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
   


    return (
        <>
            <div class="container">

                <div class="friend-list">
                    <div class="row">
                        {
                            Suggestions.map((suggestion, index) => (
                                <div class="col-md-4 col-sm-6" suggestion={suggestion}
                                    key={index}>

                                    <div class="friend-card">
                                        <img src="https://via.placeholder.com/400x100/6495ED" alt="profile-cover" class="img-responsive cover" />
                                        <div class="card-info">

                                            <img src={require('../../assets/uploads/avatar7.png')} alt="user" class="profile-photo-lg" />
                                            <div class="friend-info">
                                                <a onClick={()=>history.push(`/sendRequest/${suggestion._id}`)} class="pull-right text-green">Add Friend</a>
                                                <h5><a href="timeline.html" class="profile-link">{suggestion.name}</a></h5>
                                                <p>Student at Harvard</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            ))}
                    </div>
                </div>


            </div>


        </>


    );
}




export default Suggestions;

