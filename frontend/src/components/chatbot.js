
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../Redux/slices/sessionSlice";
import { useContext, useEffect, useRef, useState } from "react";
import "../assets/css/chatbot.css"
import "../assets/js/chatbot"
import axios from 'axios';
import Message from "./chatbot/messageChatbot"
export default function Chatbot() {
    let connectedUser = useSelector(selectConnectedUser)
    
    const [newMessage,setNewMessage]=useState(null);
    const [confirmRsp,setConfirmRsp]=useState(false);
    const scrollRef = useRef();
    const history = useHistory();
    let chatbotsession=[];
    const id = useSelector(selectConnectedUser).id
    let messages=JSON.parse(localStorage.getItem('chatbotsession'));
       
       
    
    let chartbotRandomMessages=["Do you like this module's presentation ?","If you want to chat with your friends you can go to Community",
    "Do you like the mixture between pdf files and videos ?","Are you satisfied with this module's content ?","You can evaluate modules you are subscribed in",
    "Please complete you personal informations in your profile if it is not completed"]
     
  
     if(newMessage!=null){
     messages=JSON.parse(localStorage.getItem('chatbotsession'));
     setNewMessage(null)}



    async function ConfirmResponse  (a,b){
      
        
      chatbotsession=JSON.parse(localStorage.getItem('chatbotsession'))
      delete chatbotsession[chatbotsession.length-1].responses
      
      chatbotsession.push({text:a.text,own:true})
      localStorage.setItem("chatbotsession",JSON.stringify (chatbotsession))
      messages=JSON.parse(localStorage.getItem('chatbotsession'));
      setNewMessage({text:a.text,own:true})
      if(chatbotsession.length>3){
      
        if(a.text=="I dont want to answer"){
          try{
            await axios.get("http://localhost:3000/api/chatbot/delete/" + id+"/"+b,  { headers: {"Authorization" : ` ${connectedUser.token}`} }).then(async res  => {
              await axios.get("http://localhost:3000/api/chatbot/get/" + id, { headers: {"Authorization" : ` ${connectedUser.token}`} }).then(res => {
              console.log(res.data) 
               chatbotsession.push(res.data)
                localStorage.setItem("chatbotsession",JSON.stringify (chatbotsession))
                setNewMessage(res.data)
                
             
              })
              })}
            catch (err) {console.log(err);}
          
        }
        else{
        try{
        await axios.post("http://localhost:3000/api/chatbot/submit/" + id+"/"+b+"/"+ a.value,  { headers: {"Authorization" : ` ${connectedUser.token}`} }).then(res => {
           
           chatbotsession.push(res.data)
            localStorage.setItem("chatbotsession",JSON.stringify (chatbotsession))
            setNewMessage(res.data)
            
      })}
        catch (err) {console.log(err);} }
 
      } 

      else{
        if(a.text=="yes"){ 
          try{ console.log("ok")
            
          await axios.get("http://localhost:3000/api/chatbot/get/" + id, { headers: {"Authorization" : ` ${connectedUser.token}`} }).then(res => {
            chatbotsession.push(res.data)
            localStorage.setItem("chatbotsession",JSON.stringify (chatbotsession))
            setNewMessage(res.data)
            
          })}
          catch (err) {console.log(err);}
      }}
       
      
      

    }
  

   /* const handleSubmit = async (e) => {
        const message = {text:newMessage , own:true  };
        let i=Math.floor(Math.random()*chartbotRandomMessages.length)
        const messagerps = {text: chartbotRandomMessages[i], own:false  };
        messages.push(message,messagerps)
        localStorage.setItem("chatbotsession",JSON.stringify (messages))
        setNewMessage("")
    }*/



    /*const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
       handleSubmit(e);
      }}*/
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    return (

        <>
            <div id="body">
                <div id="chat-circle" class="btn btn-raised">

                    <div id="chat-overlay"></div>
                    <center><p style={{fontSize:"large"}}></p></center>
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
                        <Message tabmessages={messages} message={m} ConfirmResponse={ConfirmResponse}  user={connectedUser}  />
                      </div>
                    ))}
                        </div>
                    </div>
                    {/*
                    <div class="flex-grow-0 border-top">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Type your message" onChange={(e) => { setNewMessage(e.target.value) }} onKeyPress={(e) => { handleKeyPress(e) }}
                        value={newMessage} pattern='[A-Z]'/>
                      <button class="btn btn-template-chatbot" onClick={handleSubmit}>Send</button>
                    </div>
                        </div>*/}
                   
                  
                </div>
            </div>
        </>
    );
}



