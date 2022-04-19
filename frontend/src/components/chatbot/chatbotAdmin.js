import "../../assets/css/chatbotAdmin.css";
import AddChatbotAdmin from "./addChatbotAdmin"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useSelector } from "react-redux";
import axios from 'axios';


export default function ChatbotMessage() {
  let connectedUser = useSelector(selectConnectedUser)
  const [add, setAdd] = useState(false);
  const [questions, err, reload] = useApi('chatbot/get' , null, 'GET', false, connectedUser.token);
  let [userV,setUserV]=useState({})  
  let [module,setModule]=useState({})  
  const deleteQ = async (e) => {
    const [result, err] = await queryApi('chatbot/delete/'+e, null, "GET", false, connectedUser.token);
    reload();
}

function getModule(v) {
  axios.get("http://localhost:3000/api/module/getById/" + v).then( res => {
setModule(res.data)  })                                                   
};


  function getUser(v) {
     axios.get("http://localhost:3000/api/chatbot/getGeneralInfo/" + v).then( res => {
  setUserV(res.data)  })                                                   
  };
    return (

      <div class="container ">
        <label style={{marginLeft:"83%"}}>
        <Button  onClick={() => setAdd(!add)}>Add question</Button>&nbsp;&nbsp;
      </label>  
      <br/>
  
    {add==true && <AddChatbotAdmin  add={setAdd} reload={reload}/>}
    <div class="customTable" style={{marginTop:"2%"}}>
                    <div class="table-wrapper">
                        {questions &&
                            <table class="fl-table">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Visibility</th>
                                        <th>Date Creation</th>
                                        <th>Response type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions &&
                                        questions.map((q, index) => (  
                                            <>
                                            <tr key={index}>        
                                              <td style={{"textAlign":"left"}}>{q.message}</td>
                                              <td style={{"textAlign":"left"}}>   {q.visibility[0]=="site" &&
                                        <a>All Users</a>}
                                         {q.visibility[0]!="site" &&
                                         <>
                                         { getModule(q.refModule)}
                                           {module&& <a >{module.label}'s  subscribers</a>}
                                           </>}
                                                                                                             
                                         {/*q.visibility[0]!="site" &&
                                        q.visibility.map((v, indexv) =>  (
                                          <> 
                                             {getUser(v)}
                                           {userV&& <a key={indexv}>{userV.name} &nbsp; {userV.lastName} &nbsp; | &nbsp; </a>}
                                        </>  ))*/}
                                              </td>
                                              <td style={{"textAlign":"left"}}>{q.createdAt.substring(0, 10)}</td>
                                              <td style={{"textAlign":"left"}}>{q.responseType}</td>
                                              <td><a class="text-danger" title="" data-original-title="Delete"
                                              data-toggle="modal" data-target={`#ConfirmationModal${q._id}`}><i class="far fa-trash-alt"></i></a></td>
                                            </tr>
                                            {/*  -----------------------------------------------------ConfirmationModal----------------------------------------------*/}
                                            <div class="modal fade" id={`ConfirmationModal${q._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                  <div class="modal-dialog modal-dialog-centered" role="document">
                                                    <div class="modal-content">
                                                      <div class="modal-body">
                                                        <h4 class=" text-center" style={{ color: "#5fcf80" }}>Confirm Delete</h4>

                                                        <hr></hr>
                                                      </div>
                                                      <div class="modal-body text-center">
                                                        <p>Validate your deletion ?  </p>
                                                      </div>
                                                      <div class="modal-footer">
                                                        <button type="button" class="btn btn-template " id="cancelBtn" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-template" data-dismiss="modal" onClick={() => { deleteQ(q._id) }}>Submit</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                            </div></>
                                        ))}
                                    {questions.length <= 0 &&
                                        <tr>No questions avaible</tr>
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    
                </div>
     </div>


    );
  }
  const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")
  };
  color: #5FCF80;
  font-size: 1.5em;
  padding: 0.25em 1em;
  margin-top:1rem;
  border: 2px solid #5FCF80;
  border-radius: 3px;
`;