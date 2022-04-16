
import React from 'react';
import { useApi } from '../../utils/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
const AdminTableLine=({refCour,clickView})=>{
    const [cour, err, reloadCours] = useApi('cours/find/' + refCour, null, 'GET', false);
return (
     cour?(
         <tr>        
        <td style={{"textAlign":"left"}}>{cour.title}</td>
        <td style={{"textAlign":"left"}}>{cour.date_creation.substring(0, 10)}</td>
        <td style={{"textAlign":"center"}}> <span calss="ms-2 me-2"></span>  <FontAwesomeIcon icon={faHeart} color={"red"}></FontAwesomeIcon> {cour.likers.length}</td>
        <td style={{"textAlign":"center"}}> <span calss="ms-2 me-2"></span>  <FontAwesomeIcon icon={faComment} color={"grey"}></FontAwesomeIcon> {cour.comments.length}</td>
        <td> <a style={{"color":"#0d86ff","cursor":"pointer"}} onClick={()=>clickView(cour)}>View <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></a></td>
        </tr>

     ):(
         <tr></tr>
     )
       
    );
}
export default AdminTableLine;