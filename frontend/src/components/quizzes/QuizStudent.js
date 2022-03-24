import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./flex.css"
const QuizStudent = () => {
    let { id } = useParams();
    const [QuestionIndex, setQuestionIndex] = useState(0)
    var connectedUser = useSelector(selectConnectedUser)
    const [quiz, errquiz, reloadquiz] = useApi('quiz/find/' + id, null, 'GET', false, connectedUser.token);
    return (<div>
        {quiz &&
        <div class="row" style={{ "width": "90%","margin-top": "100px","margin-left":"2.5%" }}>
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
                        index!=QuestionIndex?
                        (<div onClick={()=>{setQuestionIndex(index)}}>{index+1}</div>

                        ):(<div class="active" onClick={()=>{setQuestionIndex(index)}}>{index+1}</div>)
                    ))
                    }
</div>
                            
                    </Card.Body>
                </Card>
                </div>
            <div class="col">
                            <Card>
                <Card.Header>
                    <Card.Title>
                        <h1 class="pull-left">{quiz.title}</h1><h3 class="pull-right">{QuestionIndex + 1}/{quiz.Questions.length}</h3>
                    </Card.Title>

                </Card.Header>
                <Card.Body>

                    {quiz.Questions.map((question, index) => (
                       index==QuestionIndex?
                       ( <div key={index}>
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
                                        <button type="button" class="list-group-item list-group-item-action">{reponse.texte}</button>

                                    ))
                                    }
                                </div>
                            }
                        </div>):(<></>)


                    ))


                    }

                </Card.Body>
                <Card.Footer>
                    {QuestionIndex!=quiz.Questions.length-1&&
                    <button class="btn pull-right" onClick={()=>{setQuestionIndex(QuestionIndex+1)}}>Next<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                    }{QuestionIndex>0&&

<button class="btn pull-left" onClick={()=>{setQuestionIndex(QuestionIndex-1)}}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>Previous</button>

                    }
                </Card.Footer>
            </Card>
            </div>
</div>
        }
    </div>
    )
}
export default QuizStudent