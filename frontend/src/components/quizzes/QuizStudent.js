import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./flex.css";
import Timer from "./Timer";
import { each } from "jquery";
import { queryApi } from "../../utils/queryApi";
import { useHistory } from 'react-router-dom';
import { CodeBlock, nord  } from "react-code-blocks";

var timestart=new Date(new Date().getTime());

const QuizStudent = () => {
    let { id } = useParams();
    const [QuestionIndex, setQuestionIndex] = useState(0)
    const [staticRep, setStaticRep] = useState([]);
    const [Touched, setTouched] = useState([])
    const [disabledSubmit, setdisabledSubmit] = useState(false);
    const [score, setScore] = useState()
    const [totalClicksofmap,settotalClicksofmap]=useState(0)
    const [viewMode, setViewMode] = useState(1)
    const history = useHistory()

    var connectedUser = useSelector(selectConnectedUser)
    const [quiz, errquiz, reloadquiz] = useApi('quiz/find/' + id, null, 'GET', false, connectedUser.token);
    if(connectedUser.type=="disconnected"){
        history.push("/signin")
      }

    async function setChrono() {
        if(viewMode!=2){
        var interval_id = window.setInterval(() => { }, 99999);
        for (var i = 0; i < interval_id; i++)
            window.clearInterval(i);
        let timerValue = quiz.chronoVal;
        if (quiz.chrono == true) {

            var minutesToAdd = timerValue;
            var currentDate = new Date();
            var countDownDate = new Date(currentDate.getTime() + minutesToAdd * 60000);;
            var x = setInterval(function () {

                var now = new Date().getTime();

                var distance = countDownDate - now;

                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                  if(document.getElementById("heure")!=null){
                document.getElementById("heure").innerHTML = hours + " H"
                document.getElementById("minute").innerHTML = minutes + " M"
                document.getElementById("seconde").innerHTML = seconds + " s"
                  }
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("minute").parentNode.removeChild(document.getElementById("minute"));
                    document.getElementById("seconde").parentNode.removeChild(document.getElementById("seconde"));
                    document.getElementById("heure").parentNode.removeChild(document.getElementById("heure"));
                    document.getElementById("timerValue").innerHTML = "EXPIRED";
                    saveReponse();
                }
            }, 1000);
        }
    }
    }
    useEffect(async () =>  {
        if (quiz) {

            const [module, err] = await queryApi("cours/getModuleofcours/"+quiz.refModule, null, 'GET', false, connectedUser.token);

            if(module){
                if(module.refStudents.filter(r=>r==connectedUser.id)<=0&&module.idowner!=connectedUser.id){
                    history.push("/module")
                }
            }
            if (quiz.Results.filter(r => r.idUser == connectedUser.id).length > 0) {
                setViewMode(2)
            } else {
                if(quiz.Questions.length>0){
                setTouched([...Touched, quiz.Questions[0]._id])
                setScore(quiz.Questions.length)
                setChrono();}

            }

        }
       


    }, [quiz]);

    async function updateTouched(id) {
        settotalClicksofmap(totalClicksofmap + 1)
    
        if (Touched.indexOf(id) == -1)
            setTouched([...Touched, id])


    }
    async function addToResponse(idquestion, idreponse, type) {
        if (staticRep[idquestion] && type == "CheckBox") {
            if (staticRep[idquestion].indexOf(idreponse) == -1) {
                staticRep[idquestion].push(idreponse);

            } else {
                staticRep[idquestion].splice(staticRep[idquestion].indexOf(idreponse), 1);
            }
        } else {
            staticRep[idquestion] = [idreponse];

        }
        setdisabledSubmit(Object.keys(staticRep).length == quiz.Questions.length)




    }
    async function saveReponse() {
        //calcul score;
        
        let s = quiz.Questions.length
        quiz.Questions.map((q) => {
            let correctArray = q.Responses.filter(r => r.correct == true);
            let test = true;
            if(!staticRep[q._id]){
                test=false;
            }
            else if (correctArray.length != staticRep[q._id].length) {
                test = false;

            } else {

                let i;
                for (i = 0; i < correctArray.length; i++) {
                    let index = staticRep[q._id].indexOf(correctArray[i]._id);
                    if (index == -1) {
                        test = false;

                    }


                }


            }
            if (!test) {
                s--;
            }


        })


        //Add Score + TIME
        const TimeEnd = new Date(new Date().getTime());
        let dquiz =  TimeEnd-timestart;

        let hquiz = Math.floor((dquiz % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mquiz = Math.floor((dquiz % (1000 * 60 * 60)) / (1000 * 60));
        let squiz = Math.floor((dquiz % (1000 * 60)) / 1000);

        
        const [, err] = await queryApi('quiz/addResponseScore', {

            idQuiz: quiz._id,
            idUser: connectedUser.id,
            score: s,
            time:{
                  h:hquiz,
                  m:mquiz,
                  s:squiz,
              },
            totalClicksofmap : totalClicksofmap
        }
            , 'PATCH', false, connectedUser.token);

        for (const i in staticRep) {

            for (const j in staticRep[i]) {

                const [, err] = await queryApi('quiz/addResponse', {

                    idQuiz: quiz._id,
                    idQuestion: i,
                    idResponse: staticRep[i][j],
                    idUser: connectedUser.id,

                }
                    , 'PATCH', false, connectedUser.token);


            }

        }

        setScore(s);
        reloadquiz();
        setViewMode(2);
        setQuestionIndex(0);



    }

    return (
        
        <div>
            {quiz&&quiz.Questions.length<=0&&
                <div class="row" style={{ "width": "90%", "margin-top": "100px", "margin-left": "2%" }}>
                <div class="alert alert-danger" >
                this Quiz is under Construction
                </div>
            </div>
            }
            
            {quiz && viewMode == 1 && quiz.Questions.length>0&&
                <div class="row" style={{ "width": "90%", "margin-top": "100px", "margin-left": "2%" }}>
                    <div class="col-3 ms-2" >

                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    QUIZ MAP
                                </Card.Title>
                            </Card.Header>

                            <Card.Body>


                                <div class="flex-container">

                                    {quiz.Questions.map((question, index) => (
                                        index == QuestionIndex ?
                                            (<div class="active" onClick={() => {
                                                setQuestionIndex(index);
                                                updateTouched(question._id);
                                            }}>{index + 1}</div>) :
                                            Touched.indexOf(question._id) == -1 || staticRep[question._id] ?
                                                (<div onClick={() => {
                                                    setQuestionIndex(index);
                                                    updateTouched(question._id);
                                                }}>{index + 1}</div>

                                                ) :
                                                (<div class="skiped" onClick={() => {
                                                    setQuestionIndex(index);
                                                    updateTouched(question._id)
                                                }
                                                }>{index + 1}</div>)
                                    ))
                                    }
                                </div>

                            </Card.Body>
                        </Card>
                        <div class="mb">
                            {quiz.chrono == true &&
                                <Timer></Timer>

                            }
                        </div>
                    </div>
                    <div class="col">

                        <Card style={{"min-height":"387px"}}>
                            <Card.Header>
                                <Card.Title>
                                    <h1 class="pull-left">{quiz.title}</h1><h3 class="pull-right">{QuestionIndex + 1}/{quiz.Questions.length}</h3>
                                </Card.Title>

                            </Card.Header>
                            <Card.Body>

                                {quiz.Questions.map((question, index) => (
                                    //index == QuestionIndex ?
                                        <div key={index} hidden={(index!=QuestionIndex)} >
                                            <div>{question.texte}</div>
                                            {question.code&&
                                             <CodeBlock
                                             text={question.code}
                                             language={question.language}
                                             showLineNumbers={true}
                                             theme={nord}
                                             wrapLines
                                           />
                                            }
                                            {question.QuestionType == "Radio" &&
                                                question.Responses.map((reponse, index) => (

                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name={question.texte} onClick={() => addToResponse(question._id, reponse._id, question.QuestionType)} />
                                                        <label class="form-check-label" name={question.texte} >
                                                            {reponse.texte}
                                                        </label>
                                                    </div>


                                                ))

                                            }
                                            {question.QuestionType == "CheckBox" &&
                                                question.Responses.map((reponse, index) => (
                                                    <div class="form-check" key={index}>
                                                        <input class="form-check-input" type="checkbox" value={reponse.texte} onClick={() => addToResponse(question._id, reponse._id, question.QuestionType)} />
                                                        <label class="form-check-label" >
                                                            {reponse.texte}
                                                        </label>
                                                    </div>
                                                ))}
                                            {question.QuestionType == "Select" &&
                                                <div class="list-group">
                                                    {question.Responses.map((reponse, index) => (
                                                        staticRep[question._id] == reponse._id ?
                                                            (<button type="button" class="my-1 list-group-item list-group-item-action active" onClick={() => addToResponse(question._id, reponse._id, question.QuestionType)}>{reponse.texte}</button>
                                                            ) : (<button type="button" class=" my-1 list-group-item list-group-item-action " onClick={(e) => {
                                                                addToResponse(question._id, reponse._id, question.QuestionType);
                                                                let i;
                                                                for (i = 0; i < question.Responses.length; i++) {
                                                                    document.getElementsByClassName("list-group-item")[i].classList.remove("active");
                                                                }
                                                                e.target.classList.add("active")
                                                            }}>{reponse.texte}</button>)
                                                    ))
                                                    }
                                                </div>
                                            }
                                        </div> 
                                           


                                ))


                                }

                            </Card.Body>
                            <Card.Footer>
                                {QuestionIndex != quiz.Questions.length - 1 &&
                                    <button class="btn pull-right" onClick={() => {
                                        setQuestionIndex(QuestionIndex + 1);
                                        updateTouched(quiz.Questions[QuestionIndex + 1]._id)
                                    }}>Next<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                                }
                                {QuestionIndex == quiz.Questions.length - 1 &&
                                    <button class="btn pull-right" disabled={!disabledSubmit} onClick={() => {setdisabledSubmit(false)
                                        saveReponse()}}>Submit<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                                }

                                {QuestionIndex > 0 &&

                                    <button class="btn pull-left" onClick={() => {
                                        setQuestionIndex(QuestionIndex - 1)
                                        updateTouched(quiz.Questions[QuestionIndex - 1]._id)
                                    }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>Previous</button>

                                }

                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            }
            {quiz && viewMode == 2 && quiz.Questions.length>0&&
                <div class="row" style={{ "width": "90%", "margin-top": "100px", "margin-left": "2%" }}>
                    <div class="col-8">
                        <h3> Mark :  {quiz.Results.find(r => r.idUser == connectedUser.id).Note}/{quiz.Questions.length}</h3>
                    </div>
                    <div class="col-3 me-3" style={{ "width": "30px", "height": "20px", "backgroundColor": "rgba(101,255,0,0.4)" }}> </div> Correct Answer
                    <div class="col-3 ms-2 me-3" style={{ "width": "30px", "height": "20px", "backgroundColor": "rgba(255,0,0,0.4)" }}> </div> False  Answer


                    <div class="col-12">

                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    <h1 class="pull-left">{quiz.title}</h1><h3 class="pull-right">{QuestionIndex + 1}/{quiz.Questions.length}</h3>
                                </Card.Title>

                            </Card.Header>
                            <Card.Body>

                                {quiz.Questions.map((question, index) => (
                                    index == QuestionIndex ?
                                        (<div key={index}  >
                                            <div>{question.texte}</div>
                                            {question.code&&
                                             <CodeBlock
                                             text={question.code}
                                             language={question.language}
                                             showLineNumbers={true}
                                             theme={nord}
                                             wrapLines
                                           />
                                            }
                                            {question.QuestionType == "Radio" &&
                                                question.Responses.map((reponse, index) => (
                                                    <div>
                                                        {reponse.correct == true &&
                                                            <div class="form-check" style={{ "backgroundColor": "rgba(101,255,0,0.4)", "color": "black" }} >
                                                                <input class="form-check-input" type="radio" name={question.texte} checked={reponse.idUsers.filter(e => e == connectedUser.id).length > 0} disabled={true} />
                                                                <label class="form-check-label" name={question.texte} >
                                                                    {reponse.texte}
                                                                </label>
                                                            </div>
                                                        }
                                                        {reponse.correct == false && reponse.idUsers.filter(e => e == connectedUser.id).length > 0 &&
                                                            <div class="form-check" style={{ "backgroundColor": "rgba(255,0,0,0.4)", "color": "black" }} >
                                                                <input class="form-check-input" type="radio" name={question.texte} checked={true} disabled={true} />
                                                                <label class="form-check-label" name={question.texte} >
                                                                    {reponse.texte}
                                                                </label>
                                                            </div>
                                                        }
                                                        {reponse.correct == false && reponse.idUsers.filter(e => e == connectedUser.id).length <= 0 &&
                                                            <div class="form-check" >
                                                                <input class="form-check-input" type="radio" name={question.texte} disabled={true} />
                                                                <label class="form-check-label" name={question.texte} >
                                                                    {reponse.texte}
                                                                </label>
                                                            </div>
                                                        }



                                                    </div>



                                                ))

                                            }
                                            {question.QuestionType == "CheckBox" &&
                                                question.Responses.map((reponse, index) => (
                                                    <div>
                                                        {reponse.correct == true &&

                                                            <div class="form-check" key={index} style={{ "backgroundColor": "rgba(101,255,0,0.4)", "color": "black" }}>
                                                                <input class="form-check-input" type="checkbox" value={reponse.texte} checked={reponse.idUsers.filter(e => e == connectedUser.id).length > 0} disabled={true} />
                                                                <label class="form-check-label" >
                                                                    {reponse.texte}
                                                                </label>
                                                            </div>
                                                        }
                                                        {reponse.correct == false && reponse.idUsers.filter(e => e == connectedUser.id).length > 0 &&

                                                            <div class="form-check" key={index} style={{ "backgroundColor": "rgba(255,0,0,0.4)", "color": "black" }}>
                                                                <input class="form-check-input" type="checkbox" value={reponse.texte} checked={true} disabled={true} />
                                                                <label class="form-check-label" >
                                                                    {reponse.texte}
                                                                </label>
                                                            </div>
                                                        }
                                                        {reponse.correct == false && reponse.idUsers.filter(e => e == connectedUser.id).length <= 0 &&

                                                            <div class="form-check" key={index}>
                                                                <input class="form-check-input" type="checkbox" value={reponse.texte} checked={false} disabled={true} />
                                                                <label class="form-check-label" >
                                                                    {reponse.texte}
                                                                </label>
                                                            </div>
                                                        }

                                                    </div>
                                                ))}
                                            {question.QuestionType == "Select" &&
                                                <div class="list-group">
                                                    {question.Responses.map((reponse, index) => (
                                                        <div>
                                                            {reponse.correct == true &&
                                                                <button type="button" disabled={true} style={{ "backgroundColor": "rgba(101,255,0,0.4)", "color": "black" }} class="list-group-item list-group-item-action " >{reponse.texte}</button>

                                                            }
                                                            {reponse.correct == false && reponse.idUsers.filter(e => e == connectedUser.id).length > 0 &&
                                                                <button type="button" disabled={true} style={{ "backgroundColor": "rgba(255,0,0,0.4)", "color": "black" }} class="list-group-item list-group-item-action " >{reponse.texte}</button>
                                                            }
                                                            {reponse.correct == false &&
                                                                <button type="button" disabled={true} class="list-group-item list-group-item-action " >{reponse.texte}</button>

                                                            }

                                                        </div>
                                                    ))
                                                    }
                                                </div>
                                            }
                                        </div>) : (<div key={index} hidden="true" >
                                            <div>{question.texte}</div>
                                            {question.QuestionType == "Radio" &&
                                                question.Responses.map((reponse, index) => (

                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name={question.texte} />
                                                        <label class="form-check-label" name={question.texte} >
                                                            {reponse.texte}
                                                        </label>
                                                    </div>


                                                ))

                                            }
                                            {question.QuestionType == "CheckBox" &&
                                                question.Responses.map((reponse, index) => (
                                                    <div class="form-check" key={index}>
                                                        <input class="form-check-input" type="checkbox" value={reponse.texte} />
                                                        <label class="form-check-label" >
                                                            {reponse.texte}
                                                        </label>
                                                    </div>
                                                ))}
                                            {question.QuestionType == "Select" &&
                                                <div class="list-group">
                                                    {question.Responses.map((reponse, index) => (
                                                        <button type="button" class="list-group-item list-group-item-action" >{reponse.texte}</button>

                                                    ))
                                                    }
                                                </div>
                                            }
                                        </div>)


                                ))


                                }

                            </Card.Body>
                            <Card.Footer>
                                {QuestionIndex != quiz.Questions.length - 1 &&
                                    <button class="btn pull-right" onClick={() => { setQuestionIndex(QuestionIndex + 1); }}>Next<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                                }

                                {QuestionIndex > 0 &&
                                    <button class="btn pull-left" onClick={() => { setQuestionIndex(QuestionIndex - 1) }}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>Previous</button>

                                }

                            </Card.Footer>
                        </Card>
                    </div>
                </div>

            }
        </div>
    )
}
export default QuizStudent;