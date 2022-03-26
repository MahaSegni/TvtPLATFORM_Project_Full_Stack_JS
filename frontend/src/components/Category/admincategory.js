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

function admincategory() {
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    label: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  let idu = "";
  const [selectedId, SetselectedId] = useState(-1);
  const [show, setShow] = useState(false);
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
   // window.location.reload(true);
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
  /*
    const onSubmit = () => {
      axios.post('http://localhost:3000/api/category/add', form)
        .then(res => {
          setMessage(res.data.message)
          setForm({})
          setErrors({})
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 4000);
        })
        .catch(err => setErrors(err.response.data))
    }*/
  
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this category")) {

      axios.delete(`http://localhost:3000/api/category/delete/${id__}`)
        .then(res => {
          window.location.reload(true);
        })
    }
  }

  const [uploadImage, setUploadImage] = useState({
    image: ""
  })

  const onChangeFile = (e) => {
    setUploadImage({ ...uploadImage, image: e.target.files[0] })
    //updateImage()
  }

  /* find all users */
  useEffect(async () => {
    await axios.get("http://localhost:3000/api/category/get").then((res) => {
      setCategory(res.data);
    });
  });
  return (
   // connectedUser.type == "admin" ? (
    <>
      {add == false && !update &&
        <button className="btn btn-template" type="submit" onClick={() => setAdd(!add)}>Add Category</button>
      }{add == true && !update &&
        <button className="btn btn-template" type="submit" onClick={() => setAdd(!add)}>Hide</button>
      }


      <div className="row p-4">

        {add == true &&
          <>
            <Alert message={message} show={show} />
            <div className="mt-4">
              <h2>Category</h2>
            </div>
            <div className="col-12 col-lg-4">
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
          <UpdateCategory idu={selectedId} />
        }
        <div className="col-12 col-lg-7">
          <div class="card-body">
            <div class="table-responsive" id="proTeamScroll" tabindex="2" style={{ height: "400px", overflow: "hidden", outline: "none" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Category</th>
                    <th>N° Modules</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map(({ _id, label, image, modules }) => (
                    <tr >
                      <td>
                        <td class="text-truncate">
                          <ul class="list-unstyled order-list m-b-0">
                            <li class="team-member team-member-sm"><img class="rounded-circle" src={require('../../assets/uploads/module/' + image)} alt="user" data-toggle="tooltip" title="" data-original-title="Wildan Ahdian" /></li>
                          </ul>
                        </td>
                      </td>
                      <td>
                        <h6 class="mb-0 font-13">{label}</h6>
                      </td>
                      <td class="align-middle">
                        <div class="progress-text"></div>
                        <div class="progress" data-height="15px" style={{ height: "15px" }}>
                          <div class="progress-bar progress-bar-striped bg-success" data-width="15px" style={{ width: modules.length + "%", color: "black" }} >{modules.length}%</div>
                        </div>
                      </td>
                      <td>
                        <a data-toggle="tooltip" title="" data-original-title="Edit" class="pull-left" onClick={() => {
                          setAdd(false)
                          setUpdate(true)
                          SetselectedId(_id)
                        }}><i class="fa fa-edit"></i></a> &nbsp;
                        <a data-toggle="tooltip" title="" data-original-title="Delete" class="pull-right" onClick={() => OnDelete(_id)} ><i class="fa fa-trash" aria-hidden="true" style={{ color: "green" }} ></i></a>
                      </td>

                    </tr>
                  ))}
                  <tr >
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={category.length}
                      paginate={paginate}
                    />
                  </tr>
                </tbody></table></div>
          </div>
        </div>
      </div></>
  ) ;
}

export default admincategory;
