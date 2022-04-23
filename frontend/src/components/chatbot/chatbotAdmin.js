import "../../assets/css/chatbotAdmin.css";
import AddChatbotAdmin from "./addChatbotAdmin"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useSelector } from "react-redux";
import MessageChatbotAdmin from "./messageChatbotAdmin";
import $ from "jquery"

export default function ChatbotMessage() {
  let connectedUser = useSelector(selectConnectedUser)
  const [add, setAdd] = useState(false);
  const [questions, err, reload] = useApi('chatbot/get' , null, 'GET', false, connectedUser.token);
  const [moduleSetted,setModuleSetted]=useState(false)
  const deleteQ = async (e) => {
    const [result, err] = await queryApi('chatbot/delete/'+e, null, "GET", false, connectedUser.token);
    setModuleSetted(true)
    reload();
}

    $(document).ready(function () {
      $("#search").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#mydiv ").filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
      });
    });




    return (

      <div class="container ">
        <input type="text" id="search" name="example-input1-group2" class="form-control mt-4" placeholder="Search" />
        <label style={{marginLeft:"83%"}}>
        <Button  onClick={() => setAdd(!add)}>Add question</Button>&nbsp;&nbsp;
      </label>  
      <br/>
  
    {add==true && <AddChatbotAdmin  add={setAdd} reload={reload}/>}
    <div class="customTable" style={{marginTop:"2%"}}>
                    <div class="table-wrapper">
                        {questions &&
                            <table class="fl-tableBot">
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
                                            <MessageChatbotAdmin
                                              key={index}
                                              q={q}
                                              mSetted={moduleSetted}
                                              setMSetted={setModuleSetted}
                                            ></MessageChatbotAdmin>
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