import "../../assets/css/chatbotAdmin.css";
import AddChatbotAdmin from "./addChatbotAdmin"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useSelector } from "react-redux";



export default function ChatbotMessage() {
  let connectedUser = useSelector(selectConnectedUser)
  const [add, setAdd] = useState(false);
  const [questions, err, reload] = useApi('evquestion/get/' + "", null, 'GET', false, connectedUser.token);
    return (
      <div class="container">
      <label style={{marginLeft:"83%"}}>
        <Button  onClick={() => setAdd(!add)}>Add question</Button>&nbsp;&nbsp;
      </label>  
    {add==true && <AddChatbotAdmin add={setAdd} reload={reload}/>}
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