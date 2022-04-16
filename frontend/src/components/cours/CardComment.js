
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PostComment from './PostComment';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const CardComment = ({comment,onCommentDelete,onCommentUpdate}) => {
  async function confirmDelete(id){
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onCommentDelete(comment._id)
        },
        {
          label: 'No',
          onClick: () => {

          }
        }
      ]
    });
  }
    async function commentEdit(data){
      onCommentUpdate(data.zonetexte,comment._id);
     
    }
    const[editMode,setEditMode]=useState(false)
    var connectedUser= useSelector(selectConnectedUser)
   // 
return (
  editMode==false ? (
<div>
      {connectedUser.id==comment.ownerComment && <div style={{float : "right"}}>
    <a onClick={()=>{setEditMode(true)}}> <FontAwesomeIcon icon={faPenToSquare} /> </a> <a onClick={()=>{confirmDelete(comment._id)}} > <FontAwesomeIcon icon={faXmark} color={"red"} />  </a>
</div> } 
    <div class="post-comment">
    { comment.imageUser.startsWith("https") &&
                                                     
                                                     <img src={comment.imageUser} class="profile-photo-sm"
                                                         referrerpolicy="no-referrer"></img>
                                                 }
                                                 {!comment.imageUser.startsWith("https")  && <img src={require('../../assets/uploads/user/' +comment.imageUser)} alt="" class="profile-photo-sm"
                                                     />
                                                 }
    <p><a href="timeline.html" class="profile-link">{comment.nomUser} </a><i class="em em-laughing"></i> {comment.texte}</p> 
    
    </div>
    
    </div>
   
  ) :( <PostComment textedata={comment.texte} onCommentClick={commentEdit}  ></PostComment>)
  

);
}
export default CardComment; 