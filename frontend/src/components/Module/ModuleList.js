import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import DetailModule from "./DetailModule";
import "../../assets/css/cardmodule.css"
import RowDetailsFront from "./RowDetailFront";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { queryApi } from "../../utils/queryApi";

export default function ModuleList() {

    const [modules, setModules] = useState([]);

    const [selectedId, SetselectedId] = useState(-1);
    const [add, setAdd] = useState(false);
    var connectedUser = useSelector(selectConnectedUser)
    const unsubscribe = async (id__) => {
        if (window.confirm("are you sure to unsubscribe this module")) {
            await queryApi('module/removeuser/' + id__ + '/' + connectedUser.id, null, 'PUT', false);

            window.location.reload(true);

        }
    }
    useEffect(async () => {
        const [ca, err1] = await queryApi('module/get', null, 'GET', false);
        setModules(ca);
    }, [])

    return (

        <div >
            <main id="main" data-aos="fade-in">
                <div class="breadcrumbs">
                    <div class="container">
                        <h2  >Courses</h2>
                        <p style={{ color: "black" }}>Find the right online course to elevate your career to next level </p>
                    </div>
                </div>


                <section id="courses" class="courses">

                    <br />
                    <div class="container" data-aos="fade-up">

                        <div class="row" data-aos="zoom-in" data-aos-delay="100">


                            {modules && add == false && <>
                                {modules.map((e) => {
                                    if (e.refStudents.filter(r => r == connectedUser.id).length > 0 && connectedUser.id != e.idowner) {

                                        return (
                                            <>
                                                {<>
                                                    <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                                                        <div class="course-item">

                                                            <RowDetailsFront label={e.label} image={e.image} idowner={e.idowner} refStudents={e.refStudents} id={e._id} rating={e.rating} />
                                                            <div class="my-2">


                                                                <button type="button" class="btn btn-template ms-5" onClick={() => {
                                                                    setAdd(true)
                                                                    SetselectedId(e._id)
                                                                }}>Show more</button>
                                                                <button type="button" class="btn btn-danger mx-3 " onClick={() => unsubscribe(e._id)}>unsubscribe</button>
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