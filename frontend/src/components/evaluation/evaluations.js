import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Evaluation from "./evaluation";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { render } from "@testing-library/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import AddEvaluation  from "./addEvaluation";
import EvResults  from "./question/results";
import UpdateEvaluation from "./updateEvaluation";
import Questions from "./question/questions";
import $ from "jquery"
const Evaluations = (props) => {
  var idModule="null";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [consult, setConsult] = useState(false);
  const [evaluationq, setEvaluationq] = useState();
  const [idev, setIdev] = useState();
  const [evresults, setEvResults] = useState(false);
 

  let connectedUser = useSelector(selectConnectedUser)

  $(document).ready(function () {
          $("#search").on("keyup", function () {
              var value = $(this).val().toLowerCase();
              $("#mydiv ").filter(function () {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
          });
     });

  if(connectedUser.type!=="admin"){
    idModule="622e1c68ecacff8056ddbc18";
  }
  const [evaluations, err, reloadEv] =  useApi('evaluation/get/'+ connectedUser.id+'/'+ idModule, null, 'GET', false);
  const [owner, errOwner, reloadOwner] =  useApi('evaluation/getOwner/'+ connectedUser.id +'/' +idModule , null, 'GET', false);

   //console.log(evaluations)
  const deleteEvaluation = async (id) => {
    const [,err] = await queryApi('evaluation/delete/'+id,null,"GET", false);
    reloadEv()
}

  async function updateStatus (id) {
    console.log(id);
    const [, err] = await queryApi('evaluation/updateStatus/'+id, null, 'POST', false);
    reloadEv();
}


  /*useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/evaluation/get`, { method: 'GET', })
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          console.log(data);
          setEvaluations(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])*/

  return owner!==null && consult == true ? (<Questions evq={evaluationq} owner={owner} consult={setConsult} rlEv={reloadEv}/>):
  update == true ?(<UpdateEvaluation idU={idev} update={setUpdate} reload={reloadEv}/>):
  evresults == true ? (<EvResults evaluations={evaluations}/>):
   (
      <>
               <div class="container mt-5">
               {owner==true && 
                <Button onClick={()=>{setEvResults(true)}} class="btn-template" style={{ color:"black", border:"2px solid black", marginBottom:"1%"}}><i class="fa fa-bar-chart" style={{color:"black",fontSize:"25px", paddingRight:"10"}}></i>See Results</Button>
               }
                <div class="row" style={{marginBottom:"2%"}}>
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-body p-t-0">
                                <div class="input-group">
                                    <input type="text" id="search" name="example-input1-group2" class="form-control" placeholder="Search" />
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-effect-ripple btn-template"><i class="fa fa-search" ></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

           
         
      
       
      {evaluations  && owner!=null &&
       
        <div class="container">
          {owner==true && 
           <label style={{marginLeft:"83%"}}>
            <Button  onClick={() => setAdd(!add)}>Add Evaluation</Button>&nbsp;&nbsp;
          </label>
          
        }
        {add==true &&
         <AddEvaluation add={setAdd} reload={reloadEv}/>
         }
          <div class="row">
            <div class="table-responsive">
              <table class="table user-list"  >
                <tbody>
                  {
                    evaluations.map((evaluation, index) => (
                      <Evaluation ev={evaluation}
                      key={index}
                      deleteEvaluation={deleteEvaluation}
                      updateStatus={updateStatus}
                      id={setIdev}
                      update={setUpdate}
                      consult={setConsult}
                      owner={owner}
                      evq={setEvaluationq}
                    >
                      </Evaluation>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        }                
        </>
    );
}

export default Evaluations;

const ProductsWrapper = styled.div`
 text-align: center; 
 display: flex; 
`;
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
const Footer = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.15rem;
  text-align: right !important;
`;