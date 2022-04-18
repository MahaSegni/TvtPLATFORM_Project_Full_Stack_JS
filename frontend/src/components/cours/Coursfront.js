import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CoursfrontCard from "./CoursfrontCard";
import AjouterCour from "./AjouterCours";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import CourList from "./CourList";
import { useHistory } from "react-router-dom";

const Coursfront = () => {
    const history = useHistory();
    var connectedUser= useSelector(selectConnectedUser)
    let { idModule } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modulecour, setModule] = useState([]);
    const [cours, setCours] = useState([]);
    const [owner,setOwner]=useState();
    const [ownerLoaded,setOwnerLoaded]=useState(false);
    const [ownerId,setOwnerId]=useState("");
    if(connectedUser.type=="disconnected"){
        history.push("/signin")
  
      }
    async function getData(){
        await fetch(`${process.env.REACT_APP_API_URL}/cours/getModuleofcours/${idModule}`, {
            method: 'GET',
            headers: {authorization: connectedUser.token}
        
        })
            .then(res => res.json())
            .then(
                (data) => {
                    setModule(data);
                    setCours(data.refCours)
                    setOwnerId(data.idowner)
                    setIsLoaded(true);
        
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        if(isLoaded===true){
          fetch(`${process.env.REACT_APP_API_URL}/cours/getModuleowner/`+ownerId,{
                method: 'GET',        
            })
                .then(res => res.json())
                .then(
                    (data) => {
                      setOwner(data);
                      setOwnerLoaded(true);
      
                       
                    },
                    (error) => {
                        setOwnerLoaded(true);
                        setError(error);
                    }
                )
        }

    }
    async function clickAlert(data,idmodule,ckeditordata,file){
    
     const [c, err] =  await queryApi('cours/'+ idmodule+'/create' ,{
         title:data.title,
         texte:ckeditordata,
        
     }
    , 'POST', false,connectedUser.token);
    if(file){
        file.forEach(element => {
            const body = new FormData();
            body.append("file", element);
            fetch(`${process.env.REACT_APP_API_URL}/cours/AddfileToCourse/${c._id}`, {
                method: "POST",
                body: body
                // mode: "no-cors"
              })
        });
        
        

    }
    setIsLoaded(false);
    }
    useEffect(() => {
        
        getData();
       

    },[isLoaded])
    
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded||!ownerLoaded) {
        return <div>Loading...</div>;
    }
    else { 
        if(ownerId!=connectedUser.id&&modulecour.refStudents.filter(e=>e===connectedUser.id).length==0){
             history.push("/module")
             }
        return (
            
            <div class="row my-4 mx-auto" style={{width:"95%" }}>

                <div class="col-4 me-2">
                <div class="main-card mb-3 card">
<div class="card-body">
    <h5 class="card-title text-center">Course Timeline</h5>
    <div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
    {cours.map((refcour, index) => (

<CourList refcour={refcour} key={index}></CourList>



)).reverse()}
                    </div></div></div>
                    {ownerId==connectedUser.id && connectedUser.type!="disconnected"&&
                    <div>
                      <a href={"/module/"+idModule+"/Quiz"}class="btn  col-12 btncustom mb-3">Quiz Management</a>
                    </div>
                    }
                    { connectedUser.type!="disconnected"&&
      
                     <Link  class="btn  col-12 btncustom mb-3" to={{
                        pathname: '/evaluations',
                        state: { idmodule: idModule }
                      }}> Evaluations </Link> 
               
                    }
                    {ownerId!=connectedUser.id && connectedUser.type!="disconnected"&&
                    <div>
                     <a href={"/studentQuizAll/"+idModule }class="btn  col-12 btncustom mb-3">Quizzes</a>
                    </div>
                    }

                </div>

                <div class="col-7 ms-2  ">
                    
                   {ownerId==connectedUser.id&& connectedUser.type!="disconnected"&&
                    <AjouterCour idmodule={idModule} onChildClick={clickAlert} ></AjouterCour>
                }
                  
                    {
                        
                        cours.map((refcour, index) => (

                            <CoursfrontCard refcour={refcour} owner={(owner)}
                                key={index}
                            //deleteProduct={deleteEvaluation}
                            >
                            </CoursfrontCard>


                        )).reverse()}
                </div>
            </div>
        );


    }
}
export default Coursfront; 