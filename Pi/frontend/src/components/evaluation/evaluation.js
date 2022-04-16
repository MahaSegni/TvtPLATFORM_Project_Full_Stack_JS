import styled from "styled-components";
import { useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import "../../assets/css/evaluations.css"
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";

export default function Evaluation({ props, id, update, ev, deleteEvaluation, updateStatus, consult, owner, evq }) {
  const history = useHistory();
  const [evaluation, setEvaluation] = useState(ev);
  let connectedUser = useSelector(selectConnectedUser)

  function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  return (

    <>
      <tr id="mydiv">
        <td>
          {evaluation.image != null &&
            <img src={require('../../assets/uploads/evaluation/' + evaluation.image)} alt="" />}
          {evaluation.image == null &&
            <img src={require('../../assets/img/evaluation1.jpg')} alt="" />}

          <a class="user-link">{Capitalize(evaluation.title)}</a>
          <span class="user-subhead text-capitalize" style={{ color: "rgb(5, 68, 104)" }}>Module: {evaluation.nomModule}</span>
        </td>
        <td>
          <a><span style={{ color: "black"}}>Created at : </span><span style={{ color: "rgb(5, 68, 104)" }}>{evaluation.date.substring(0, 10)}</span></a>
        </td>
        <td>
          <a><span style={{ color: "black"}}>Last edit : </span><span style={{ color: "rgb(5, 68, 104)" }}>{evaluation.lastEdit.substring(0, 10)}</span></a>
        </td>
        <td style={{ width: "20%" }}>
          {owner == true && evaluation.public == false &&
            <a onClick={() => { update(true); id(evaluation._id) }} style={{ border: 0, background: "transparent", color: "#5FCF80" }} class="table_evaluation-link">
              <span class="fa-stack">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
              </span>
            </a>}
          {owner == true && evaluation.public == true &&
            <a style={{ border: 0, background: "transparent", color: "#5FCF80", opacity: 0.6 }} class="table_evaluation-link">
              <span class="fa-stack">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-pencil fa-stack-1x fa-inverse" title="You should unpublish before editing"></i>
              </span>
            </a>}
          {owner == true &&
            <a data-toggle="modal" data-target={`#ConfirmationModal${evaluation._id}`} style={{ border: 0, background: "transparent", color: "red" }} class="table_evaluation-link">
              <span class="fa-stack">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
              </span>
            </a>}
          {connectedUser.type === "admin" &&
            <a  data-toggle="modal"  data-target={`#ConfirmationModal${evaluation._id}`}style={{ border: 0, background: "transparent", color: "red" }} class="table_evaluation-link">
              <span class="fa-stack">
                <i class="fa fa-square fa-stack-2x"></i>
                <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
              </span>
            </a>}
          {owner == true &&
            <>
              {evaluation.containsQuestions === true &&
                <a onClick={() => updateStatus(evaluation._id)} style={{ border: 0, background: "transparent", color: "black" }} class="table_evaluation-link">
                  <span class="fa-stack">
                    <i class="fa fa-square fa-stack-2x"></i>
                    {evaluation.public === false &&
                      <i class="fa fa-lock fa-stack-1x fa-inverse"></i>}
                    {evaluation.public === true &&
                      <i class="fa fa-unlock fa-stack-1x fa-inverse"></i>}
                  </span>
                </a>}
              {evaluation.containsQuestions === false &&
                <a style={{ border: 0, background: "transparent", color: "black", opacity: 0.4 }} class="table_evaluation-link" >
                  <span class="fa-stack">
                    <i class="fa fa-square fa-stack-2x"></i>
                    {evaluation.public === false &&
                      <i class="fa fa-lock fa-stack-1x fa-inverse" title="You should add at least one question to publish the evaluation"></i>}
                    {evaluation.public === true &&
                      <i class="fa fa-unlock fa-stack-1x fa-inverse"></i>}
                  </span>
                </a>}
            </>}
          <a onClick={() => { consult(true); id(evaluation._id); evq(evaluation) }} class="btn btn-sm pull-right btn-template" >
            Consulter
          </a>
        </td>

      </tr>
      {/*  -----------------------------------------------------ConfirmationModal----------------------------------------------*/}
      
      <div class="modal fade" id={`ConfirmationModal${evaluation._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
              <button type="button" class="btn btn-template" data-dismiss="modal" onClick={() => {deleteEvaluation(evaluation._id)}}>Submit</button>
              </div>
              </div>
            </div>
          </div>
      

    </>
  );
}



