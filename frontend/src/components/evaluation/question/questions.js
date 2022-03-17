import { useState, useEffect } from "react";
import "../../../assets/css/EvaluationQuestions.css"
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../../Redux/slices/sessionSlice";
import $ from 'jquery';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../utils/useApi";

export default function Questions({ props, owner, evq, consult }) {
  const [typeQuestion, settypeQuestion] = useState("satisfaction");
  let connectedUser = useSelector(selectConnectedUser)


  const [first, setFirst] = useState("Very satisfied");
  const [second, setSecond] = useState("Satisfied");
  const [third, setThird] = useState("Neutral");
  const [fourth, setFourth] = useState("Dissatisfied");
  const [fifth, setFifth] = useState("Very dissatisfied");

  const [questions, err, reloadQ] = useApi('evquestion/get/' + evq._id, null, 'GET', false);
  console.log(questions)

  const [formData, setFormData] = useState({
    text: "",
    type: ""
  })


  const [errors, setErrors] = useState({ visbile: false, message: "" });

  useEffect(() => {
    if (typeQuestion === "importance") {
      setFirst("Strongly important");
      setSecond("important");
      setThird("Neutral");
      setFourth("Not important");
      setFifth("Not important at all");
    }
    else if (typeQuestion === "agreement") {
      setFirst("Strongly agree");
      setSecond("Agree");
      setThird("Neutral");
      setFourth("Disagree");
      setFifth("Strongly disagree");
    }
    else if (typeQuestion === "utility") {
      setFirst("Very useful");
      setSecond("Useful");
      setThird("Neutral");
      setFourth("Not useful");
      setFifth("Not useful at all");
    }
    else {
      setFirst("Very satisfied");
      setSecond("Satisfied");
      setThird("Neutral");
      setFourth("Dissatisfied");
      setFifth("Very dissatisfied");
    }
  });


  const onChange = (e) => {
    //console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }
  const handleChange = (e) => {
    settypeQuestion(e.target.value)
    onChange(e)
  };



  const onSubmit = async (e) => {
    e.preventDefault();

    const [result, err] = await queryApi('evquestion/add/' + evq._id, formData, "POST", false);
  }

  const { text, type } = formData;

  return (

    <>
      {questions &&
        <div className="modalBackground ">
          <div className="modalContainer col-sm-10 offset-md-1 mt-2">
            <a onClick={() => { consult(false) }}><i style={{ color: "rgb(5, 68, 104)" }} class="fas fa-arrow-circle-left fa-2x  "></i></a>
            <div className="title">
              <h1 class="logo mx-auto" style={{ color: "#5fcf80" }}>Create Evaluation</h1>
            </div>
            <div id="accordion" style={{ display: "block" }}>
              {owner == true &&
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
                        <form class="w-75 mx-auto" onSubmit={onSubmit}>
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
                          <div className="mt-5">
                            <button className="btn get-started-btn" id="cancelBtn" type="reset" data-toggle="collapse" data-target="#collapseOne">Cancel</button>
                            <button type="submit" className="btn get-started-btn" data-toggle="collapse" data-target="#collapseOne">Submit</button>
                          </div>
                        </form >
                      </div>
                    </div>
                  </div>
                </div>}
              <div class="card">
                <form class="px-4" action="">
                  {
                    questions.map((question, index) => (
                      <div>
                        <p><strong>Q{index+1}. {question.text}</strong></p>
                        {question &&
                        question.reponses.map((response, indexx) => (
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example1" />
                          <label class="form-check-label" for="radio3Example1">{response.text}</label>
                        </div>))
                        }
                      </div>))
                  }
                </form>

              </div>
              <div class=" bg-white mt-2 pull-right"  >
                {owner == false && connectedUser.type !== "admin" &&
                  <button class="btn btn-template">Submit</button>}
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}



