import { useRef, useState } from "react";
import "../../assets/css/messageBot.css";

export default function Message({tabmessages, ConfirmResponse, message, user, friend }) {
  let own = message.own
  const buttonRef = useRef();

function disableButton () {
  buttonRef.current.hide = true; // this disables the button
 }
  return (
    <>
      <div className={own ? "messageBot own" : "messageBot"} >
        <div className="messageBotTop" >

          {user.image.startsWith("https") && own == true && <>
            <p className="messageBotText">{message.text}</p>
            <img src={user.image} className="messageImg" referrerpolicy="no-referrer"></img></>}

          {!user.image.startsWith("https") && own == true && <>
            <p className="messageBotText">{message.text}</p>
            <img className="messageBotImg" src={require('../../assets/uploads/user/' + user.image)} alt="" /></>}

          {own == false && <><img className="messageBotImgNotOwner" src={require('../../assets/img/chatbot1.png')} alt="" />
            <p className="messageBotText" >{message.text}</p>
          </>}
        </div>
      </div>

      {message.responses && tabmessages.length<4 &&
        <div className="messageBot"  style={{ marginTop: "1%" }}>
          <div className="messageBotTop"  >
            <a className="messageBotImgNotOwner" style={{ backgroundColor: "white", borderColor: "white" }} alt="" />
            {message.responses.length > 1 && message.responses.map((rsp, indexr) =>
              <label style={{ marginRight: "2%" }}><a onClick={() => { ConfirmResponse(rsp,message._id) }} key={indexr} className="messageBotTextResponse">{rsp.text}</a></label>
            )}
          </div>
        </div>}
        
      {message.responses && tabmessages.length>=4 &&
        <div className="messageBot" >
          <div className="messageBotTop" style={{display:"block"}} >
            <a className="messageBotImgNotOwner" style={{ backgroundColor: "white", borderColor: "white" }} alt="" />
            {message.responses.length > 1 && message.responses.map((rsp, indexr) =>
            
            <p onClick={() => { ConfirmResponse(rsp,message._id) }} key={indexr} className="messageBotTextRsp">{rsp.text}</p>
            )}
            
            
             <p ref={buttonRef} onClick={() => {disableButton(); ConfirmResponse({text:"I dont want to answer",value:0},message._id) }}  className="messageBotTextRsp">I don't want to answer</p>
          </div>
        </div>}
    </>
  );
}
