import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../utils/useApi";
import { useEffect, useState } from "react"
import Chart from "react-apexcharts";
import Result from "./result";

export default function Results({ evaluations, evresults }) {
    let [subExist,setSubExist]=useState()
   useEffect(()=>{
    setSubExist(false)
    if(evaluations){ 
    evaluations.map((ev) =>  
    {     if(ev.submissions.length>0){setSubExist(true)
    }}
     )}
   })

    return (
        <>
            <div className="container mt-5">
                <a onClick={() => {evresults(false);}}><i style={{ color: "rgb(5, 68, 104)" }} class="fas fa-arrow-circle-left fa-2x"></i></a>
                <h4 class="logo  " style={{ textAlign: "center", color: "#5fcf80", fontSize:"200%"}}>Results</h4>
                <center>
                    <div className="row">
                        {evaluations && subExist &&
                        evaluations.map((evaluation, indexEvs) => ( 
                            <>
                            { evaluation.submissions.length>0 &&
                            <div class="col-lg-6">
                                <p class="text-capitalize" style={{fontWeight: "bold", color:"#054468"}}>{evaluation.title}</p>
                                <Result
                                    key={indexEvs}
                                    evaluation={evaluation}>
                                </Result>
                            </div>} </>))}
                            
                            { subExist==false &&
                                <center><div class="alert warning-alert"><h5 style={{color:"#054468"}} >There are no submissions</h5></div></center>
                            }
                           
                    </div>
                </center>
            </div>
        </> )
}
