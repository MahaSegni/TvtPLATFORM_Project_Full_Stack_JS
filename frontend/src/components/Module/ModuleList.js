

import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import DetailModule from "./DetailModule";
import "../../assets/css/cardmodule.css"
import RowDetailsFront from "./RowDetailFront";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ModuleList() {

    const [modules, setModules] = useState([]);
    const [selectedId, SetselectedId] = useState(-1);
    const [add, setAdd] = useState(false);
    var connectedUser = useSelector(selectConnectedUser)
    const unsubscribe = (id__) => {
        if (window.confirm("are you sure to unsubscribe this module")) {

            axios.put(`http://localhost:3000/api/module/removeuser/${id__}/${connectedUser.id}`)
                .then(res => {
                    window.location.reload(true);
                })
        }
    }
    useEffect(async () => {
        await axios.get('http://localhost:3000/api/module/get').then(res => {
            setModules(res.data)
        })

    }, [])
    return (
        <div >
            <main id="main" data-aos="fade-in">
                <div class="breadcrumbs">
                    <div class="container">
                        <h2  style={{ color: "black" }}>Courses</h2>
                        <p  style={{ color: "black" }}>Find the right online course to elevate your career to next level </p>
                    </div>
                </div>


                <section id="courses" class="courses">

                    <br />
                    <div class="container" data-aos="fade-up">

                        <div class="row" data-aos="zoom-in" data-aos-delay="100">


                            {add == false && <>
                                {modules.map(({ label, description, date_creation, _id, idowner, statusModule, image, refStudents }) => {
                                    if (refStudents == connectedUser.id && connectedUser.id != idowner) {
                                        return (
                                            <>
                                                {<>
                                                    <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                                                        <div class="course-item">

                                                            <RowDetailsFront label={label} image={image} idowner={idowner} refStudents={refStudents} id={_id} />
                                                            <div class="my-2">


                                                                <button type="button" class="btn btn-template ms-5" onClick={() => {
                                                                    setAdd(true)
                                                                    SetselectedId(_id)
                                                                }}>Show more</button>
                                                                <button type="button" class="btn btn-danger mx-3 " onClick={() => unsubscribe(_id)}>unsubscribe</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                }

                                            </>
                                        )
                                    }

                                }

                                )}



                            </>}{add == true && <>
                                <DetailModule id={selectedId} />
                            </>
                            }





                        </div>
                    </div>
                </section>
            </main>
        </div>

    );
}