import "../../assets/css/messenger.css";

import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { useApi } from "../../utils/useApi";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const id = useSelector(selectConnectedUser).id
  const user = useSelector(selectConnectedUser)
  const scrollRef = useRef();
  let [Friendslist, err, reloadFriends] = useApi('friends/getMyFriends/' + id, null, 'GET', false, user.token);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {


    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(

        Friendslist
      );
    });
  }, [user]);

  useEffect(() => {

    const getConversations = async () => {
      try {


        await axios.get("http://localhost:3000/api/conversations/" + id).then(res => {

          setConversations(res.data)
        });
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();


  }, [id]);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const getName=(()=>{
    return "marwen"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== id
    );


    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:3000/api/messages", message).then(res => {
        setMessages([...messages, res.data]);
        setNewMessage("");
      }
      );

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  return (
    <>
      {conversations[0] &&


        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <div class="input-group" style={{marginBottom:"2%"}}>
                <input type="text" id="search" name="example-input1-group2" class="form-control" placeholder="Search" />
                <span class="input-group-btn">
                  <button type="button" class="btn btn-effect-ripple btn-template"><i class="fa fa-search" ></i></button>
                </span>
              </div>
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div class=" py-2 px-4 border-bottom d-none d-lg-block " style={{ position: "fixed", backgroundColor: "white", width: "37.2%" }}>
                    <div class="d-flex align-items-center py-1">
                      <div class="position-relative">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                      </div>
                      <div class="flex-grow-1 pl-3">
                        <strong>{getName()}</strong>
                      </div>
                      <div>
                        <button class="btn btn-template btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                        <button class="btn btn-lg mr-1 px-3 d-none d-md-inline-block" style={{backgroundColor:"rgb(5, 68, 104)", color:"white"}} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                        <button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                      </div>
                    </div>
                  </div>
                  <div className="chatBoxTop" style={{ marginTop: "15%" }}>

                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === id} />
                      </div>
                    ))}
                  </div>
                  <div class="flex-grow-0 py-3 px-4 border-top">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Type your message" onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage} />
                      <button class="btn btn-template" onClick={handleSubmit}>Send</button>
                    </div>
                  </div>

                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={id}
                setCurrentChat={setCurrentChat}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
}
