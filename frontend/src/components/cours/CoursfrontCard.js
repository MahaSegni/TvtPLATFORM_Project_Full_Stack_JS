import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { Card, Modal } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import "./styleCard.css";
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import PostComment from "./PostComment";
import CardComment from "./CardComment";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'reactjs-popup/dist/index.css';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


import EditCour from "./EditCour";
import { useHistory } from "react-router-dom";
import "./cardFiles.css"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
const CoursfrontCard = (props) => {

  const [showComments, setShowComments] = useState(false);
  var connectedUser = useSelector(selectConnectedUser)
  const [cour, err, reloadCours] = useApi('cours/find/' + props.refcour, null, 'GET', false);
  const [editCOur, setEditCour] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const history = useHistory();

  let { idModule } = useParams();

  function getType(value) {
    let ext = value.originalname.split(".");
    ext = ext[ext.length - 1];
    return ext;
  }
  function zipfile(value){

    const zips=["rar" ,"zip" ,"xlsx","csv"];
    return (zips.indexOf(getType(value))>-1)
    }


  async function confirmDelete(id) {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Delete(id)
        },
        {
          label: 'No',
          onClick: () => {

          }
        }
      ]
    });
  }
  async function submitEditCour(data, ckeditordata) {
    const [, err] = await queryApi('cours/update/' + cour._id, {
      title: data.title,
      texte: ckeditordata
    }
      , 'PUT', false, connectedUser.token);
    setEditCour(false)
    reloadCours();

  }

  async function Delete(id) {

    const [, err] = await queryApi('cours/delete/' + idModule + '/' + id, null
      , 'GET', false, connectedUser.token);
    reloadCours();
  }
  async function like(id) {
    const [, err] = await queryApi('cours/like-cours/' + id, {
      id: connectedUser.id
    }
      , 'PATCH', false, connectedUser.token);
    reloadCours();

  }
  async function unlike(id) {
    const [, err] = await queryApi('cours/unlike-cours/' + id, {
      id: connectedUser.id
    }
      , 'PATCH', false, connectedUser.token);
    reloadCours();

  }
  async function clickAlert2(data) {
    const [, err] = await queryApi('cours/' + props.refcour + '/addComment', {
      ownerComment: connectedUser.id,
      nomUser: connectedUser.name,
      imageUser: connectedUser.image,
      texte: data.zonetexte
    }
      , 'POST', false, connectedUser.token);

    reloadCours();
    setShowComments(true)

  }

  async function CommentDelete(id) {
    const [, err] = await queryApi('cours/' + props.refcour + '/deleteComment', {
      id: id
    }
      , 'PATCH', false, connectedUser.token);

    reloadCours();
  }
  async function CommentUpdate(texte, id) {
    const [, err] = await queryApi('cours/' + props.refcour + '/UpdateComment', {
      id: id,
      texte: texte
    }
      , 'PATCH', false, connectedUser.token);



    reloadCours();
  }
  return (

    <div>
      {cour && editCOur == true &&
        <div>

          <EditCour titlecour={cour.title} textecour={cour.texte} onEditCour={submitEditCour} onCloseEdit={() => setEditCour(false)}></EditCour>
        </div>
      }
      {cour && editCOur == false &&

        <div class="post-content" id={cour._id}>

          <div class="post-container">
            {props.owner.image.startsWith("https") &&

              <img src={props.owner.image} class="profile-photo-md pull-left"
                referrerpolicy="no-referrer"></img>
            }
            {!props.owner.image.startsWith("https") && <img src={require('../../assets/uploads/user/' + props.owner.image)} alt="" class="profile-photo-md pull-left"
            />
            }
            <div class="post-detail">
              <div class="user-info">
                <h5><a href="timeline.html" class="profile-link">{props.owner.name}</a></h5>
                <p class="text-muted"  > {cour.date_creation.substring(0, 10)} </p>
              </div>

              <div class="reaction">
                {connectedUser.id == props.owner._id &&
                  <a onClick={() => setEditCour(true)}> <FontAwesomeIcon icon={faGear}></FontAwesomeIcon> </a>

                } {connectedUser.id == props.owner._id &&
                  <a onClick={() => confirmDelete(cour._id)}> <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </a>

                }
                {cour.likers.includes(connectedUser.id) && connectedUser.type != "disconnected" && connectedUser.id != props.owner._id &&
                  <a onClick={() => unlike(cour._id)} class="btn text-green"><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
                }

                {!cour.likers.includes(connectedUser.id) && connectedUser.type != "disconnected" && connectedUser.id != props.owner._id &&
                  <a onClick={() => like(cour._id)} class="btn text-grey"><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
                }
                {connectedUser.type == "disconnected" &&
                  <a class="btn text-green" ><i class="fa fa-thumbs-up"></i> {cour.likers.length}</a>
                }

              </div>

              <div class="line-divider"></div>

              <div class="line-divider"></div>
              <div class="post-text">
                <p class="bold d-flex justify-content-center">{cour.title}</p>
              </div>
              <div dangerouslySetInnerHTML={{ __html: cour.texte }} />
              {cour.files &&
                <div id="main-content" class="file_manager">
        <div class="container">            
        <div class="row clearfix">
                  {cour.files.map((value, index) => (
                  <div class="col">
                        {getType(value) == "pdf" &&
                          <div class="cardForFile" onClick={() => {
                            setSelectedFile(value);
                            handleShow()
                          }}>
                            <div class="file">
                              <a href="javascript:void(0);">
                                <div class="hover">
                                  
                                </div>
                                <div class="icon">
                                <i class="fa fa-file-pdf" style={{"color":"red"}}></i>

                                </div>
                                <div class="file-name">
                                  <p class="m-b-5 text-muted">{value.originalname}</p>
                                </div>
                              </a>
                            </div>
                          </div>

                      }
                      {value.typeFile.startsWith("image") &&
                          <div class="cardForFile" onClick={() => {
                            setSelectedFile(value);
                            handleShow()
                          }}>
                            <div class="file">
                              <a href="javascript:void(0);">
                                <div class="hover">
                                  
                                </div>
                                <div class="icon">
                                <i class="fas fa-image"></i>
                                </div>
                                <div class="file-name">
                                  <p class="m-b-5 text-muted">{value.originalname}</p>
                                </div>
                              </a>
                            </div>
                          </div>

                      }
                      {getType(value) == "docx" &&
                          <div class="cardForFile">
                            <div class="file">
                              <a href={"/viewMicrosftDoc/"+value.filenamelocation}>
                                <div class="hover">
                                <button type="button" class="btn btn-icon btn-danger" onClick={() => {
                                 history.push(value.filenamelocation)
                                 }}>
                                <i class="fa fa-eye"></i>
                                </button>
                                </div>
                                <div class="icon">
                                <i class="fa fa-file text-info"></i>

                                </div>
                                <div class="file-name">
                                  <p class="m-b-5 text-muted">{value.originalname}</p>
                                </div>
                              </a>
                            </div>
                          </div>

                      }
                      {getType(value) && zipfile(value)&&
                          <div class="cardForFile">
                            <div class="file">
                              <a href={"http://localhost:3001/courUploads/"+value.filenamelocation}>
                                <div class="hover">
                                <button type="button" class="btn btn-icon btn-secondary" onClick={() => {
                                 history.push(value.filenamelocation)
                                 }}>
                                <i class="fa fa-download"></i>
                                </button>
                                </div>
                                <div class="icon">
                                <i class="fa fa-file-archive-o"></i>

                                </div>
                                <div class="file-name">
                                  <p class="m-b-5 text-muted">{value.originalname}</p>
                                </div>
                              </a>
                            </div>
                          </div>

                      }

 
                  </div>

                      ))
                 }
</div></div>
                </div>
              }


              <div class="line-divider"></div>
              {showComments == false &&
                <a class="href" style={{ cursor: "pointer" }} onClick={() => setShowComments(true)}>show comments <FontAwesomeIcon icon={faComment} /></a>}
              {showComments == true &&
                <a style={{ cursor: "pointer", color: "grey" }} onClick={() => setShowComments(false)}>close comments <FontAwesomeIcon icon={faMinusCircle} /></a>
              }
              {showComments == true && connectedUser.type != "disconnected" &&

                cour.comments.map((comment, index) => (

                  <CardComment comment={comment} onCommentDelete={CommentDelete} onCommentUpdate={CommentUpdate}
                    key={index}
                  //deleteProduct={deleteEvaluation}
                  >
                  </CardComment>


                ))
              }

              {connectedUser.type != "disconnected" &&
                <PostComment onCommentClick={clickAlert2} />
              }
            </div>
          </div>
        </div>
      }{selectedFile && getType(selectedFile) != "docx" &&

        <Modal show={ShowModal} onHide={handleClose} size={"lg"}

        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <DocViewer pluginRenderers={DocViewerRenderers} documents={[{ uri: "http://localhost:3001/courUploads/" + selectedFile.filenamelocation }]}
            />

            {/*<FileViewer
        fileType={getType(selectedFile)}
        filePath={"/courUploads/"+selectedFile.filenamelocation}
    />*/}

          </Modal.Body>

        </Modal>
      }
    </div>

  );


}




export default CoursfrontCard; 