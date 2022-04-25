import React, { Component, useState} from 'react';
import FileViewer from 'react-file-viewer';
import { useApi } from '../../utils/useApi';
import { useParams } from 'react-router';

function getType(value){
    let ext = value.split(".");
    ext = ext[ext.length - 1];
    return ext;
  }

const MicrosoftDocsViewer = ()=>{
  const { idcour } = useParams();
  const { idfile } = useParams();
  const [file,setFile]=useState(null);

  console.log(idcour,idfile);
  const [cour, err, reloadCours] = useApi('cours/find/' + idcour, null, 'GET', false);
  if(cour&&file==null){
       let f=cour.files.find(e=>e._id==idfile);
       setFile(f);
       console.log(f);

  }


      

  return(

    <div className="col-12">
      {file&&
    <FileViewer width={"100%"}
        fileType={getType(file.originalname)}
        filePath={file.filenamelocation}

     />
      }

    </div>
)
}
export default MicrosoftDocsViewer; 