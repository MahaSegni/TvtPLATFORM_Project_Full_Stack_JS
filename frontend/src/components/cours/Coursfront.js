import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CoursfrontCard from "./CoursfrontCard";
import AjouterCour from "./AjouterCours";
import { Card } from "react-bootstrap";

import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import CourList from "./CourList";

const Coursfront = () => {
    var connectedUser= useSelector(selectConnectedUser)
    let { idModule } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modulecour, setModule] = useState([]);
    const [cours, setCours] = useState([]);
    const [owner,setOwner]=useState();
    const [ownerLoaded,setOwnerLoaded]=useState(false);
    const [ownerId,setOwnerId]=useState("");
    console.log(isLoaded)
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
            console.log("PRINT MODULE"+JSON.stringify(modulecour));
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
    async function clickAlert(data,idmodule,ckeditordata){
    
     const [, err] =  await queryApi('cours/'+ idmodule+'/create' ,{
         title:data.title,
         texte:ckeditordata
     }
    , 'POST', false,connectedUser.token);
    setIsLoaded(false);
    }
    useEffect(() => {
        
        getData();
       
               

    },[isLoaded])
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // for smoothly scrolling
        });
      };
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded||!ownerLoaded) {
        return <div>Loading...</div>;
    }
    else {
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
                    
                     <a class="btn  col-12 btncustom mb-3">Evaluations Management</a>
                    

                    </div>
                    }
                    {ownerId!=connectedUser.id && connectedUser.type!="disconnected"&&
                    <div>
                     <a class="btn  col-12 btncustom mb-3">Quizzes</a>
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