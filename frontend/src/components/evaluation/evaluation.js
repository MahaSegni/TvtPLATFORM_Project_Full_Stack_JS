import styled from "styled-components";
import { useState } from 'react';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import "./evaluations.css";
import {format} from "date-fns";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";

export default function Evaluation(props){
  const history = useHistory();
  const [evaluation, setEvaluation] = useState(props.evaluation);
  let connectedUser = useSelector(selectConnectedUser)

  return (
    
    <>
                            <tr>
                                <td>
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                    <a href="#" class="user-link">{evaluation.title}</a>
                                    <span class="user-subhead">Module Name</span>
                                </td>
                                <td>
                                    <a href="#"><span style={{color:"black"}}>Created at </span> {evaluation.date.substring(0, 10)}</a>
                                </td>
                                <td>
                                    <a href="#"><span style={{color:"black"}}>Last edit </span> {evaluation.lastEdit.substring(0, 10)}</a>
                                </td>
                                <td style={{width: "20%"}}>
                                    {connectedUser.type!=="admin" && evaluation.public===false &&
                                    <a onClick={() => history.push(`/updateEvaluation/${evaluation._id}`)} style={{border:0, background:"transparent", color:"#5FCF80"}} class="table-link">
                                        <span class="fa-stack">
                                            <i class="fa fa-square fa-stack-2x"></i>
                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>}
                                    <a onClick={() => props.deleteEvaluation(evaluation._id)} style={{border:0, background:"transparent", color:"red"}} class="table-link">
                                        <span class="fa-stack">
                                          <i class="fa fa-square fa-stack-2x"></i>
                                          <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                    {connectedUser.type==="user" &&
                                    <a onClick={() => props.updateStatus(evaluation._id)} style={{border:0, background:"transparent", color:"black"}} class="table-link">
                                        <span class="fa-stack">
                                            <i class="fa fa-square fa-stack-2x"></i>
                                            {evaluation.public===true &&
                                            <i class="fa fa-lock fa-stack-1x fa-inverse"></i>}
                                            {evaluation.public===false &&
                                            <i class="fa fa-unlock fa-stack-1x fa-inverse"></i>}
                                        </span>
                                    </a>}
                                    {connectedUser.type==="admin" &&
                                    <a style={{border:0, background:"transparent", color:"black"}} class="table-link">
                                        <span class="fa-stack">
                                            <i class="fa fa-square fa-stack-2x"></i>
                                            {evaluation.public===true &&
                                            <i class="fa fa-lock fa-stack-1x fa-inverse"></i>}
                                            {evaluation.public===false &&
                                            <i class="fa fa-unlock fa-stack-1x fa-inverse"></i>}
                                        </span>
                                    </a>}
                                    <a class="btn btn-sm pull-right btn-template" >
                                        Consulter 
                                    </a>
                                </td>
                            </tr>
    </>
);
}
const button = styled.button`
`;
const ProductFrame = styled.div`
  border-radius: 25px;
  min-height: 200px;
  min-width: 200px;
  background-color: rgb(110, 110, 110, 0.7);
  margin: 10px;
  display: flex;
  flex-direction: column;
 
`;
const ProductImageWrapper = styled.div`
  margin: 5px;
  max-width: 200px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
const ProductInfoWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  & > span {
    text-align: center;
  }
`;
const ProductFrameBest = styled.div`
  border-radius: 25px;
  min-height: 200px;
  min-width: 200px;
  background-color: #DB7093;
  margin: 10px;
  display: flex;
  flex-direction: column;
  animation:  clignote 2s linear infinite;
  @keyframes clignote {  
  50% { opacity: 0.5; }
}
`;
const ProductImageWrapperBest = styled.div`
  margin: 5px;
  max-width: 200px;
`;
const ProductImageBest = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
const ProductInfoWrapperBest = styled.div`
  color:white;
  margin-top: auto;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  & > span {
    text-align: center;
  }
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Action = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.25rem;
  text-align: right !important;

`;
const ButtonDelete = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "red" : "white"};
  color: ${props => props.primary ? "white" : "red"};
  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid red;
  border-radius: 3px;
`;
const ButtonUpdate = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "blue" : "white"};
  color: ${props => props.primary ? "white" : "blue"};

  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;