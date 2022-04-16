import "../../assets/css/message.css";
import { format } from "timeago.js";

export default function Message({ message ,user,friend}) {
  let own=message.own

  return (

    <div  className={own ? "message own" : "message"}>
      <div className="messageTop" style={{marginBottom:"2%"}}>
         
          {user.image.startsWith("https") && own==true&&  <>
            <p className="messageText">{message.text}</p>
            <img src={user.image} className="messageImg" referrerpolicy="no-referrer"></img></>}

          {!user.image.startsWith("https") && own==true&& <>
            <p className="messageText">{message.text}</p>
            <img className="messageImg" src={require('../../assets/uploads/user/' + user.image)} alt=""/></>}
        
          { own==false&& <><img className="messageImgNotOwner" src={require('../../assets/img/chatbot1.png')} alt=""/>
            <p className="messageText">{message.text}</p></> }
        
      
      </div>
   
    </div>
  );
}
