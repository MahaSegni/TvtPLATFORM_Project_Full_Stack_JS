import { Route, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import { useApi } from "../../utils/useApi";
import "./adminCours.css";
import AdminTableLine from "./AdminTableLine";
import CoursfrontCard from "./CoursfrontCard";
import { set } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

const AdminCours = () => {
    const history = useHistory();
    var connectedUser = useSelector(selectConnectedUser)
    const [category, errcategory, reloadCategory] = useApi('category/get', null, 'GET', false, connectedUser.token);
    const [modules, setModules] = useState();
    const [module, setModule] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedModuleId, setselectedModuleId] = useState(null);
    const [refCours, setrefCours] = useState([]);
    const [courView, setCourView] = useState(null);
    const [ownerView, setOwnerView] = useState(null);

    const [openViewTab, setopenViewTab] = useState(false);

    const handleCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value)
        let x=document.getElementById("moduleselect").options[0].select

    }
    async function deleteCour(){
        const [, err] =  await queryApi('cours/delete/' + selectedModuleId +'/'+courView._id, null
        , 'GET', false,connectedUser.token);
       let ref=refCours.filter(e=>e!=courView._id);
       console.log(ref);
       setrefCours(ref);
       setopenViewTab(false);

       // window.location.reload(false);

        

    }
     function confirmDelete(){
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    deleteCour()
                
                }
              },
              {
                label: 'No',
                onClick: () => {
      
                }
              }
            ]
          });
      
    }
    async function clickView(cour) {
        setopenViewTab(false)
        let m = modules.find(e => e._id == selectedModuleId);
        const [ownerOfCour, err] = await queryApi('cours/getModuleowner/' + m.idowner, {}, 'GET', false, connectedUser.token);
        setCourView(cour);
        setopenViewTab(true);
        console.log(courView)
        setOwnerView(ownerOfCour);


    }
    async function getOneModule() {
        const [moduleConst, err] = await queryApi('cours/getModuleofcours/' + selectedModuleId, {}, 'GET', false, connectedUser.token);
        setModule(moduleConst)
        setrefCours(null);
        setrefCours(moduleConst.refCours)
    }
    async function getDataModule() {

        const [modulesbycat, err] = await queryApi('category/getmodulesfromcategory/' + selectedCategoryId, null, 'GET', connectedUser.token);
        setModules(modulesbycat)
    }
    useEffect(() => {
        if (category)
            setSelectedCategoryId(category[0]._id)

    }, [category]);
    useEffect(() => {
        if (selectedCategoryId !== null) {
            getDataModule()
        }

    }, [selectedCategoryId])
    useEffect(() => {
        if (modules)
            setselectedModuleId(modules[0]._id)
    }, [modules])
    useEffect(() => {
        if (selectedModuleId != null) {
            getOneModule()
        }
    }, [selectedModuleId])
    if (connectedUser.type != "admin") {
        history.push("/signin")

    }

    return (
        <div class="row mx-auto my-2" style={{ "width": "90%" }}>
            <div class="col-4 my-3 me-2">
                <Card>
                    <Card.Body>
                        <Card.Title>Manage Courses</Card.Title>
                        <Card.Text>
                            <label>Select a category</label>
                            <select class="form-select" onChange={(e) => handleCategoryChange(e)} >
                                {category &&
                                    category.map((cat, index) => (
                                        index == 0 ? (
                                            <option key={index} selected value={cat._id} >
                                                {cat.label}
                                            </option>
                                        ) : (
                                            <option key={index} value={cat._id}>
                                                {cat.label}

                                            </option>
                                        )




                                    ))
                                }

                            </select>
                            <label>Select a Module</label>
                            <select class="form-select" id="moduleselect" onChange={(e) => setselectedModuleId(e.target.value)} >
                                {selectedCategoryId && modules &&
                                    modules.map((module, index) => (
                                        index == 0 ? (
                                            <option key={index} selected value={module._id} >
                                                {module.label}
                                            </option>
                                        ) : (
                                            <option key={index} value={module._id}>
                                                {module.label}

                                            </option>
                                        )




                                    ))
                                }

                            </select>
                            <input type="text" class="form-control my-3" placeholder="Direct Search By Name" />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div class="col my-3 ms-2">
                <div class="customTable">
                    <div class="table-wrapper">
                        {refCours && module &&

                            <table class="fl-table">
                                <thead>
                                    <tr>
                                        <th>Title </th>
                                        <th>Date Creation</th>
                                        <th>Likes </th>
                                        <th>Comments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {refCours.length > 0 &&

                                        refCours.map((ref, index) => (

                                            <AdminTableLine refCour={ref} key={index} clickView={clickView}>


                                            </AdminTableLine>


                                        ))}
                                    {refCours.length <= 0 &&
                                        <tr>No courses is avaible</tr>
                                    }
                                </tbody>
                            </table>
                        }

                    </div>
                </div>
                {openViewTab == true && courView && ownerView &&
                <div class="my-3">
                <Card>
                    <Card.Header>
                       <div><label> Admin Commands </label>
                       <div class="float-end"><a class="text-danger" onClick={()=>confirmDelete()}><label class="me-2" >Permanently delete</label><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></a></div>
                       </div>
                    </Card.Header>
                </Card>
                 <CoursfrontCard refcour={courView._id} owner={ownerView}
                            //deleteProduct={deleteEvaluation}
                            >
                 </CoursfrontCard>
                       
                </div>
                }
            </div>
        </div>


    )

}

export default AdminCours;
