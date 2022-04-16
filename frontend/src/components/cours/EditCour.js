import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./styleCard.css";
import { Card } from "react-bootstrap";
import "../.."
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const schema = yup.object({
  title: yup.string().required().max(30),
}).required();
const EditCour = ({titlecour,textecour, onEditCour,onCloseEdit}) => {
  var connectedUser = useSelector(selectConnectedUser)
  const[ckedtiorValue,setckedtiorValue]=useState(textecour);
  const[ckedtiorValide,setckedtiorValide]=useState(true);
  const[ckedtiormessage,setckedtiormessage]=useState("");
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit =  (data) => { 

    onEditCour(data,ckedtiorValue);
    
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${process.env.REACT_APP_API_URL}/cours/uploadimage`, {
              method: "POST",
              body: body
              // mode: "no-cors"
            })
              .then(res => res.json())
              .then((res) => {
                
                resolve({
                  default: '/courUploads/'+res.filename
                  
                });
              }
            )
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
    function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div class="post-content">
      <div class="post-container">
        { connectedUser.image.startsWith("https") &&
                                                     
                                                     <img src={connectedUser.image} class="profile-photo-md pull-left"
                                                         referrerpolicy="no-referrer"></img>
                                                 }
                                                 {! connectedUser.image.startsWith("https")  && <img src={require("../../assets/uploads/user/" + connectedUser.image)} alt="" class="profile-photo-md pull-left"
                                                     />
                                                 }
        <div class="post-detail">
          <div class="user-info">
            <h5><a href="timeline.html" class="profile-link">{connectedUser.name}</a> </h5>
          </div>
          <div class="reaction">
              <a class="href" onClick={onCloseEdit} style={{cursor: "pointer"}}>Close</a>
           </div>

          <div class="line-divider"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
       
          <div class="post-text">
              <div class="form-group my-3">
                <input type="text" class="form-control" id="title" defaultValue={titlecour} {...register("title")} placeholder="Title " />
              </div>
              <div class="alert alert-danger" role="alert"  hidden={!errors.title}>
              {errors.title?.message}
              </div>
              
              <div class="form-group my-3">
              <CKEditor 

                    editor={ ClassicEditor }
                    config={{
                      extraPlugins: [uploadPlugin]
                    }}
                    data={textecour}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setckedtiorValue(data);
                        
                        if(data.length==0){
                          setckedtiormessage("texte is required");
                          setckedtiorValide(false);
                        }else{
                          setckedtiormessage("");
                          setckedtiorValide(true);
                        }
                       
                    } 
                  }
                />
                </div>
              <div class="alert alert-danger" role="alert" hidden={ckedtiormessage.length==0}>
              {ckedtiormessage}
              </div>

              <div className="form-group my-3">
                <input type="submit" value="Save"className="form-control btn btn-template " disabled={!ckedtiorValide}/>
              </div>

            </div>
            </form>



        </div>
      </div>
    </div>

  );


}
export default EditCour; 