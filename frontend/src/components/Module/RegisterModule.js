RegisterModule

import React from 'react'

import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import "../../assets/css/registermodule.css"
import axios from 'axios';
function RegisterModule() {
    const [modules, setModules] = useState([]);
    var connectedUser = useSelector(selectConnectedUser)
    useEffect(async () => {
        await axios.get('http://localhost:3000/api/module/get').then(res => {
            setModules(res.data)
        })

    }, [])


    return connectedUser.type == "user" ? (
        // connectedUser.id === "622cc35c8704627ac3801c98" ?(

        <div >
            <main id="main" data-aos="fade-in">
                <div class="breadcrumbs">
                    <div class="container">
                        <h2>Courses</h2>
                        <p>Find the right online course to elevate your career to next level </p>
                    </div>
                </div>


                <section id="courses" class="courses">
                    <br />
                    <div class="container" data-aos="fade-up">

                        <div class="row" data-aos="zoom-in" data-aos-delay="100">

                            {modules.map(({ label, description, date_creation, _id, idowner, statusModule, image, refStudents }) => {
                                if (refStudents == connectedUser.id) {
                                    return (

                                        <>

                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div class="d-flex flex-column flex-lg-row">
                                                        {image != null &&
                                                            <img class="img-fluid rounded-3 me-4 mb-2" alt="..." src={require('../../assets/uploads/module/' + image)} style={{ height: "20px", width: "30px" }} />
                                                        }
                                                        {image == null &&
                                                            <img class="img-fluid rounded-3 me-4 mb-2" src={require('../../assets/img/Courses.jpg')} alt="" style={{ height: "20px", width: "30px" }} />}
                                                       
                                                        <div class="row flex-fill">
                                                            <div class="col-sm-5">
                                                                <h4 class="h5">{label}</h4>
                                                                <span class="badge bg-secondary">WORLDWIDE</span> <span class="badge bg-success">$60K - $100K</span>
                                                            </div>
                                                            <div class="col-sm-4 py-2">
                                                                <span class="badge bg-secondary">REACT</span>
                                                                <span class="badge bg-secondary">NODE</span>
                                                                <span class="badge bg-secondary">TYPESCRIPT</span>
                                                                <span class="badge bg-secondary">JUNIOR</span>
                                                            </div>
                                                            <div class="col-sm-3 text-lg-end">
                                                                <a href="#" class="btn btn-primary stretched-link">Apply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                            })}



                        </div>
                    </div>
                </section>
            </main>
        </div>



    ) : (
        <h1>problem happened</h1>
    )
}
export default RegisterModule
/*
    <div class="pricing-header">
    <h4 class="plan-title">{label}</h4>
    <div >
      {image != null &&
        <img src={require('../../assets/uploads/module/' + image)} alt="" style={{ height: "200px", width: "330px" }} />}
      {image == null &&
        <img src={require('../../assets/img/Courses.jpg')} alt="" style={{ height: "200px", width: "330px" }} />}
    </div>
  </div>*/