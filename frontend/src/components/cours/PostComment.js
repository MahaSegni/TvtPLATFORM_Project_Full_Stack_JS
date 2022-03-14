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

const PostComment = ({onCommentClick}) => {
    var connectedUser= useSelector(selectConnectedUser)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
      const onSubmit =  (data) => { 

        onCommentClick(data);
        
      }      
return (
    <form onSubmit={handleSubmit(onSubmit)}>
<div class="post-comment">
              <img src={require("../../assets/uploads/user/" + connectedUser.image)} alt="" class="profile-photo-sm" />
              <input type="text" class="form-control" placeholder="Post a comment" {...register("zonetexte")} />

            </div>
          </form>
);
}
export default PostComment; 