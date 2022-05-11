
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../Redux/slices/sessionSlice";
import { useContext, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
export default function Home() {
    let connectedUser = useSelector(selectConnectedUser)
    const history = useHistory();
    let [message,setmessage] = useState()
 
    return (

        <>
         <div className="container text-center" style={{marginTop:"15%"}}>
            <h1 style={{color:"rgb(5, 68, 104)"}}  >Welcome to your e-learning website TvtPlatform</h1>
             {connectedUser.type == "disconnected" &&
             <>
               <Link className="btn btnHome" to={'/signup'}>Get Started</Link>
                <Link className="btn btnHome"to={'/signin'}>Sign In</Link> 
              </>
             }

         </div>
         
        </>
    );
}



