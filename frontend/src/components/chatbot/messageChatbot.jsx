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
      <div className={own ? "message own" : "message"} >
        <div className="messageTop" >

          {user.image.startsWith("https") && own == true && <>
            <p className="messageText">{message.text}</p>
            <img src={user.image} className="messageImg" referrerpolicy="no-referrer"></img></>}

          {!user.image.startsWith("https") && own == true && <>
            <p className="messageText">{message.text}</p>
            <img className="messageImg" src={require('../../assets/uploads/user/' + user.image)} alt="" /></>}

          {own == false && <><img className="messageImgNotOwner" src={require('../../assets/img/chatbot1.png')} alt="" />
            <p className="messageText" >{message.text}</p>
          </>}
        </div>
      </div>

      {message.responses && tabmessages.length<4 &&
        <div className="message"  style={{ marginTop: "1%" }}>
          <div className="messageTop"  >
            <a className="messageImgNotOwner" style={{ backgroundColor: "white", borderColor: "white" }} alt="" />
            {message.responses.length > 1 && message.responses.map((rsp, indexr) =>
              <label style={{ marginRight: "2%" }}><a onClick={() => { ConfirmResponse(rsp,message._id) }} key={indexr} className="messageTextResponse">{rsp.text}</a></label>
            )}
          </div>
        </div>}
        
      {message.responses && tabmessages.length>=4 &&
        <div className="message"  style={{ marginTop: "1%" }}>
          <div className="messageTop" style={{display:"block"}} >
            <a className="messageImgNotOwner" style={{ backgroundColor: "white", borderColor: "white" }} alt="" />
            {message.responses.length > 1 && message.responses.map((rsp, indexr) =>
            
            <p  onClick={() => { ConfirmResponse(rsp,message._id) }} key={indexr} className="messageTextResponse">{rsp.text}</p>
            )}
            
            
             <p ref={buttonRef} onClick={() => {disableButton(); ConfirmResponse({text:"I dont want to answer",value:0},message._id) }}  className="messageTextResponse">I don't want to answer</p>
          </div>
        </div>}
    </>
  );
}
