import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi";
import { useHistory } from 'react-router-dom';
import { Card, Collapse, Table } from "react-bootstrap";
import AddQuiz from "./AddQuiz";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { queryApi } from "../../utils/queryApi";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Switch } from "@mui/material";
import AddQuestion from "./AddQuestion";

const QuizTeacher = () => {
    const[openAdd,setopenAdd]=useState(false)
    const[ShowAddQuestion,setShowAddQuestion]=useState(false)
    const[Quizselected,setQuizselected]=useState({});
    const[editQuiz,setEditQuiz]=useState(false);
    const[KeySelected,setKeySelected]=useState(-1)
    const [checked, setChecked] = useState(false);
    const[erroChronoval,seTerroChronoval]=useState(false);
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

    let history = useHistory()

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
    const [, err] =  await queryApi('quiz/addQuestion/'+Quizselected._id ,{
       
      texte:data.texte,
      QuestionType:data.QuestionType,
      Responses:responses
    }
    , 'PATCH', false,connectedUser.token);
    reloadquiz()

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
                               setQuizselected(quiz)}}> <FontAwesomeIcon icon={faPlus}/> Manage Question </a> 
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
                          <input class="form-control" type="number" min={0} step={30} placeholder="minutes" defaultValue={quiz.chronoVal} onKeyPress={handleKeyPresschrono}/>
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