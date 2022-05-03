import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi";
import { useHistory } from 'react-router-dom';
import UserResult from "./UserResultats";
import "./ShowResultats.css";
const ShowResultats = () => {
    const history = useHistory()
    let { idModule } = useParams();
    var connectedUser = useSelector(selectConnectedUser)
    const[selectedQuiz,setSelectedQuiz]=useState();
    const[init,setInit]=useState(0)
    if(connectedUser.type=="disconnected"){
        history.push("/signin")
  
      }
      const [module, err, reloadmodule] =  useApi('cours/getModuleofcours/' + idModule, null, 'GET', false, connectedUser.token);
      const[quizzes,errquiz,reloadquiz]= useApi('quiz/' + idModule+'/findall', null, 'GET', false, connectedUser.token);
      if(module){
        if(module.idowner!=connectedUser.id){
            let url = "/module/"+idModule+"/allcours"
            history.push(url)
        }
       
     }
     if(quizzes&&init==0){
         setSelectedQuiz(quizzes[0]);
         setInit(1);
     }
     const handleChangeQuiz = (e) => {
       console.log(e.target.value)
      let  quiz=quizzes.find(q=>q._id==e.target.value);
       setSelectedQuiz(quiz);

    }


return (
    <div>
    <div class="row mt-5 mx-auto" >
        <div class="col mx-3">
        <select class="form-select"  onChange={(e) => handleChangeQuiz(e)} >
                                {quizzes &&
                                    quizzes.map((quiz, index) => (
                                        index == 0 ? (
                                            <option key={index} selected value={quiz._id} >
                                                {quiz.title}
                                            </option>
                                        ) : (
                                            <option key={index} value={quiz._id}>
                                                {quiz.title}

                                            </option>
                                        )




                                    ))
                                }

                            </select>
                </div>
     </div>
     <div class="row mt-5 mx-auto" >
     <section id="team" class="pb-5 sectioncustom">
    <div class="container">
        <div class="row">
        {selectedQuiz&&
        selectedQuiz.Results.map((resultat,index)=>(
        <UserResult props={[resultat,selectedQuiz]}/>
        ))

        }
        </div>
    </div>
</section>
</div>
     
     </div>
     
)
}
export default ShowResultats; 