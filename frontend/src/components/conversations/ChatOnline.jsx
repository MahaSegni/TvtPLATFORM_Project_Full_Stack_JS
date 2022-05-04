import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";
import { queryApi } from "../../utils/queryApi";
import "../../assets/css/chatOnline.css";

export default function ChatOnline({RL,conversations, onlineUsers, currentId, setCurrentChat }) {
 

  const [onlineFriends, setOnlineFriends] = useState([]);
  
 

 


    
    



  useEffect(() => {
    let onf=[]
  
    if(onlineUsers){
      
      for(let i in onlineUsers ){
        let test=false;
        for(let j in conversations )
        {
          for(let k in conversations[j].members )
          {
            if(conversations[j].members[k]==onlineUsers[i]._id)
            {test=true
            }

          }
        }
        if(test==false)
        {onf.push(onlineUsers[i])}}
    setOnlineFriends(onf)};
  }, [onlineUsers]);


  const handleClick = async (user) => {
    
    try {
    
       
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/conversations/find/${currentId}/${user._id}`
      ); 
      if(res.data!=null)
      {setCurrentChat(res.data);}else{
        const [result, err] = await queryApi('conversations/'  , {
          senderId:currentId,
          receiverId:user._id
          
        }
        , 'post', false);
        conversations.push(result)
        RL();
        
        setCurrentChat(result)
        const newList = await onlineUsers.filter((item) => item.id !== user._id);
        setOnlineFriends(newList)
       
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline"  >
      {onlineFriends && onlineFriends.map((o,index) => (
        <div key={index} className="chatOnlineFriend" title="Add New Conversation" >
          <a  className="btn btn-template-add"  onClick={() => { handleClick(o)}}><i class=" fas fa-light fa-plus" style={{width:5,height:5}}></i></a>
          <div className="chatOnlineImgContainer">
          {o.image.startsWith("https") &&

<img src={o.image} class="chatOnlineImg"
    referrerpolicy="no-referrer"></img>
}
{!o.image.startsWith("https") && <img class="chatOnlineImg" src={require('../../assets/uploads/user/' + o.image)} alt=""
/>
}

          
            {o.state>0 &&
            <div className="chatOnlineBadge"></div>}
          </div>
          <a href={`/check/${o._id}`} style= {{ color: "black" }}  >  <span className="chatOnlineName">{o.name}&nbsp;{o.lastName}</span> </a>
        </div>
      ))}
    </div>
  );
}
