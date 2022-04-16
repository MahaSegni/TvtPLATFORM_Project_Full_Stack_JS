import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/css/conversation.css";

export default function Conversation({ conversation, currentUser}) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
   
    const friendId = conversation.members.find((m) => m !== currentUser.id );
    



    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/getGeneralInfo/" + friendId).
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
    
        { user.state>0 &&
            <div className="chatOnlineBadge"></div>}</div>
      <span  className="conversationName" >{conversation.name}</span>
      <div class="divname" style={{fontSize:12,}}>&nbsp;{user.name}&nbsp;{user.lastName}</div>
    </div> }</>
  );
}
