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
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
export default function Profile(props) {

    const history = useHistory();
    var connectedUser = useSelector(selectConnectedUser);
    const [addCP, setAddCP] = useState({
        id: connectedUser.id,
        inputDisplay: false,
        inputValue: "",
    })
    const [updateCP, setUpdateCP] = useState({
        id: connectedUser.id,
        inputDisplay: false,
        inputValue: "",
        cp: ""
    })
    const [addIP, setAddIP] = useState({
        id: connectedUser.id,
        listDisplay: false,
        IPid: "",
    })
    const [openModal, setOpenModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [userIPs, err, reloadUserIPs] = useApi('interestpoint/userInterestPoints/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    const [userCPs, err2, reloadUserCPs] = useApi('user/coursepreferences/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    const [allIPs, err3, reloadAllIPs] = useApi('interestpoint/getAll/', null, 'GET', false);
    const [otherIPs, setOtherIPs] = useState([])
    async function onRemove(ip) {
        const [, err] = await queryApi('interestpoint/rvFromUser/' + connectedUser.id + '/' + ip._id, null, 'GET', false, connectedUser.token);
        setAddIP({ ...addIP, listDisplay: false, IPid: "" })
        reloadUserIPs()
        reloadAllIPs();
    }

    async function onRemoveCP(cp) {
        const [, err] = await queryApi('user/removeCP/' + connectedUser.id + '/' + cp, null, 'GET', false, connectedUser.token);
        reloadUserCPs();

    }

    function openAddIP() {
        let myArray = allIPs.filter(x => !userIPs.find(u => (x._id == u._id)));
        setOtherIPs(myArray)
        setAddIP({ ...addIP, listDisplay: true, IPid :myArray[0]._id })


    }
    function onSelectIP(e) {
        setAddIP({ ...addIP, IPid: e.target.value })
    }
    async function addIPtoUser() {
        const [, err] = await queryApi('interestpoint/addToUser/', addIP, 'PUT', false, connectedUser.token);
        setAddIP({ ...addIP, listDisplay: false, IPid: "" })
        reloadUserIPs();
        reloadAllIPs();
        console.log(addIP)
    }

    function closeAddIP() {
        setAddIP({ ...addIP, listDisplay: false })
    }

    function openAddCP() {
        setAddCP({ ...addCP, inputDisplay: true })
    }

    function onChangeCP(e) {
        setAddCP({ ...addCP, inputValue: e.target.value })
    }

    async function handleKeyPress(event) {
        if (event.key === 'Enter') {
            const [, err] = await queryApi('user/addCP/', addCP, 'POST', false, connectedUser.token);
            setAddCP({ ...addCP, inputDisplay: false, inputValue: "" })
            reloadUserCPs();
        }
    }
    function closeAddCP() {
        setAddCP({ ...addCP, inputDisplay: false, inputValue: "" })
    }

    function openUpdateCP(cp) {
        setUpdateCP({ ...addCP, inputDisplay: true, cp: cp, inputValue: cp })
    }
    function onUpdateCPinput(e) {
        setUpdateCP({ ...updateCP, inputValue: e.target.value })
    }
    async function handleKeyPressUpdate(event) {
        if (event.key === 'Enter') {
            const [, err] = await queryApi('user/updateCP/', updateCP, 'PUT', false, connectedUser.token);
            setUpdateCP({ ...addCP, inputDisplay: false, cp: "" })
            reloadUserCPs();
        }
    }
    function closeUpdateCP() {
        setUpdateCP({ ...addCP, inputDisplay: false, cp: "" })
    }


    return openModal == true ? (<UpdateUser closeModal={setOpenModal} />) :
        openPasswordModal == true ? (<UserSettings closeModal={setOpenPasswordModal} />) : (
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
                                            <h3 className="my-3">My Library</h3>
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
                                            <h3 className="my-3">Points of Interests</h3>
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
                                                            {<button onClick={() => onRemove(ip)} className="btn get-started-btn" style={{ float: "right", background: "#FF0000" }} href="#"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </>
                                            ))}
                                            <div className="row">
                                                {allIPs && addIP.listDisplay == true &&
                                                    <div className='col-6'>
                                                        <select class="form-select" aria-label="Default select example" onChange={(e) => onSelectIP(e)}>
                                                            {otherIPs.map((ip, index) => (
                                                                <option value={ip._id}>{ip.value}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                }
                                                <div className={addIP.listDisplay == true ? 'col' : '-6'}>
                                                    {addIP.listDisplay == false &&
                                                        <button onClick={() => openAddIP()} className="btn get-started-btn" style={{ float: "right" }}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                                                    }
                                                    {addIP.listDisplay == true &&
                                                        <>
                                                            <button onClick={() => closeAddIP()} className="btn get-started-btn" style={{ float: "right", background: "#FF0000" }}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                                                            <button onClick={() => addIPtoUser()} className="btn get-started-btn" style={{ float: "right" }}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="card mb-3">
                                        <div className="mx-auto my-auto">
                                            <h3 className="my-3">Course Prefernces</h3>
                                        </div>
                                        <hr />
                                        <div className="card-body">
                                            {userCPs && userCPs.map((cp, index) => (
                                                <>
                                                    <div className="row">
                                                        {updateCP.cp !== cp &&
                                                            <div className="col-sm-6">
                                                                <h6 className="mt-2">{cp}</h6>
                                                            </div>
                                                        }
                                                        {updateCP.inputDisplay == true && updateCP.cp == cp &&
                                                            <>
                                                                
                                                                <div className='col-9'>
                                                                    <input type="text" className="form-control" id="inputValue" name="inputValue" value={updateCP.inputValue} placeholder="Enter a new course preference" onChange={(e) => onUpdateCPinput(e)} onKeyPress={(e) => handleKeyPressUpdate(e)} />
                                                                </div>
                                                                <div className='col-3'>
                                                                    <button onClick={() => closeUpdateCP()} className="btn get-started-btn" style={{ float: "right", background: "#FF0000" }}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                                                                </div>

                                                            </>
                                                        }
                                                        {updateCP.cp !== cp &&
                                                            <div className="col-sm-6">
                                                                {<button onClick={() => onRemoveCP(cp)} className="btn get-started-btn" style={{ float: "right", background: "#FF0000" }} href="#"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>}
                                                                {<button onClick={() => openUpdateCP(cp)} className="btn get-started-btn" style={{ float: "right" }} href="#"><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon></button>}
                                                            </div>
                                                        }
                                                    </div>
                                                    <hr />
                                                </>
                                            ))}
                                            <div className="row">
                                                {addCP.inputDisplay == true &&
                                                    <>
                                                        <div className='col-9'>
                                                            <input type="text" className="form-control" id="inputValue" name="inputValue" value={addCP.inputValue} placeholder="Enter a new course preference" onChange={(e) => onChangeCP(e)} onKeyPress={(e) => handleKeyPress(e)} />
                                                        </div>
                                                        <div className='col-3'>
                                                            <button onClick={() => closeAddCP()} className="btn get-started-btn" style={{ float: "right",background: "#FF0000" }}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                                                        </div>
                                                    </>
                                                }
                                                {!addCP.inputDisplay == true &&
                                                    <div className={addCP.inputDisplay == true ? 'col' : '-3'}>
                                                        <button onClick={() => openAddCP()} className="btn get-started-btn" style={{ float: "right" }}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                                                    </div>
                                                }
                                            </div>

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