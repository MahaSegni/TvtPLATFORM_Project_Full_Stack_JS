import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi";
import { useHistory } from 'react-router-dom';
import { Badge, Card, Collapse, Table } from "react-bootstrap";
import AddQuiz from "./AddQuiz";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { queryApi } from "../../utils/queryApi";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Switch } from "@mui/material";
import AddQuestion from "./AddQuestion";

const QuizTeacher = () => {
    const[openAdd,setopenAdd]=useState(false)
    const[ShowAddQuestion,setShowAddQuestion]=useState(false)
    const[Quizselected,setQuizselected]=useState(null);
    const[editQuiz,setEditQuiz]=useState(false);
    const[KeySelected,setKeySelected]=useState(-1)
    const [checked, setChecked] = useState(false);
    const[erroChronoval,seTerroChronoval]=useState(false);
    const history = useHistory()

    var connectedUser = useSelector(selectConnectedUser)
    console.log(connectedUser)
    if(connectedUser.type=="disconnected"){
      history.push("/signin")

    }
    const handleChange = async (event) => { 
      setChecked(event.target.checked);
      if(event.target.checked==false ){
        const [, err] =  await queryApi('quiz/update' ,{
       
          id:Quizselected._id,
          chrono:false,
          chronoVal:0,
        }
        , 'PATCH', false,connectedUser.token);
        reloadquiz()
      }
    };
    const updateQuiz=(event)=>{
      console.log(event)
    }
    var connectedUser= useSelector(selectConnectedUser)
    let { idModule } = useParams();
    const [module, err, reloadmodule] =  useApi('cours/getModuleofcours/' + idModule, null, 'GET', false, connectedUser.token);
    const[quizzes,errquiz,reloadquiz]= useApi('quiz/' + idModule+'/findall', null, 'GET', false, connectedUser.token);


    if(module){
        if(module.idowner!=connectedUser.id){
            let url = "/module/"+idModule+"/allcours"
            history.push(url)
        }
       
    }
    const handleKeyPresstitle = async (event) => {
   
      if(event.key === 'Enter'){
         
      const [, err] =  await queryApi('quiz/update' ,{
       
        id:Quizselected._id,
        title:event.target.value,
      }
      , 'PATCH', false,connectedUser.token);
      reloadquiz()
      
    }
    }
    const handleKeyPresschrono = async (event) => {
   
      if(event.key === 'Enter'){
      if(event.target.value>0){
      const [, err] =  await queryApi('quiz/update' ,{
       
        id:Quizselected._id,
        chrono:checked,
        chronoVal:event.target.value,
      }
      , 'PATCH', false,connectedUser.token);
      
      reloadquiz()
      seTerroChronoval(false);
    }else{
      seTerroChronoval(true);
      
    }
    }
    }
   async function AddQuestionEvent(data,responses){
    const [q, err] =  await queryApi('quiz/addQuestion/'+Quizselected._id ,{
       
      texte:data.texte,
      QuestionType:data.QuestionType,
      Responses:responses
    }
    , 'PATCH', false,connectedUser.token);
setQuizselected(q)
   }
    async function addQuizFn(data,timer){
    console.log(data)
    if(timer){

      const [, err] =  await queryApi('quiz/'+ idModule+'/create' ,{
        title:data.title,
        chrono:true,
        chronoVal:data.chrono

    }
   , 'POST', false,connectedUser.token);
    }else{
      const [, err] =  await queryApi('quiz/'+ idModule+'/create' ,{
        title:data.title

    }
   , 'POST', false,connectedUser.token);

    }
    reloadquiz();
    setopenAdd(false)
    
    }
    async function DeleteQuestion(idquiz,idQuestion){

      const [q, err] = await queryApi('quiz/deleteQuestion/'+idquiz+'/'+idQuestion, null
        , 'GET', false,connectedUser.token);
        reloadquiz();
        setQuizselected(q)

      }
    async function confirDeleteQuestion(idquiz,idQuestion){
      confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>DeleteQuestion(idquiz,idQuestion)
          },
          {
            label: 'No',
            onClick: () => {
  
            }
          }
        ]
      });
    }
    async function confirmDelete(id){
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deletequiz(id)
            },
            {
              label: 'No',
              onClick: () => {
    
              }
            }
          ]
        });
      } 
    async function deletequiz(id){

        const [, err] = await queryApi('quiz/delete/'+id, null
          , 'GET', false,connectedUser.token);
          reloadquiz();
        }
    
    
 return (
     <div>{module&&quizzes&&
    <div>
    <div class="row mt-5 mx-auto" >
        
     <div class="col-4 me-3">
      {openAdd==false&&
     <a class="btn  col-12 btncustom mb-3" onClick={()=>setopenAdd(true)}>Add Quiz</a>
      }
      {openAdd==true&&
     <a class="btn  col-12 btncustom mb-3" onClick={()=>setopenAdd(false)}>  <FontAwesomeIcon icon={faClose}/> close </a>
      }
     <Collapse in={openAdd}>
     <Card className="mb-3">
  <Card.Body>
    
     <AddQuiz QuizEvent={addQuizFn}></AddQuiz>
   
</Card.Body>
<Card.Footer  style={{cursor: "pointer"}} onClick={()=>setopenAdd(false)} className="d-flex justify-content-center"> <FontAwesomeIcon icon={faArrowUp}/>
</Card.Footer>

     </Card>
     </Collapse>
     
     <a class="btn  col-12 btncustom mb-3">Show Results</a>
     <Collapse in={ShowAddQuestion}>
     <Card className="mb-3">
       <Card.Header>{Quizselected&& <Card.Title style={{"textAlign":"center"}}>{Quizselected.title}</Card.Title>}</Card.Header>
  <Card.Body>
     <h6>Questions :</h6>
     <div id="accordion">

  { Quizselected&&
      Quizselected.Questions.map((question, index) => (

        <div class="card my-3" key={index}>
        <div id={"heading"+index} class="card-header" >
          <h5 class="mb-0">
            <div class="row">
              <div class="col-10" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" aria-controls={"collapse"+index}  style={{color:"black",cursor: "pointer"}}>{question.texte}</div>
              <div class="col ms-4"> <FontAwesomeIcon size="sm" icon={faTrash} onClick={()=>confirDeleteQuestion(Quizselected._id,question._id)}   /> </div>

            </div>
          </h5>
        </div>
        <div id={"collapse"+index} class="card-body collapse" aria-labelledby={"heading"+index} data-parent="#accordion">
          {question.QuestionType=="Radio"&&
          question.Responses.map((reponse,index)=>(
          <div class="form-group" key={index}>
          <input type="radio"  name={question.texte}/>{ reponse.texte} <FontAwesomeIcon icon={faXmark} color={"red"} hidden={!reponse.correct} ></FontAwesomeIcon><FontAwesomeIcon icon={faCheck} color={"green"} hidden={reponse.correct} ></FontAwesomeIcon>
          </div>))}
          {question.QuestionType=="CheckBox"&&
          question.Responses.map((reponse,index)=>(
          <div class="form-group" key={index}>
          <input type="checkbox"  name={reponse.texte}/>{ reponse.texte} {reponse.correct.toString()}  
          </div>))}
          {question.QuestionType=="Select"&&
          <select  class="form-control">  
 {
    question.Responses.map((reponse,index)=>(
        <option value={ reponse.texte}>{ reponse.texte} {reponse.correct.toString()} </option>    
      ))
 }         
          </select>
}
        </div>
        </div>


    ))

    
  }
</div>
</Card.Body>
<Card.Footer  style={{cursor: "pointer"}} onClick={()=>setShowAddQuestion(false)} className="d-flex justify-content-center"> <FontAwesomeIcon icon={faArrowUp}/>
</Card.Footer>

     </Card>
     </Collapse>
     </div>
     <div class="col-7">
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Title</th>
      <th>Link</th>
      <th>Duration</th>
      <th style={{textAlign:"center"}}>Actions</th>
    </tr>
  </thead>
  <tbody>
  {
                        
                        quizzes.map((quiz, index) => (
                        editQuiz==false  || editQuiz==true && index!=KeySelected ?(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{quiz.dateQuiz.substring(0, 10)}</td>
                            <td>{quiz.title}</td>
                            <td><a href={"/studentQuiz/"+quiz._id}>Preview</a></td>
                            <td>{quiz.chrono==false&& <FontAwesomeIcon icon={faCircleXmark} color={"red"}></FontAwesomeIcon>}
                            {quiz.chrono==true&&
                             <FontAwesomeIcon icon={faCircleCheck} className="me-3" color={"green"}></FontAwesomeIcon>  }
                             {quiz.chrono==true&&
                             quiz.chronoVal + " Minutes" }
                            </td>
                            <td style={{textAlign:"center"}}>
                            <a style={{color:"#4284f5",cursor: "pointer"}}  className="me-3" onClick={()=>{setShowAddQuestion(true);
                               setQuizselected(quiz)
                               console.log(Quizselected)}}> <FontAwesomeIcon icon={faGear}/> Manage Question </a> 
                            <FontAwesomeIcon icon={faEdit} className="me-3" onClick={()=>{setQuizselected(quiz);
                            setKeySelected(index);
                            setEditQuiz(true);
                            setChecked(quiz.chrono)
                            }}/>
                            <FontAwesomeIcon icon={faTrash} className="me-3" onClick={()=>confirmDelete(quiz._id)}/>

                            </td>
                            </tr>
                        ):(<tr key={index}>
                          <td>{index + 1}</td>
                          <td> {quiz.dateQuiz.substring(0, 10)}</td>
                          <td><input className="form-control"type="texte" name="title" defaultValue={quiz.title} onKeyPress={handleKeyPresstitle}/></td>
                          <td><a href={"/studentQuiz/"+quiz._id}>Preview</a></td>
                          <td> <Switch   checked={checked}  onChange={handleChange} ></Switch> Timer (Minutes) 
                          {checked==true&&
                          <input class="form-control" type="number" placeholder="minutes" defaultValue={quiz.chronoVal} onKeyPress={handleKeyPresschrono}/>
                           }
                           {erroChronoval==true&&checked==true&&
                           <div class="alert alert-danger" role="alert">
                           Timer must be greater than 0
                           </div>
                           }
                      
                          </td>
                          <td style={{textAlign:"center"}}>
                          <FontAwesomeIcon icon={faClose} className="me-3" onClick={()=>{setQuizselected(null);
                          setKeySelected(-1);
                          setEditQuiz(false);
                         
                          }}/>
                          <FontAwesomeIcon icon={faTrash} className="me-3" onClick={()=>confirmDelete(quiz._id)}/>

                          </td>
                          </tr>)


                        ))
        }
  </tbody>
</Table>

<Collapse in={ShowAddQuestion}>
     <Card className="mb-3">
  <Card.Body>
     <AddQuestion AddQuestionEvent={AddQuestionEvent}></AddQuestion>
</Card.Body>
<Card.Footer  style={{cursor: "pointer"}} onClick={()=>setShowAddQuestion(false)} className="d-flex justify-content-center"> <FontAwesomeIcon icon={faArrowUp}/>
</Card.Footer>

     </Card>
     </Collapse>
         </div>
        </div>
        </div>}
        </div>);

}
export default QuizTeacher; 