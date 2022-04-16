import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
    zonetexte: yup.string().required(),
  }).required();

const PostComment = ({textedata,onCommentClick}) => {
 
    var connectedUser= useSelector(selectConnectedUser)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
     

      const onSubmit =  (data) => { 
      
        onCommentClick(data);
        
      }      
return (
!textedata ? (
    <form onSubmit={handleSubmit(onSubmit)}>
<div class="post-comment">
  
              {connectedUser.pictureType == "external" &&
                                                     
                                                     <img src={connectedUser.image} class="profile-photo-sm"
                                                         referrerpolicy="no-referrer"></img>
                                                 }
                                                 {connectedUser.pictureType == "internal" && <img src={require('../../assets/uploads/user/' + connectedUser.image)} alt="" class="profile-photo-sm"
                                                     />
                                                 }
              <input type="text" class="form-control" placeholder="Post a comment" {...register("zonetexte")} />

            </div>
          </form>):(
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
<div class="post-comment">
              <img src={require("../../assets/uploads/user/" + connectedUser.image)} alt="" class="profile-photo-sm" />
              <input type="text" class="form-control" defaultValue={textedata} {...register("zonetexte")  }  />

            </div>
          </form>
            </div>
          )
          );
}
export default PostComment; 