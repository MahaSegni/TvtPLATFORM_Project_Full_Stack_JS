import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CoursfrontCard from "./CoursfrontCard";
import AjouterCour from "./AjouterCommentaire";
const Coursfront = () => {
    let { idModule } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modulecour, setModule] = useState([]);
    const [cours, setCours] = useState([]);
    const [owner,setOwner]=useState();
    const [ownerLoaded,setOwnerLoaded]=useState(false);
    const [ownerId,setOwnerId]=useState("");
    async function getData(){
        await fetch(`${process.env.REACT_APP_API_URL}/cours/getModuleofcours/${idModule}`, {
            method: 'GET',
        
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
    
    useEffect(() => {
        
        getData();

          
               

    },[isLoaded])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded||!ownerLoaded) {
        return <div>Loading...</div>;
    }
    else {

        return (
             
            <div class="row my-4">
                <div class="col-4">
                </div>

                <div class="col-7">
                    <AjouterCour></AjouterCour>
                    {

                        cours.map((refcour, index) => (

                            <CoursfrontCard refcour={refcour} owner={(owner)}
                                key={index}
                            //deleteProduct={deleteEvaluation}
                            >
                            </CoursfrontCard>


                        ))}
                </div>
            </div>

        );


    }
}
export default Coursfront; 