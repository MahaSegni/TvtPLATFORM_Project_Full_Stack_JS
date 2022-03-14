import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { Card } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import "./styleCard.css";
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PostComment from "./PostComment";
import CardComment from "./CardComment";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
const CoursfrontCard = (props) => {
  const [showComments,setShowComments]=useState(false);
  var connectedUser = useSelector(selectConnectedUser)
  const [cour, err, reloadCours] = useApi('cours/find/' + props.refcour, null, 'GET', false);
  let { idModule } = useParams();
  async function Delete(id){

    const [, err] = await queryApi('cours/delete/' + idModule +'/'+id, null
      , 'GET', false);
      reloadCours();
  }
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
  async function clickAlert2(data){
    const [, err] = await queryApi('cours/'+ props.refcour+'/addComment', {
      ownerComment:connectedUser.id,
      nomUser: connectedUser.name,
      imageUser:connectedUser.image,
      texte:data.zonetexte
    }
      , 'POST', false);
  
    reloadCours();

   }
   async function CommentDelete(id){
    console.log("try to delete "+ id);
    const [, err] = await queryApi('cours/'+ props.refcour+'/deleteComment', {
      id:id
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
              <h5><a href="timeline.html" class="profile-link">{props.owner.name}</a></h5>
              <p class="text-muted"  > {cour.date_creation.substring(0, 10)} </p>
            </div>
            
            <div class="reaction">
              {connectedUser.id==props.owner._id&&
              <a onClick={()=>Delete(cour._id)}> <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </a>
            }
              {cour.likers.includes(connectedUser.id) && connectedUser.type!="disconnected"&&connectedUser.id!=props.owner._id&&
                <a onClick={() => unlike(cour._id)} class="btn text-green"><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
              }
               
              {!cour.likers.includes(connectedUser.id) && connectedUser.type!="disconnected"&&connectedUser.id!=props.owner._id&&
                <a onClick={() => like(cour._id)} class="btn text-grey"><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
              }
              {connectedUser.type=="disconnected"&&
                <a class="btn text-green" ><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
              }

            </div>
            
            <div class="line-divider"></div>
           
            <div class="line-divider"></div>
            <div class="post-text">
              <p class="bold d-flex justify-content-center">{cour.title}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: cour.texte }} />


            <div class="line-divider"></div>
            {showComments==false &&
            <a class="href" style={{cursor: "pointer"}} onClick={()=>setShowComments(true)}>show comments <FontAwesomeIcon icon={faComment} /></a>}
            {showComments==true&& 
                              <a  style={{cursor: "pointer",color:"grey"}} onClick={()=>setShowComments(false)}>close comments <FontAwesomeIcon icon={faMinusCircle} /></a>
                            }
            {showComments==true&&
            
                        cour.comments.map((comment, index) => (

                            <CardComment comment={comment} onCommentDelete={CommentDelete}
                                key={index}
                            //deleteProduct={deleteEvaluation}
                            >
                            </CardComment>


                        ))
                        }

            
           <PostComment onCommentClick={clickAlert2}/>

          </div>
        </div>}
      </div>

    );


  }




export default CoursfrontCard; 