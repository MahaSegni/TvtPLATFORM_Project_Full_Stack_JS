
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../Redux/slices/sessionSlice";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "../assets/css/chatbot.css"
import "../assets/js/chatbot"

import Message from "./chatbot/messageChatbot"
export default function Chatbot() {
    const [newMessage,setNewMessage]=useState();
    const scrollRef = useRef();
    const history = useHistory();
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    let connectedUser = useSelector(selectConnectedUser)
    const id = useSelector(selectConnectedUser).id
    let messages=JSON.parse(localStorage.getItem('chatbotsession'));
    let chartbotRandomMessages=["Do you like this module's presentation ?","If you want to chat with your friends you can go to Community",
    "Do you like the mixture between pdf files and videos ?","Are you satisfied with this module's content ?","You can evaluate modules you are subscribed in",
    "Please complete you personal informations in your profile if it is not completed"]
    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      
    }, []);
    useEffect(() => {


      socket.current.emit("addUserBot", connectedUser.id);
      socket.current.on("getUsersBot", (usersBot) => {});
    }, [connectedUser]);
  
    useEffect(() => {
      arrivalMessage &&
       
       messages.push(arrivalMessage)
    }, [arrivalMessage]);

 
    const handleSubmit = async (e) => {
        const message = {text:newMessage , own:true  };
        let i=Math.floor(Math.random()*chartbotRandomMessages.length)
        
        const messagerps = {text: chartbotRandomMessages[i], own:false  };
        messages.push(message,messagerps)
        localStorage.setItem("chatbotsession",JSON.stringify (messages))
        
        setNewMessage("")
        socket.current.emit("sendMessageBot", {senderId:id,receiverId:id, message:message});   
    }



    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
       handleSubmit(e);
      }
  }
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    return (

        <>
            <div id="body">
                <div id="chat-circle" class="btn btn-raised">

                    <div id="chat-overlay"></div>
                    <center><p style={{fontSize:"large"}}>,,</p></center>
                </div>

                <div class="chat-box">
                    <div class="chat-box-header">
                        ChatBot
                        <span class="chat-box-toggle">x</span>
                    </div>
                    <div class="chat-box-body">
                        <div class="chat-box-overlay">
                        </div>
                        <div class="chat-logs">
                        {messages && messages.map((m) => (
                            
                      <div ref={scrollRef}>
                        <Message message={m}  user={connectedUser}  />
                      </div>
                    ))}
                        </div>
                    </div>

                    <div class="flex-grow-0 border-top">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Type your message" onChange={(e) => { setNewMessage(e.target.value) }} onKeyPress={(e) => { handleKeyPress(e) }}
                        value={newMessage} />
                      <button class="btn btn-template-chatbot" onClick={handleSubmit}>Send</button>
                    </div>
                  </div>
                   
                  
                </div>
            </div>
        </>
    );
}



