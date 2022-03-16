import './Courlist.css'
import React from 'react';
import { useApi } from '../../utils/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
const CourList=(props)=>{
    const [cour, err, reloadCours] = useApi('cours/find/' + props.refcour, null, 'GET', false);
 console.log(cour)
return (
    
    <div>
       {cour&&
        <div class="vertical-timeline-item vertical-timeline-element">
            <div> <span class="vertical-timeline-element-icon bounce-in"> <a href={"#"+cour._id}><FontAwesomeIcon icon={faCircleArrowDown} style={{ color: '#5FCF80' }} /> </a> </span>
                <div class="vertical-timeline-element-content bounce-in">
                    <h4 class="timeline-title">{cour.title}</h4>
                    <p>{cour.texte.replace(/<[^>]*>/g, "").substr(0,60)+'...'}</p> <span class="vertical-timeline-element-date">{cour.date_creation.substring(0, 10)}</span>
                </div>
            </div>
        </div>
       }
       </div>
    );
}
export default CourList;