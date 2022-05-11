import "../../assets/css/chatbotAdmin.css";
import AddChatbotAdmin from "./addChatbotAdmin"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function MessageChatbotAdmin({ props,q,setMSetted,mSetted}) {
  let connectedUser = useSelector(selectConnectedUser)
  let [userV, setUserV] = useState({})
  let [module, setModule] = useState({})

  useEffect(()=>{
    if (q.visibility[0]!="site"){
      try{
        axios.get(`${process.env.REACT_APP_API_URL}/module/getById/` + q.refModule).then(res => {
          setModule(res.data)
          setMSetted(true)
        })}
        catch (err) {console.log(err);}
    }
  })
    
  

  return (
    <tr id="mydiv">
      <td style={{ "textAlign": "left" }}>{q.text}</td>
      <td style={{ "textAlign": "left" }}>
        {q.visibility[0] == "site" && <a>All Users</a>}
        {q.visibility[0] != "site" &&
          <>
            
            {module.label&&  <a >{module.label}'s  <strong>subscribers</strong></a>}
            {!module.label&&  <a><i class="fas fa-spinner fa-pulse"></i> Loading module name's <strong>subscribers</strong></a>}
          </>}

       </td>
      <td style={{ "textAlign": "left" }}>{q.createdAt.substring(0, 10)}</td>
      <td style={{ "textAlign": "left" }}>{q.responseType}</td>
      <td><a class="text-danger" title="" data-original-title="Delete"
        data-toggle="modal" data-target={`#ConfirmationModal${q._id}`}><i class="far fa-trash-alt"></i></a></td>
    </tr>
  );
}
