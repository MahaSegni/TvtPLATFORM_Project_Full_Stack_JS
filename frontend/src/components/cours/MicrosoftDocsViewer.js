import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function getType(value){
    let ext = value.split(".");
    ext = ext[ext.length - 1];
    return ext;
  }

const MicrosoftDocsViewer =()=>{
    const filenamelocation=useParams();
    console.log(filenamelocation)

return(

    <div className="col-12">
      {
    <FileViewer width={"100%"}
        fileType={getType(filenamelocation.filenamelocation)}
        filePath={"/courUploads/"+filenamelocation.filenamelocation}

     />
      }

    </div>
)
}
export default MicrosoftDocsViewer; 