import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Evaluation from "./evaluation";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { render } from "@testing-library/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";

const Evaluations = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let connectedUser = useSelector(selectConnectedUser)
  console.log(connectedUser.type)

  const [evaluations, err, reloadEv] = useApi('evaluation/get', null, 'GET', false,);

  const deleteEvaluation = async (id) => {
    const [,err] = await queryApi('evaluation/delete/'+id,null,"GET", false);
    reloadEv();
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

    return (
      <>
        <Footer>
        {connectedUser.type!=="admin" &&
          <Button onClick={() => props.history.push("/addEvaluation")}>Add Evaluation</Button>
        }
        </Footer>
      {evaluations && 
        <div class="container">
          <div class="row">
            <div class="table-responsive">
              <table class="table user-list">
                <tbody>
                  {
                    evaluations.map((evaluation, index) => (
                      <Evaluation evaluation={evaluation}
                        key={index}
                      deleteEvaluation={deleteEvaluation}
                      updateStatus={updateStatus}
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
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #5FCF80;
  border-radius: 3px;
`;
const Footer = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.15rem;
  text-align: right !important;
`;