
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const CardComment = ({comment,onCommentDelete}) => {
    var connectedUser= useSelector(selectConnectedUser)
   // 
return (
  <div>
      {connectedUser.id==comment.ownerComment && <div style={{float : "right"}}>
    <FontAwesomeIcon icon={faPenToSquare} /> <a onClick={()=>{onCommentDelete(comment._id)}} > <FontAwesomeIcon icon={faXmark} color={"red"} />  </a>
</div> } 
    <div class="post-comment">
    <img src={require("../../assets/uploads/user/" + comment.imageUser)} alt="" class="profile-photo-sm" />
    <p><a href="timeline.html" class="profile-link">{comment.nomUser} </a><i class="em em-laughing"></i> {comment.texte}</p> 
    
    </div>
    
    </div>
   

);
}
export default CardComment; 