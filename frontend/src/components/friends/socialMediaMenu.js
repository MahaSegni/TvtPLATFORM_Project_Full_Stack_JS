import "../../assets/css/socialMedia.css"
import React, { useEffect, useState } from "react";


import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import Suggestions from './suggestions';
import FriendsRequests from './friendsRequests';
import FriendList from "./friendList";
import $ from 'jquery';
import { useHistory } from "react-router-dom";
import Messenger from "../conversations/Messenger";


const SocialMediaMenu = (props) => {
    const history = useHistory();
    const [messenger, setMessenger] = useState(false);
    const [friendList, setFriendList] = useState(false);
    const [friendRequests, setFriendRequests] = useState(false);
    const [suggestions, setSuggestions] = useState(false);
    let user = useSelector(selectConnectedUser)
    if (user.id == null) {
        history.push("/signin")
    }

    $('a').click(function () {
        $('a.active').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });

    return (

        <>



            <div class="wrapper wrapperside" >

                <div class="sidebar  ">

                    <div class="profile ">
                        {user.image.startsWith("https") &&

                            <img src={user.image} class="profile-photo-sm"
                                referrerpolicy="no-referrer"></img>
                        }
                        {!user.image.startsWith("https") && <img src={require('../../assets/uploads/user/' + user.image)} alt="" class="profile-photo-sm"
                        />
                        }
                        <h5 class="text-capitalize" style={{ color: "rgb(5, 68, 104)" }}>{user.name} </h5>
                        <h5 class="text-capitalize" style={{ color: "rgb(5, 68, 104)" }}>  {user.lastName}</h5>
                        <p style={{ fontSize: 10 }}>{user.email}</p>
                    </div>
                    <ul>
                        <li>
                            <a onClick={() => { setMessenger(true); setFriendList(false); setFriendRequests(false); setSuggestions(false); }} >
                                <span class="icon"><i class="fas fa-comment"></i></span>
                                <span class="item">Messenger</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { setMessenger(false); setFriendList(true); setFriendRequests(false); setSuggestions(false); }}>
                                <span class="icon"><i class="fas fa-list"></i></span>
                                <span class="item">Friend List</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => { setMessenger(false); setFriendList(false); setFriendRequests(true); setSuggestions(false); }}>
                                <span class="icon"><i class="fas fa-question-circle"></i></span>
                                <span class="item">Friend Requests</span>
                            </a>
                        </li>
                        <li>

                            <a id="suglink" onClick={() => { setMessenger(false); setFriendList(false); setFriendRequests(false); setSuggestions(true); }} >
                                <span class="icon"><i class="fa fa-lightbulb-o"></i></span>
                                <span >Friend Suggestions</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>


            <main class="mainside">
                <div >
                    {suggestions == true &&
                        <Suggestions Sug={setSuggestions} />}

                    {friendRequests == true &&
                        <FriendsRequests />}

                    {friendList == true &&
                        <FriendList />}

                    {messenger == true &&
                        <Messenger setMessenger={setMessenger} />}
                </div>
            </main>
        </>
    )
}

export default SocialMediaMenu;