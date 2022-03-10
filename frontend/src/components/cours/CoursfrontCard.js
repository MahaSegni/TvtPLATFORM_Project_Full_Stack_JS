import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import "./styleCard.css";
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
const CoursfrontCard = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  var connectedUser = useSelector(selectConnectedUser)
  const [cour, err, reloadCours] = useApi('cours/find/' + props.refcour, null, 'GET', false);

  async function like(id) {
    const [, err] = await queryApi('cours/like-cours/' + id, {
      id: connectedUser.id
    }
      , 'PATCH', false);
      reloadCours();

  }
  async function unlike(id) {
    const [, err] = await queryApi('cours/unlike-cours/' + id, {
      id: connectedUser.id
    }
      , 'PATCH', false);
      reloadCours();

  }

  
    return (
      
      <div class="post-content">
       {cour && 
        <div class="post-container">
          <img src={require("../../assets/uploads/user/" + props.owner.image)} alt="user" class="profile-photo-md pull-left" />
          <div class="post-detail">
            <div class="user-info">
              <h5><a href="timeline.html" class="profile-link">{props.owner.name}</a> <span class="following">following</span></h5>
              <p class="text-muted">Published a photo about 3 mins ago</p>
            </div>
            <div class="reaction">
              {cour.likers.includes(connectedUser.id) &&
                <a onClick={() => unlike(cour._id)} class="btn text-green"><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
              }
              {!cour.likers.includes(connectedUser.id) &&
                <a onClick={() => like(cour._id)} class="btn text-grey"><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
              }
            </div>
            <div class="line-divider"></div>
            <div class="post-text">
              <p>{cour.texte} <i class="em em-anguished"></i> <i class="em em-anguished"></i> <i class="em em-anguished"></i></p>
            </div>

            <div class="line-divider"></div>
            <div class="post-comment">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="profile-photo-sm" />
              <p><a href="timeline.html" class="profile-link">Diana </a><i class="em em-laughing"></i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
            </div>
            <div class="post-comment">
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="profile-photo-sm" />
              <p><a href="timeline.html" class="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
            </div>
            <div class="post-comment">
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="profile-photo-sm" />
              <input type="text" class="form-control" placeholder="Post a comment" />

            </div>
          </div>
        </div>}
      </div>

    );


  }




export default CoursfrontCard; 