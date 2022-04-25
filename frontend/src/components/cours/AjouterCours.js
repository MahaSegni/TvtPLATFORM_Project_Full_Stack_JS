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
import { FileUploader } from "react-drag-drop-files";
import { prototype } from "apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
const schema = yup.object({
  title: yup.string().required().max(30),
}).required();
const AjouterCour = ({ idmodule, onChildClick }) => {
  var connectedUser = useSelector(selectConnectedUser)
  const [ckedtiorValue, setckedtiorValue] = useState("");
  const [ckedtiorValide, setckedtiorValide] = useState(false);
  const [ckedtiormessage, setckedtiormessage] = useState("");
  const [files, setFiles] = useState([]);
  const fileTypes = ["ZIP", "PDF", "DOCX"];
  function getType(value) {
    let ext = value.split(".");
    ext = ext[ext.length - 1];
    return ext;
  }
  const handleChange = (file) => {
    if (file.constructor.name == "FileList") {
      setFiles(files => [file[0], ...files])
    } else {
      setFiles(files => [file, ...files]);
    }
    console.log(files);


  };
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {

    onChildClick(data, idmodule, ckedtiorValue, files);

  }
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            console.log(file);
            body.append("files", file);
            fetch(`${process.env.REACT_APP_API_URL}/cours/uploadimage`, {
              method: "POST",
              body: body
              // mode: "no-cors"
            })
              .then(res => res.json())
              .then((res) => {

                resolve({
                  default: res.filename

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
        {connectedUser.pictureType == "external" &&

          <img src={connectedUser.image} class="profile-photo-md pull-left"
            referrerpolicy="no-referrer"></img>
        }
        {connectedUser.pictureType == "internal" && <img src={require('../../assets/uploads/user/' + connectedUser.image)} alt="" class="profile-photo-md pull-left"
        />
        }
        <div class="post-detail">
          <div class="user-info">
            <h5><a href="timeline.html" class="profile-link">{connectedUser.name}</a> </h5>
          </div>
          <div class="line-divider"></div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div class="post-text">
              <div class="form-group my-3">
                <input type="text" class="form-control" id="title" {...register("title")} placeholder="Title " />
              </div>
              <div class="alert alert-danger" role="alert" hidden={!errors.title}>
                {errors.title?.message}
              </div>

              <div class="form-group my-3">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    extraPlugins: [uploadPlugin]
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setckedtiorValue(data);

                    if (data.length == 0) {
                      setckedtiormessage("texte is required");
                      setckedtiorValide(false);
                    } else {
                      setckedtiormessage("");
                      setckedtiorValide(true);
                    }

                  }
                  }
                />
              </div>
              <div class="alert alert-danger" role="alert" hidden={ckedtiormessage.length == 0}>
                {ckedtiormessage}
              </div>
              <FileUploader handleChange={handleChange} name="file" types={fileTypes}  />
              {files.length > 0 &&
     <div id="main-content" class="file_manager my-2">
     <div class="container">
       <div class="row clearfix">
                  {files.map((f, index) => (
               
                          f?(
                          <div class="col ">
                          <div class="cardForFile">
                            <div class="file">
                              <a>
                                <div class="icon">
                                  {getType(f.name)=="docx"&&
                                  <i class="fa fa-file text-info"></i>
                                  }
                                   {getType(f.name)=="pdf"&&
                                  <i class="fa fa-file-pdf" style={{"color":"red"}}></i>
                                }
                              
                               {f.type.startsWith("image") &&
                                <i class="fas fa-image"></i>

                               } 
                               
                               {f.type.startsWith("video") &&
                                <i class="fas fa-video"></i>

                               }
                               {getType(f.name)!="pdf"&&getType(f.name)!="docx"&&!f.type.startsWith("image")&&!f.type.startsWith("video")&&
                               <i class="fa fa-file-archive-o"></i>
                             }

                       
                                </div>
                                <div class="file-name">
                                  <p class="m-b-5 text-muted">{f.name}</p>
                                </div>
                              </a>
                            </div>
                          </div>
                          </div>
                  ):(
                  <></>
                  )
                  ))
                  }  
                  </div>
                  </div></div>

              }

              <div className="form-group my-3">
                <input type="submit" value="Save" className="form-control btn btn-template " disabled={!ckedtiorValide} />
              </div>

            </div>
          </form>



        </div>
      </div>
    </div>

  );


}
export default AjouterCour; 