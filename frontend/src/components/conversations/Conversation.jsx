import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/css/conversation.css";
import { useApi } from "../../utils/useApi";

export default function Conversation({ conversation, currentUser}) {



  const [user, setUser] = useState(null);
 

  useEffect(() => {
  
    const friendId = conversation.members.find((m) => m !== currentUser.id );
    



    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/getGeneralInfo/` + friendId).
        then( res => { 
          
          setUser(res.data);

         });
 
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <>
    {user &&
    <div id="mydiv"  className="conversation" >
      <div className="conversationImgContainer">
      {user.image.startsWith("https") &&

<img src={user.image} class="conversationImg"
    referrerpolicy="no-referrer"></img>
}
{!user.image.startsWith("https") && <img class="conversationImg" src={require('../../assets/uploads/user/' + user.image)} alt=""
/>
}
    
        {  user.state>0 &&
            <div className="chatOnlineBadge"></div>}</div>
      <span  className="conversationName" ><>{conversation.name}  
        </></span>
      <div class="divname" style={{fontSize:12,}}>&nbsp;{user.name}&nbsp;{user.lastName} </div>

    {JSON.parse(localStorage.getItem('notif'))&&  <>{JSON.parse(localStorage.getItem('notif')).find((m)=> m.conversationId==conversation._id) &&
     <>{ JSON.parse(localStorage.getItem('notif')).find((m)=> m.conversationId==conversation._id).nbUnseen>0 &&  <>  
     &nbsp;<div  id="notif" >   <span class="fa-stack has-badge" data-count={JSON.parse(localStorage.getItem('notif')).find((m)=> m.conversationId==conversation._id).nbUnseen}>
    <i class="fa fa-circle fa-stack-2x"></i>
    <i class="fa fa-bell fa-stack-1x fa-inverse"></i>
  </span></div></>}</>}</>}
    </div> 
    
    }</>
  );
}
