import { useState, useEffect } from "react";
import "../../../assets/css/EvaluationQuestions.css"
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../../Redux/slices/sessionSlice";
import $, { map } from 'jquery';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../utils/useApi";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Questions({ props, owner, evq, consult, rlEv }) {
  const [typeQuestion, settypeQuestion] = useState("satisfaction");
  const [typeQuestionUpdate, settypeQuestionUpdate] = useState("satisfaction");
  let connectedUser = useSelector(selectConnectedUser)
  
  const [first, setFirst] = useState("Very satisfied");
  const [second, setSecond] = useState("Satisfied");
  const [third, setThird] = useState("Neutral");
  const [fourth, setFourth] = useState("Dissatisfied");
  const [fifth, setFifth] = useState("Very dissatisfied");

  const [firstUpdate, setFirstUpdate] = useState("Very satisfied");
  const [secondUpdate, setSecondUpdate] = useState("Satisfied");
  const [thirdUpdate, setThirdUpdate] = useState("Neutral");
  const [fourthUpdate, setFourthUpdate] = useState("Dissatisfied");
  const [fifthUpdate, setFifthUpdate] = useState("Very dissatisfied");
  const [questions, err, reloadQ] = useApi('evquestion/get/' + evq._id, null, 'GET', false, connectedUser.token);
  
  const [formData, setFormData] = useState({text: "",type: "" })

  const [formDataUpdate, setFormDataUpdate] = useState({id:"" ,textu: "",typeu: "" })

  const [formDataSubmit, setformDataSubmit] = useState([])
  

  useEffect(() => {
    if (typeQuestion === "importance" ) {setFirst("Strongly important");setSecond("important");setThird("Neutral");setFourth("Not important");setFifth("Not important at all");}
    else if (typeQuestion === "agreement") {setFirst("Strongly agree");setSecond("Agree");setThird("Neutral");setFourth("Disagree");setFifth("Strongly disagree");}
    else if (typeQuestion === "utility") {setFirst("Very useful");setSecond("Useful");setThird("Neutral");setFourth("Not useful");setFifth("Not useful at all");}
    else {setFirst("Very satisfied");setSecond("Satisfied");setThird("Neutral");setFourth("Dissatisfied");setFifth("Very dissatisfied");}
    
    
    if (typeQuestionUpdate === "importance" ) {setFirstUpdate("Strongly important");setSecondUpdate("important");setThirdUpdate("Neutral");setFourthUpdate("Not important");setFifthUpdate("Not important at all"); }
    else if (typeQuestionUpdate === "agreement") {setFirstUpdate("Strongly agree");setSecondUpdate("Agree");setThirdUpdate("Neutral");setFourthUpdate("Disagree");setFifthUpdate("Strongly disagree");}
    else if (typeQuestionUpdate === "utility") {setFirstUpdate("Very useful");setSecondUpdate("Useful");setThirdUpdate("Neutral");setFourthUpdate("Not useful");setFifthUpdate("Not useful at all");}
    else {setFirstUpdate("Very satisfied");setSecondUpdate("Satisfied");setThirdUpdate("Neutral");setFourthUpdate("Dissatisfied");setFifthUpdate("Very dissatisfied");}
  });


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });}

  const onChangeUpdate = (e) => {
   setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value });
}
  
   const handleChange = (e) => {
    settypeQuestion(e.target.value);
    onChange(e)
  };
  const handleChangeUpdate = (e) => {
    settypeQuestionUpdate(e.target.value);
    onChangeUpdate(e)
  };

  const onAdd = async (e) => {
    e.preventDefault();
    const [result, err] = await queryApi('evquestion/add/' + evq._id, formData, "POST", false);
    reloadQ();
  }
  const onSub=async() =>{
     const [result, err] = await queryApi('evquestion/submit/'+connectedUser.id+'/'+ evq._id , formDataSubmit, "POST", false);
     rlEv() ;
     consult(false); 
  }
  const onSubmit= async(e) =>{
   
   await questions.map((question) => 
      {question.responses.map((response)=>
    {if(document.getElementById(response._id).checked)
      {    setformDataSubmit(formDataSubmit=>[...formDataSubmit,  {idquestion: question._id,idrps: response._id}])}
    })})
  } 

  const onUpdate = async () => {
    console.log(formDataUpdate)
    const [result, err] = await queryApi('evquestion/update/' , formDataUpdate, "PUT", false);
    reloadQ()
  }

  const deleteQuestion = async (id) => {
    const [, err] = await queryApi('evquestion/delete/' + id + '/' + evq._id, null, "GET", false);
    reloadQ()
  }

  const { text, type } = formData;
  const { id, textu, typeu } = formDataUpdate;
  
  return (
    <>
      {questions &&
        <div className="modalBackground ">
          <div className="modalContainer col-sm-10 offset-md-1 mt-2">
            <a onClick={() => { consult(false); rlEv() }}><i style={{ color: "rgb(5, 68, 104)" }} class="fas fa-arrow-circle-left fa-2x  "></i></a>
            {owner==true &&
            <div className="title">
              <h1 class="logo mx-auto" style={{ color: "#5fcf80" }}>Create Evaluation</h1>
            </div>}
            {owner==false &&
            <div className="title">
              <h1 class="logo mx-auto text-capitalize" style={{ color: "#5fcf80" }}> {evq.title}</h1>
            </div>}
            <div id="accordion" style={{ display: "block" }}>
              {owner == true && evq.public == false &&
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                      <button class="myBtn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Add question
                      </button>
                    </h5>
                  </div>

                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                      <div className="body">
                        <form class="w-75 mx-auto" onSubmit={onAdd}>
                          <div class="form-group">
                            <label id="inputAddQuestion" style={{ float: "left" }}><h5>Question:</h5></label>
                            <input type="text" class="form-control"
                              name="text"
                              onChange={(e) => onChange(e)} />
                          </div>
                          <h5 style={{ color: "red" }}></h5>
                          <div class="form-group">
                            <label style={{ float: "left" }}><h5>Type:</h5></label>
                            <br />
                            <select class="form-control" value={typeQuestion} name="type" onChange={handleChange} id="selectAddQuestion">
                              <option value="satisfaction">Satisfaction</option>
                              <option value="importance">Importance</option>
                              <option value="agreement">Agreement</option>
                              <option value="utility">Utility</option>
                            </select>
                          </div>
                          <br />
                          <h5 class="pull-left"><span class="bi bi-emoji-laughing" style={{ color: "#4AB70E" }}> </span>{first}</h5><br />
                          <h5 class="pull-left"><span class="bi bi-emoji-smile" style={{ color: "#7BCA52" }}> </span>{second}</h5><br />
                          <h5 class="pull-left"><span class="bi bi-emoji-neutral" style={{ color: "#FFBF32" }}> </span>{third}</h5><br />
                          <h5 class="pull-left"><span class="bi bi-emoji-frown" style={{ color: "#EC611F" }}> </span>{fourth}</h5><br />
                          <h5 class="pull-left"><span class="bi bi-emoji-angry" style={{ color: "	#8B0000" }}> </span>{fifth}</h5><br />

                          <h5 style={{ color: "red" }}></h5>
                          <h5 style={{ textAlign: "center", color: "red" }}></h5>
                          <div className="mt-3">
                            <button className="btn get-started-btn" id="cancelBtn" type="reset" data-toggle="collapse" data-target="#collapseOne" style={{color:"white"}}>Cancel</button>
                            <button type="submit" className="btn get-started-btn" data-toggle="collapse" data-target="#collapseOne">Submit</button>
                          </div>
                        </form >
                      </div>
                    </div>
                  </div>
                </div>}
              <div class="card" >
                <div class="px-4" action="">
                  {
                    questions.map((question, index) => (
                      <>
                        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
    
                          <p>
                            <strong class="text-capitalize" style={{ color: "rgb(5, 68, 104)" }}>Q{index + 1}. {question.text}</strong>
                            {owner == true && 
                              <div class="pull-right">
                                {evq.public == false && <>
                                  <a  href={`#collapse${index}`} data-toggle="collapse" onClick={
                                    () => { settypeQuestionUpdate(question.responseType); formDataUpdate.textu=question.text;formDataUpdate.typeu=question.responseType;formDataUpdate.id=question._id; console.log(formDataUpdate)}} 
                                  data-target={`#collapse${index}`} style={{ border: 0, background: "transparent", color: "#5FCF80" }} class="table-link">

                                    <span class="fa-stack">
                                      <i class="fa fa-square fa-stack-2x"></i>
                                      <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                    </span>

                                  </a>
                                  <a onClick={() => deleteQuestion(question._id)} style={{ border: 0, background: "transparent", color: "red" }} class="table-link">
                                    <span class="fa-stack">
                                      <i class="fa fa-square fa-stack-2x"></i>
                                      <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </a>
                                </>}
                                {evq.public == true &&
                                  <>
                                    <a style={{ border: 0, background: "transparent", color: "#5FCF80", opacity: 0.6 }} class="table-link">
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-pencil fa-stack-1x fa-inverse" title="You should unpublish before editing"></i>
                                      </span>
                                    </a>
                                    <a style={{ border: 0, background: "transparent", color: "red", opacity: 0.4 }} class="table-link">
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse" title="You should unpublish before deleting"></i>
                                      </span>
                                    </a>
                                  </>}
                              </div>
                            }
                          </p>
                          {question.responses &&
                            question.responses.map((response, indexr) => (
                              <div class="form-check mb-2  " key={indexr}>
                                {indexr == 0 && <span class="bi bi-emoji-laughing" style={{ color: "#4AB70E", marginRight: "0.75%" }} ></span>}
                                {indexr == 1 && <span class="bi bi-emoji-smile" style={{ color: "#7BCA52", marginRight: "0.75%" }}></span>}
                                {indexr == 2 && <span class="bi bi-emoji-neutral" style={{ color: "#FFBF32", marginRight: "0.75%" }}></span>}
                                {indexr == 3 && <span class="bi bi-emoji-frown" style={{ color: "#EC611F", marginRight: "0.75%" }}></span>}
                                {indexr == 4 && <span class="bi bi-emoji-angry" style={{ color: "	#8B0000", marginRight: "0.75%" }}></span>}
                                <input class="form-check-input greenRadio" id={response._id}  type="radio" name={`radiorps${index}`}  />
                                <label class="form-check-label" for="radio3Example1">{response.text}</label>
                              </div>))
                          }
                          {index < questions.length - 1 && <hr />}
                        </div>
                        {owner == true &&
                        <div id={`collapse${index}`} class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                          <div class="card-body">
                            <div className="body">
                              <div class="w-75 mx-auto"  >
                              
                                  <input type="text" class="form-control" name="idQuestion" hidden Value={question._id}/>
                                <div class="form-group">
                                  <label id="inputAddQuestion" style={{ float: "left" }}><h5>Question:</h5></label>
                                  <input type="text" class="form-control"
                                    name="textu"
                                    defaultValue={question.text}
                                    onChange={(e) => onChangeUpdate(e)} />
                                </div>
                                <h5 style={{ color: "red" }}></h5>
                                <div class="form-group">
                                  <label style={{ float: "left" }}><h5>Type:</h5></label>
                                  <br />
                                  <select class="form-control"   value={typeQuestionUpdate} name="typeu" onChange={handleChangeUpdate} id="selectAddQuestion">
                                    <option value="satisfaction" selected={typeQuestionUpdate === "satisfaction"}>Satisfaction</option>
                                    <option value="importance" selected={typeQuestionUpdate === "importance"}>Importance</option>
                                    <option value="agreement" selected={typeQuestionUpdate=== "agreement"}>Agreement</option>
                                    <option value="utility" selected={typeQuestionUpdate === "utility"}>Utility</option>
                                  </select>
                                </div>
                                <br />
                                <h5 class="pull-left"><span class="bi bi-emoji-laughing" style={{ color: "#4AB70E" }}> </span>{firstUpdate}</h5><br />
                                <h5 class="pull-left"><span class="bi bi-emoji-smile" style={{ color: "#7BCA52" }}> </span>{secondUpdate}</h5><br />
                                <h5 class="pull-left"><span class="bi bi-emoji-neutral" style={{ color: "#FFBF32" }}> </span>{thirdUpdate}</h5><br />
                                <h5 class="pull-left"><span class="bi bi-emoji-frown" style={{ color: "#EC611F" }}> </span>{fourthUpdate}</h5><br />
                                <h5 class="pull-left"><span class="bi bi-emoji-angry" style={{ color: "	#8B0000" }}> </span>{fifthUpdate}</h5><br />

                                <h5 style={{ color: "red" }}></h5>
                                <h5 style={{ textAlign: "center", color: "red" }}></h5>
                                <div className="mt-3">
                                  <button className="btn get-started-btn" id="cancelBtn" type="reset" data-toggle="collapse" data-target={`#collapse${index}`}>Cancel</button>
                                  <button onClick={()=>{onUpdate()}} className="btn get-started-btn" data-toggle="collapse" data-target={`#collapse${index}`}>Submit</button>
                                </div>
                              </div >
                            </div>
                          </div>
                        </div>}
                      </>

                    ))

                  }
                </div>
             </div>
             <div class=" bg-white mt-2 pull-right"  >
                {owner == false && connectedUser.type !== "admin" &&
                  <button class="btn btn-template" data-toggle="modal" data-target="#ConfirmationModal" onClick={()=>{onSubmit()}} >Submit</button>}
              </div>
             
            </div>
          </div>
        </div>}
        
       {/*  -----------------------------------------------------ConfirmationModal----------------------------------------------*/}
       <div class="modal fade" id="ConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
      <h4 class=" text-center" style={{ color: "#5fcf80" }}>Confirm Submission</h4>
     
        <hr></hr>
      </div>
      <div class="modal-body text-center">
         <p>Validate your submission?  </p>
         <p> Each evaluation can be submitted once</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-template "    id="cancelBtn" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-template" data-dismiss="modal" onClick={()=>{onSub()}}>Submit</button>
      </div>
    </div>
  </div>
       </div>
    </>
  );
}



