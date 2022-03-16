import { useState } from "react";
import "../../../assets/css/EvaluationQuestions.css"

export default function Questions({ props, idev, owner, evq, consult }) {
  const[typeQuestion,settypeQuestion]=useState("satisfaction");

  
  const[formData,setFormData] = useState({
    text:"",
    type:""
  }) 


const [errors,setErrors] = useState({visbile:false,message:""});
const onChange = (e) => {
   setFormData({...formData,[e.target.text]:e.target.value})
}
  const handleChange = (e) => {
    settypeQuestion(e.target.value);
  };
  const onSubmit = async (e) =>{
    e.preventDefault();
    setFormData({...formData,[e.target.type]:typeQuestion})
     // const [result,err] = await queryApi('evaluation/addQuestion/'+ idModule,formData,"POST",false);
    
     
   }
   const {text,type}= formData;


  return (

    <>
      <div className="modalBackground ">
        <div className="modalContainer col-sm-10 offset-md-1 mt-2">
          <a onClick={() => { consult(false) }}><i style={{ color: "rgb(5, 68, 104)" }} class="fas fa-arrow-circle-left fa-2x  "></i></a>
          <div className="title">
            <h1 class="logo mx-auto" style={{ color: "#5fcf80" }}>Create Evaluation</h1>
          </div>
          <div id="accordion" style={{ display: "block" }}>
            {owner === true &&
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="myBtn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Add question
                    </button>
                  </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <div className="body">
                      <form class="w-75 mx-auto"  onSubmit={onSubmit}>
                        <div class="form-group">
                        <label style={{ float: "left" }}><h5>Question:</h5></label>
                          <input type="text" class="form-control"
                          name="text" 
                             value={text}
                             onChange={(e)=>onChange(e)} />
                        </div>
                        <h5 style={{ color: "red" }}></h5>
                        <div class="form-group">
                          
                          <label  style={{ float: "left" }}><h5>Type:</h5></label>
                          <br/>
                            <select class="form-control" value={typeQuestion} onChange={handleChange} >
                              <option value="satisfaction">Satisfaction</option>
                              <option value="feedBack">FeedBack</option>
                              <option value="engagement">Engagement</option>
                              <option value="utility">Utility</option>
                            </select>
                         
                        </div>
                        
                        <h5 style={{ color: "red" }}></h5>
                        <h5 style={{ textAlign: "center", color: "red" }}></h5>
                        <div className="mt-5">
                          <button className="btn get-started-btn" id="cancelBtn">Cancel</button>
                          <button type="submit" className="btn get-started-btn" >Submit</button>
                        </div>
                      </form >
                    </div>
                  </div>
                </div>
              </div>}
              <div class="card">
              <form class="px-4" action="">
                <p class="text-center"><strong>Your rating:</strong></p>

                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example1" />
                  <label class="form-check-label" for="radio3Example1">
                    Very good
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example2" />
                  <label class="form-check-label" for="radio3Example2">
                    Good
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example3" />
                  <label class="form-check-label" for="radio3Example3">
                    Medicore
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example4" />
                  <label class="form-check-label" for="radio3Example4">
                    Bad
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example5" />
                  <label class="form-check-label" for="radio3Example5">
                    Very bad
                  </label>
                </div>
                <p class="text-center"><strong>What could we improve?</strong></p>
                <div class="form-outline mb-4">
                  <textarea class="form-control" id="form4Example3" rows="4"></textarea>
                  <label class="form-label" for="form4Example3">Your feedback</label>
                </div>
              </form>
            </div>
            <div class=" bg-white mt-2 pull-right"  >
              <button class="btn btn-template">Submit</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}



