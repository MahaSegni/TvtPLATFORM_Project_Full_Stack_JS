import "../../assets/css/messenger.css";

import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { useApi } from "../../utils/useApi";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { Dropdown } from 'react-bootstrap';
import $ from 'jquery'
import { queryApi } from "../../utils/queryApi";
import Picker from 'emoji-picker-react';
export default function Messenger({ setMessenger }) {

  const [uploadImage, setUploadImage] = useState({image:""})

  const [friend, setFriend] = useState(null);
  const [needrl, setNeedrl] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const id = useSelector(selectConnectedUser).id
  const user = useSelector(selectConnectedUser)
  const scrollRef = useRef();
  const[emojiActive,setemojiActive]=useState(false)
  let [conversationFriend, setConversationFriend] = useState(null);
  const [fileuploaded,setfileuploaded]=useState(false)
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const ref = useRef();
 

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        image:data.image
      });
    });}, []);

 //---getConversations---//
const [conversations, errr, rload] = useApi('conversations/' + id, null, 'GET', false)  
 //---getFriends before conversation---//  
let [Friendslist, err, reloadFriends] = useApi('friends/getMyFriends/' + id, null, 'GET', false, user.token);   
//---setUploadImage---//
const onChangeFile = (e) => {  setfileuploaded(true)
  setUploadImage({ ...uploadImage, image: e.target.files[0] })}
