import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);


  useEffect(() => {

    const friendId = conversation.members.find((m) => m !== currentUser.id );
    

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/getGeneralInfo/" + friendId).then(res => {
   
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
    <div className="conversation">
      <img
        className="conversationImg"
        src={require('../../assets/uploads/user/user.png')}
        alt=""
      />
      <span className="conversationName">{user.name}</span>
    </div> }</>
  );
}
