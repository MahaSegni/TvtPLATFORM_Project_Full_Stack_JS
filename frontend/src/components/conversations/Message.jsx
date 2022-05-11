import "../../assets/css/message.css";
import { format } from "timeago.js";

import RcViewer from 'rc-viewer'
import { useEffect, useState } from "react";
import { queryApi } from "../../utils/queryApi";
import axios from "axios";


export default function Message({ rl,index, message,cchat,messages, own, user, friend }) {
  const [isImage, setIsImage] = useState(true);
  const [isReadFile, setIsReadFile] = useState(false);

  
 async function deleteMessage(id){
   
   await axios.get(`${process.env.REACT_APP_API_URL}/messages/delete/`+id).then(async res => {
   await axios.get(`${process.env.REACT_APP_API_URL}/messages/` +cchat._id).then(resu=>{
    messages(resu.data);
   })
                                         
})

  
                                      

 }

  /*  <PDFViewer
    document={{
      url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
    }}
  />
  <embed src="https://www.w3.org/TR/PNG/iso_8859-1.txt" style={{width:"100px",height:"100px"}} download={message.image}/>
  */
  let type = ""
  useEffect(() => {
    if (message.image) {
      type = message.image.substring(message.image.lastIndexOf(".") + 1)

      if (/\.(jpg|jpeg|png|webp|avif|gif|svg|PNG)$/.test(message.image) == false) {
        setIsImage(false)
        if (!(/\.(rar|zip|gzip|tar|docx)$/.test(message.image))) {
          setIsReadFile(true)
        }

      }



    }


  });



  return (
    <>


      
      <div className={own ? "message own" : "message"}>
        
        <div className="messageTop">
       {own== true&& <a className="messageText "style={{backgroundColor:"transparent",marginRight:"10px"}} onClick={()=>{deleteMessage(message._id)}}> <i  style={{color:"red",width:"2px",height:"2px"}}class="far fa-trash-alt"></i></a>}

          { own == true && <>
            <p className="messageText ">{message.text && message.text} <br />   {message.image &&
              <>
                           {isImage == false &&
                  <label>
                    <label  > {isReadFile && <a data-toggle="modal" data-target={`#exampleModal${index}`} style={{ color: "rgb(5, 68, 104)" }}> <i class="far fa-eye fa-sm"></i></a>}
                      <a style={{ marginLeft: "2%" }}
                        href={message.image}
                        download><i class="fa fa-download fa-sm"></i></a> </label>

                    <i class='fa fa-file-text fa-4x ' style={{ margin: 0, marginLeft: 10, color: "#c7c000" }} ></i>


                  </label>
                }
                {isImage && <RcViewer>

                  <img src={ message.image}  className="messageimg "></img>

                </RcViewer>}</>
            }</p>

{user.image.startsWith("https")  && <img src={user.image} className="messageImg" referrerpolicy="no-referrer"></img>}
{!user.image.startsWith("https") && <img className="messageImg" src={require('../../assets/uploads/user/' + user.image)} alt="" /> }
</>
          }
      

          { own == false && <>
          {friend.image.startsWith("https") && <img src={friend.image} className="messageImgNotOwner" referrerpolicy="no-referrer"></img>}
          {!friend.image.startsWith("https")  && <img className="messageImgNotOwner" src={require('../../assets/uploads/user/' + friend.image)} alt="" />}
            <p className="messageText ">{message.text && message.text} <br />
              {message.image &&
                <>
                  {isImage && <RcViewer>

                    <img src={message.image}  className="messageimg " ></img>

                  </RcViewer>}
                  {isImage == false &&
                  <label  style={{backgroundColor:"white" ,borderRadius:"10%",marginRight: 10}}>

                    <i class='fa fa-file-text fa-4x ' style={{ margin: 10, marginLeft: 10, color: "#c7c000" }} ></i>
                 
                    
                        {isReadFile && 
                           <label >
                        <a data-toggle="modal" data-target={`#exampleModal${index}`} style={{ color: "rgb(5, 68, 104)" }}> <i class="far fa-eye fa-sm"></i></a>
                        <a 
                        href={message.image}
                        download><i class="fa fa-download fa-sm " style={{ marginLeft: "2%" ,marginRight:"2%" }}></i></a> 
                         </label>}
                         {!isReadFile && 
                           <label >
                        <a> <i class="far fa-eye fa-sm"style={{color:"white"}} ></i></a>
                        <a 
                        href={ message.image}
                        download><i class="fa fa-download fa-sm " style={{ marginLeft: "2%" ,marginRight:"2%" }}></i></a> 
                         </label>}
                    



                  </label>
                }
                  
                  
                  </>
              }</p>

          </>
          }
       



        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>

      {message.image && isReadFile && 
        <div class="modal fade " id={`exampleModal${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl" role="document" >
            <div class="modal-content" style={{ width: "100", height: "100%" }}>
              <div class="modal-header">
                <button id="cancelBtn" class="btn btn-template close " style={{ marginLeft: "95%" }} type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {<embed src={message.image} style={{ width: "100%", height: "550px" }} download={message.image} />}
              </div>

            </div>
          </div>
        </div>}
    </>
  );
}