//---setemoji---//
  const onEmojiClick =async (event, emojiObject) => {
     setChosenEmoji(emojiObject);
     setNewMessage(newMessage + chosenEmoji.emoji)
  };
  //---Search---//
  $(document).ready(function () {
    $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#mydiv ").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
//---updateConversation---//
  const updateConversation = async (c) => {c.name = document.getElementById("updateName" + c._id).value;
                                          let [chat, err, rlchat] = await queryApi('conversations/update/', c, 'PUT', false);
                                          rload();}
//---deleteConversation---//
  const deleteConversation = async (c) => {await queryApi('conversations/delete/', c, 'POST', false);
                                          setCurrentChat(null);
                                          rload();}

  //---getUsers---//

  useEffect(() => {if (currentChat){const friendId = currentChat.members.find((m) => m !== user.id );
                                    const getUser = async () => {try {
                                                                      const res = await axios.get("http://localhost:3000/api/user/getGeneralInfo/" + friendId)
                                                                      .then( res => { setFriend(res.data) });
                                                                      } catch (err) {console.log(err);}
                                                                };
                                    getUser();}}, [user, currentChat]);

  useEffect(() => { socket.current.emit("addUser", user.id);
                    socket.current.on("getUsers", (users) => {
                    setOnlineUsers(Friendslist);});
                  }, [user]);

  //---getMessages---//
  

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {try {const res = await axios.get("http://localhost:3000/api/messages/" + currentChat?._id);
                                          setMessages(res.data);
                                         } catch (err) {console.log(err);}
                                    };
                                      getMessages();
                  }, [currentChat]);

  //----submit message ---- //
  const handleKeyPress = (e) => {if (e.key === 'Enter') { handleSubmit(e);}}

  const handleSubmit = async (e) => 
  { const message = {sender: id,text: newMessage, conversationId: currentChat._id,};
    const receiverId =await  currentChat.members.find((member) => member !== id);
    if (fileuploaded)
    {const data = new FormData() 

       data.append('image', uploadImage["image"])
      axios.post("http://localhost:3000/api/messages", message).then(
        res=>{
          ref.current.value = "";

        axios.post("http://localhost:3000/api/messages/upload/"+res.data._id,data,
        {headers: {'Content-Type': 'form-data'}
      }).then(res=>{setNewMessage("");
                    setUploadImage({ ...uploadImage, image: ""})
                    setfileuploaded(false)
                    setMessages(prev => [...prev, res.data]);
                    socket.current.emit("sendMessage", {senderId: id,receiverId: receiverId,text: res.data.text,image:res.data.image,})
                  })
             })
    }
    else 
    {socket.current.emit("sendMessage", {senderId: id,receiverId: receiverId,text: newMessage,image:null,});
        try {await axios.post("http://localhost:3000/api/messages", message).then(res => {setMessages([...messages, res.data]);setNewMessage("");});}
        catch (err) {console.log(err);}}
  };
   //----scroll ---- //
  useEffect(() => {scrollRef.current?.scrollIntoView({ behavior: "smooth" });}, [messages]);

  return (
    <>
      {conversations &&
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <div class="input-group" style={{ marginBottom: "2%" }}>
                <input type="text" id="search" name="example-input1-group2" class="form-control" placeholder="Search" />
                <span class="input-group-btn">
                  <button type="button" class="btn btn-effect-ripple btn-template"><i class="fa fa-search" ></i></button>
                </span>
              </div>
              {conversations.map((c) => (
                <div onClick={() => { rload();  setCurrentChat(c);  }}>
                  <Conversation id="mydiv" conversation={c} currentUser={user}  />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat && friend ? (
                <>
                  <div class="modal fade" id={`exampleModal${currentChat._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Update Chat</h5>
                          <button type="button" class="btn btn-template close" data-dismiss="modal" id="cancelBtn" aria-label="Close" onClick={() => { rload() }}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <input id={`updateName${currentChat._id}`} defaultValue={currentChat.name}></input>
                        </div>
                        <div class="modal-footer">
                          <button type="button" id="cancelBtn" class="btn btn-template" data-dismiss="modal" onClick={() => { rload() }}>Close</button>
                          <button type="button" class="btn btn-template" data-dismiss="modal" onClick={() => { setConversationFriend(null); updateConversation(currentChat) }} >Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal fade" id={`deleteModal${currentChat._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Update Chat</h5>
                          <button type="button" class="btn btn-template close" data-dismiss="modal" id="cancelBtn" aria-label="Close" onClick={() => { rload() }}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>Confirm deletion?</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" id="cancelBtn" class="btn btn-template" data-dismiss="modal" onClick={() => { rload() }}>Close</button>
                          <button type="button" class="btn btn-template" data-dismiss="modal" onClick={() => { deleteConversation(currentChat) }} >Save</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class=" py-2 px-4 border-bottom d-none d-lg-block " style={{ position: "fixed", backgroundColor: "white", width: "37.2%" }}>
                    <div class="d-flex align-items-center py-1">
                      <div class="position-relative">

                         {friend && friend.image.startsWith("https") &&

                          <img src={friend.image} class="conversationImg"
                            referrerpolicy="no-referrer"></img>
                        }
                        {friend &&  !friend.image.startsWith("https") && <img class="conversationImg" src={require('../../assets/uploads/user/' + friend.image)} alt=""
                        />
                        }
                      </div>
                      <div class="flex-grow-1 pl-3">
                      <a href={`/check/${friend._id}`} style= {{ color: "black" }}  > <strong>{currentChat.name}</strong></a> 
                      </div>
                      <div >
                        <Dropdown  >
                          <button class="btn btn-template btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                          <button class="btn btn-lg mr-1 px-3 d-none d-md-inline-block" style={{ backgroundColor: "rgb(5, 68, 104)", color: "white" }} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                          <Dropdown.Toggle variant="light" class="btn btn-light border btn-lg px-3  "><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-toggle="dropdown" aria-haspopup="true" id="dropdownMenuLink" aria-expanded="false" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item  data-toggle="modal" data-target={`#exampleModal${currentChat._id}`} >updateConversation</Dropdown.Item>
                            <Dropdown.Item  data-toggle="modal" data-target={`#deleteModal${currentChat._id}`}>Delete Conversation </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="chatBoxTop" style={{ marginTop: "15%" }}>
                    {messages.map((m,indexm) => (
                      <div ref={scrollRef}>
                        <Message index={indexm} message={m} own={m.sender === id} user={user} friend={friend} />
                      </div>
                    ))}
                  </div>
                  {emojiActive &&  <Picker   onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%',height:"40%"}}   /> }
                  <div class="flex-grow-0 py-2  border-top">
                    <div class="input-group">
                  <label style={{marginTop:"1%"}}>  <label  for="file"  class="label-file"><i style={{ color:"#ccc",backgroundColor:"#6C7592"}} class="fas fa-file-upload fa-lg"></i></label>
                    <button style={{backgroundColor:"transparent",border:"0px"}} value="Toggle" onClick={()=>{setemojiActive(!emojiActive)}}  ><i class="fa fa-smile-o fa-lg" style={{color:"#ffcb4c"}}></i> </button></label>
                    <input id="file" class="input-file" 
                          type='file'
                          name="image"
                          ref={ref}
                          onChange={(e)=>onChangeFile(e)}/>
                      <input  type="text" class="form-control" placeholder="Type your message" onChange={(e) => { setNewMessage(e.target.value) }} onKeyPress={(e) => { handleKeyPress(e) }}
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
          {Friendslist &&
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <ChatOnline
                  conversations={conversations}
                  RL={rload}
                  onlineUsers={Friendslist}
                  currentId={id}
                  setCurrentChat={setCurrentChat}
                  setFriend={setFriend}
                />
              </div>
            </div>}
        </div>
      }
    </>
  );
}