import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi";
import { Card, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const QuizStudentListe = () => {
    var connectedUser = useSelector(selectConnectedUser)
    
    const params=useParams()
    console.log(params.idModule)
    const history = useHistory()

    const[quizzes,errquiz,reloadquiz]= useApi('quiz/' + params.idModule+'/findall', null, 'GET', false, connectedUser.token);
    const [module,err,reloadModule]=useApi("cours/getModuleofcours/"+params.idModule,null,'GET',false,connectedUser.token);
    
    if(connectedUser.type=="disconnected"){
        history.push("/signin")
  
      }

      useEffect(() => {
        if(module){
            console.log(module)
            if(module.refStudents.filter(r=>r==connectedUser.id)<=0&&module.idowner!=connectedUser.id){
                history.push("/module")
            }
        }
        },[module])
   return (quizzes&&
    <div class="row my-4 mx-auto" style={{width:"95%" }}>
    <div class="col-3"></div>
    <div class="col-8">
    <div class="card border-0">
    <h5 class="card-header" style={{backgroundColor: "#5FCF80",color:"white"}}>Practice to Learn </h5>

    {quizzes.map((quiz, index) => (
        <div class="my-3 mx-2" key={index}>
        <div class="card " style={{cursor: "pointer"}} onClick={()=>history.push("/studentQuiz/"+quiz._id)}>
        <div class="card-body">
        <div class="row">
            <div class="col-1 ms-1">
                <FontAwesomeIcon icon={faFileContract} size="3x" color="#5FCF80" ></FontAwesomeIcon>
                </div>
                <div class="col-8 my-auto" style={{ fontSize: 20 }}>{quiz.title}</div>
                <div class="col my-auto" style={{textAlign: 'right'}}>{quiz.Questions.length} Questions</div>
        </div> 
        </div>
        </div> 
        </div>  
       ))
    }
     </div>
     </div>

    </div>
   )
}
export default QuizStudentListe