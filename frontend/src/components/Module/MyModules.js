
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import "../../assets/css/mymodules.css"
import "../../assets/css/cardmodule.css"
import UpdateModule from "./UpdateModule";
import AddModule from "./AddModule";
import { useApi } from "../../utils/useApi";
import { queryApi } from "../../utils/queryApi";


export default function MyModules() {
    const [modules, setModules] = useState([]);
    var connectedUser = useSelector(selectConnectedUser)
    let [id, setid] = useState("");
    const [update, setUpdate] = useState(false);
    const [add, setAdd] = useState(false);
    let history = useHistory();
    const [token, errtoken, reloadToken] = useApi('module/getToken/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    if (token == "authorization failed") {
        history.push('/signin')
    }
    const OnDelete = async (id__) => {
        if (window.confirm("are you sure to delete this module")) {
            await queryApi('module/delete/' + id__, null, 'DELETE', false);
            window.location.reload(true);
        }
    }
    useEffect(async () => {
        const [ca, err1] = await queryApi('module/get', null, 'GET', false);
        setModules(ca);
    }, [])

    return connectedUser.type == "user" ? (
        <div >
            <main id="main" data-aos="fade-in">
                <div class="breadcrumbs">
                    <div class="container">
                        <h2 >My Modules</h2>
                    </div>
                </div>

                <section id="courses" class="courses">
                    <div class="container" data-aos="fade-up">
                        {add == false && update == false && <a class="btn btn-template mb-3" onClick={() => setAdd(true)} ><i class="fas fa-plus"></i></a>}

                        <div class="row" data-aos="zoom-in" data-aos-delay="100">
                            {update == false && add == false && <>
                                {modules.map(({ label, description, date_creation, date_update, _id, idowner, statusModule, image, refStudents }) => {
                                    if (idowner == connectedUser.id) {
                                        return (

                                            <>

                                                <div class="card myModuleCard mb-3">
                                                    <div class="card-body .myModuleCard-body ">
                                                        <div class="d-flex flex-column flex-lg-row">
                                                            {image != "" &&
                                                                <img class="img-fluid rounded-3 me-4 mb-2" alt="..." src={image} style={{ height: "70px", width: "90px" }} />
                                                            }
                                                            {image == "" &&
                                                                <img class="img-fluid rounded-3 me-4 mb-2" src="https://res.cloudinary.com/tvtplatform/image/upload/v1651755026/jqozldif65ylqudwzm2u.jpg" alt="" style={{ height: "70px", width: "90px" }} />}

                                                            <div class="row flex-fill">
                                                                <div class="col-sm-5">
                                                                    <h4 class="h5" style={{ color: "black", fontFamily: 'cursive' }}>{label}</h4>
                                                                    <span style={{ color: "black" }}>Created at : </span><span style={{ color: "rgb(5, 68, 104)" }}>{date_creation.substring(0, 10)}</span>
                                                                    &nbsp;  &nbsp;  &nbsp;{date_update != null && <><span style={{ color: "black" }}>Last edit : </span><span style={{ color: "rgb(5, 68, 104)" }}>{date_update.substring(0, 10)}</span></>}
                                                                </div>

                                                                <div class="col-sm-6 text-lg-end mx-3">

                                                                    <a onClick={() => {
                                                                        setUpdate(!update)
                                                                        setid(_id)
                                                                    }} style={{ border: 0, background: "transparent", color: "#5FCF80" }} class="btn btn-sm mx-3">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>

                                                                    <a onClick={() => OnDelete(_id)} style={{ border: 0, background: "transparent", color: "red" }} class="btn btn-sm mx-3">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>
                                                                    <a onClick={() => history.push("/module/" + _id + "/allcours")} class="btn btn-sm pull-right btn-template mx-3 mt-1" >
                                                                        show courses
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )
                                    }

                                })}
                            </>
                            }{update == true && <UpdateModule idu={id} />

                            }{
                                add == true && <AddModule />
                            }


                        </div>
                    </div>
                </section>
            </main>
        </div>



    ) : (
        <h1>problem happened</h1>
    )
}
