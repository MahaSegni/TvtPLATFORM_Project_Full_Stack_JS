import React, { useEffect, useState } from 'react';
import { useApi } from '../../utils/useApi';
import RowDetailsFront from "./RowDetailFront";
export default function ModuleByCat({cat,showmodel}) {
    let [id,setid]=useState("");
    const [modulesbycat, err, reload] = useApi('category/getmodulesfromcategory/'+cat,null,'GET',false);
    if (id!=cat){setid(cat)
        reload();
    }
    
    
    

   return (
<>
{modulesbycat &&
modulesbycat.map((module,index) =>(
    <>
     {                      <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="plan-card plan-one">
                              <RowDetailsFront label={module.label} image={module.image} />
                         
                            </div>
                          </div>

     }
    
    </>
   ))



}
                
                
              
</>
   )}