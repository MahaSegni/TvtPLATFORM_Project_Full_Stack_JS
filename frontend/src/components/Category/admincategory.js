import React, { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import axios from "axios";
import Alert from "./Alert";
import { FormGroup, TextField } from "@mui/material";
import "../../assets/css/admincategory.css"

import Pagination from './Pagination';
import { useSelector } from "react-redux";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";
import { queryApi } from "../../utils/queryApi";
import { useApi } from "../../utils/useApi";
import { useHistory } from "react-router-dom";
import UpdateCategory from "./UpdateCategory";
import "../../assets/css/mymodules.css"
import "../../assets/css/cardmodule.css"
import Statistique from "./Statistique";
function Admincategory() {
  const [category, setCategory] = useState([]);
  
  const [form, setForm] = useState({
    label: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  let idu = "";
  const [selectedId, SetselectedId] = useState(-1);
  const [show, setShow] = useState(false);
  const [showstat, setShowStat] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  var connectedUser = useSelector(selectConnectedUser)
  const history = useHistory();
  const [token, errtoken, reloadToken] = useApi('module/getToken/' + connectedUser.id, null, 'GET', false, connectedUser.token);
  if (token == "authorization failed") {
    history.push('/signin')
  }
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = category.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let result = await updateimageCategory()
    setAdd(false)
    setUpdate(false)
    window.location.reload(true);
  }
  const updateimageCategory = async () => {

    const [result, err2] = await queryApi('category/add', form, "POST", false, connectedUser.token)
    setMessage(result.message)
    setForm({})
    setErrors({})
    setShow(true)
    if (uploadImage.image != "") {
      const [imageResult, err] = await queryApi('category/uploadPicture/' + result.result._id, uploadImage, "PUT", true, connectedUser.token)

    }

    return result
  }
  const OnDelete =async (id__) => {
    if (window.confirm("are you sure to delete this category")) {
      await queryApi('category/delete/' + id__, null, 'DELETE', false);
      
          window.location.reload(true);
      
    }
  }
  const [uploadImage, setUploadImage] = useState({
    image: ""
  })
  const onChangeFile = (e) => {
    setUploadImage({ ...uploadImage, image: e.target.files[0] })
    //updateImage()
  }
  
  useEffect(async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/category/get`).then((res) => {
      setCategory(res.data);
      setShowStat(true)
    })
    

  });
  return (
    <>
      <div className="row p-4">
       
          {add == false && !update &&  <><div class="container mt-2 mb-2" >
            <button className="btn btn-template mb-3" type="submit" onClick={() => setAdd(!add)}><i class="fas fa-plus"></i></button>
            </div>
            {showstat==true &&  <div className="col-12 col-lg-4 mt-4"><span className="mx-4">statistic modules by category</span> <Statistique category={category}/></div>}
              </>
          }{add == true && !update &&  <div class="container mt-2 mb-2" >
            <button className="btn btn-template mb-3" type="submit" onClick={() => setAdd(!add)}>Hide</button>
            </div>
          }
        
        {add == true &&
          <>
            <Alert message={message} show={show} />

            <div className="col-12 col-lg-4 mt-4">
              <form onSubmit={onSubmitHandler}>
                <InputGroup
                  label="label"
                  type="text"
                  name="label"
                  onChangeHandler={onChangeHandler}
                  errors={errors.label}
                />
                <FormGroup>
                  <label for="file" class="label-file">Choose image</label>
                  <input id="file" class="input-file"
                    type='file'
                    name="image"
                    onChange={(e) => onChangeFile(e)}
                  />
                </FormGroup>
                <button className="btn btn-template" type="submit">Add Category</button>
              </form>
            </div>
          </>
        }

        {add == false && update == true &&
          <UpdateCategory idu={selectedId} update={update}/>
        }
       
        <div className="col-12 col-lg-7 ms-5 ">
          <section id="courses" class="courses">
            <div class="container" data-aos="fade-up">
              <div class="row" data-aos="zoom-in" data-aos-delay="100">
                {currentPosts.map(({ _id, label, image, modules }) => {
                  return (
                    <>
                      <div class="card cardCategory mb-3">
                        <div class="card-body">
                          <div class="d-flex flex-column flex-lg-row">
                            {image != null &&
                              <img class="img-fluid rounded-3 me-4 mb-2" alt="..." src={image} style={{ height: "70px", width: "90px" }} />
                            }
                            {image == null &&
                              <img class="img-fluid rounded-3 me-4 mb-2" src="https://res.cloudinary.com/tvtplatform/image/upload/v1651755026/jqozldif65ylqudwzm2u.jpg" alt="" style={{ height: "70px", width: "90px" }} />}

                            <div class="row flex-fill">
                              <div class="col-sm-5">
                                <h4 class="h5" style={{ color: "black" }}>{label}</h4>

                              </div>

                              <div class="col-sm-3 text-lg-end">
                                <a data-toggle="tooltip" title="" data-original-title="Edit" style={{ border: 0, background: "transparent", color: "#5FCF80" }} class="pull-left" onClick={() => {
                                  setAdd(false)
                                  setShow(true)
                                  setUpdate(true)
                                  SetselectedId(_id)
                                }}><span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </span></a> &nbsp;
                                <a data-toggle="tooltip" title="" data-original-title="Delete" style={{ border: 0, background: "transparent", color: "red" }} class="pull-right" onClick={() => OnDelete(_id)} >
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                  </span></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
                )
                }
                <div >
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={category.length}
                    paginate={paginate}
                  />
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>


    </>
  );
}

export default Admincategory;
