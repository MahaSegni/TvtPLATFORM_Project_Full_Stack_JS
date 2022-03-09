import React from 'react';
import { useHistory } from "react-router-dom";
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi"
import { queryApi } from "../../utils/queryApi"
import { useSelector } from 'react-redux';
import { lazy, useEffect, useState } from "react";
import UpdateUser from "./updateUser";
import UserSettings from "./userSettings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
export default function Profile(props) {

    const history = useHistory()
    var connectedUser = useSelector(selectConnectedUser);
    const [openModal, setOpenModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [userIPs, err, reloadUserIPs] = useApi('interestpoint/userInterestPoints/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    const [userCPs, err2, reloadUserCPs] = useApi('user/coursepreferences/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    async function onRemove(ip) {
        const [, err] = await queryApi('interestpoint/rvFromUser/' + connectedUser.id + '/' + ip._id, null, 'GET', false, connectedUser.token);
        reloadUserIPs()
    }
    async function onRemoveCP(cp) {
        const [, err] = await queryApi('user/removeCP/' + connectedUser.id + '/' + cp, null, 'GET', false, connectedUser.token);
        reloadUserCPs()
    }
    async function onUpdateCP(cp) {

    }

    return openModal == true ? (<UpdateUser closeModal={setOpenModal} />):
    openPasswordModal == true ?(<UserSettings closeModal={setOpenPasswordModal} />):(
        <>     
            <div id="main" data-aos="fade-in" className="mt-5" >
                <div className="container">
                    <div className="main-body">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={require('../../assets/uploads/user/' + connectedUser.image)} alt="Admin" className="rounded-circle"
                                                width="242" />
                                            <div className="mt-3">
                                                <h4>{connectedUser.name} {connectedUser.lastName} </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {connectedUser.name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {connectedUser.lastName}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Birth date</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {connectedUser.birthDate.substring(0, 10)}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {connectedUser.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone Number</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {connectedUser.phone}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mx-auto" style={{ float: "right" }}>
                                            <button type="submit" className="btn get-started-btn" onClick={() => {
                                                setOpenModal(true)
                                            }}><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon></button>
                                        </div>
                                        <div className="mx-auto" style={{ float: "right" }}>
                                            <button type="submit" className="btn get-started-btn" onClick={() => {
                                                setOpenPasswordModal(true)
                                            }}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 my-3">
                                <div className="card mb-3">
                                    <div className="mx-auto my-auto">
                                        <h3 style={{ color: "#5fcf80" }} className="my-3">My Library</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <p>To do later</p>
                                                <p>To do later</p>
                                                <p>To do later</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 my-3">
                                <div className="card mb-3">
                                    <div className="mx-auto my-auto">
                                        <h3 style={{ color: "#5fcf80" }} className="my-3">Points of Interests</h3>
                                    </div>
                                    <hr />
                                    <div className="card-body">
                                        {userIPs && userIPs.map((ip, index) => (
                                            <>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mt-2">{ip.value}</h6>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        {<button onClick={() => onRemove(ip)} className="btn get-started-btn" style={{ float: "right" }} href="#"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>}
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 my-3">
                                <div className="card mb-3">
                                    <div className="mx-auto my-auto">
                                        <h3 style={{ color: "#5fcf80" }} className="my-3">Course Prefernces</h3>
                                    </div>
                                    <hr />
                                    <div className="card-body">
                                        {userCPs && userCPs.map((cp, index) => (
                                            <>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mt-2">{cp}</h6>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        {<button onClick={() => onRemoveCP(cp)} className="btn get-started-btn" style={{ float: "right" }} href="#"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>}
                                                        {<button onClick={() => onUpdateCP(cp)} className="btn get-started-btn" style={{ float: "right" }} href="#"><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon></button>}
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div >
            </>
            

        );
}