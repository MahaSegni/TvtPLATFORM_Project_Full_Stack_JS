import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";

import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
 

  const [onlineFriends, setOnlineFriends] = useState([]);
  

 


      let [friends, err, reloadFriends] = useApi('friends/getMyFriends/' + currentId, null, 'GET', false,);
   
    



  useEffect(() => {
    let onf=[]
    if(friends){
      for(let i in friends ){if (friends[i].state>0 ){onf.push(friends[i])}}
    setOnlineFriends(onf)};
  }, [friends, onlineUsers]);


  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
             
                src={require('../../assets/uploads/user/' + o.image)}
            
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
