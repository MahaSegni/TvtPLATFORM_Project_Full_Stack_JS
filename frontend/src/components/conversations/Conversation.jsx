import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/css/conversation.css";
import { useApi } from "../../utils/useApi";

export default function Conversation({ conversation, currentUser, notiftab}) {
 let [display,setDisplay]=useState(false)
 const [uns,setUns]=useState();

  const [user, setUser] = useState(null);
  
  useEffect (()  =>{
    if(JSON.parse(localStorage.getItem('notif'))!=null)
    {let notif=JSON.parse(localStorage.getItem('notif'));
    for (let i in notif)
     {if(notif[i].conversationId==conversation._id)
      {setUns(notif[i].nbUnseen)
       
      }
 
     }
    }
  },[notiftab])
    

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
    
        {  user.state>0 &&
            <div className="chatOnlineBadge"></div>}</div>
      <span  className="conversationName" ><>{conversation.name}  
        </></span>
      <div class="divname" style={{fontSize:12,}}>&nbsp;{user.name}&nbsp;{user.lastName} </div>

      { uns>0 &&  <>  
     &nbsp;<div  id="ex2" >   <span class="fa-stack has-badge" data-count={uns}>
    <i class="fa fa-circle fa-stack-2x"></i>
    <i class="fa fa-bell fa-stack-1x fa-inverse"></i>
  </span></div></>}
    </div> 
    
    }</>
  );
}
