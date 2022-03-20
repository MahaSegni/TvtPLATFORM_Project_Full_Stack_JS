import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi"
import { useApi } from "../../utils/useApi"
import { useSelector } from 'react-redux';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

export default function InterestPoints() {
    const history = useHistory()
    useEffect(()=> {
        if(connectedUser.type != "admin"){
            history.push('/profile')
        }
    },[])
    var connectedUser = useSelector(selectConnectedUser);
    const [allIPs, err, reloadAllIPs] = useApi('interestpoint/getAll/', null, 'GET', false);
    const [addInput, setAddInput] = useState({
        id: connectedUser.id,
        inputValue: "",
        inputDisplay: false
    })
    const [updateInput, setUpdateInput] = useState({
        id: connectedUser.id,
        inputValue: "",
        ipId: ""
    })
    const openAddIP = () => {
        setAddInput({ ...addInput, inputDisplay: true })
    }
    const openUpdateInput = (ip) => {
        setUpdateInput({ ...updateInput, ipId: ip._id, inputValue:ip.value })

    }
    const deleteIp = async (id) => {
        const [res, err] = await queryApi('interestpoint/deleteIP/' + connectedUser.id + '/' + id, null, 'GET', false, connectedUser.token);
        setAddInput({ ...addInput, inputDisplay: false, inputValue: "" })
        reloadAllIPs();
    }
    const onAddIPinput = (e) => {
        setAddInput({ ...addInput, inputValue: e.target.value })
    }
    
    const onUpdateIPinput = (e) => {
        setUpdateInput({ ...updateInput, inputValue: e.target.value })
    }
    const closeAddIP = () => {
        setAddInput({ ...addInput, inputDisplay: false })
    }
    async function handleKeyPressAdd(event) {
        if (event.key === 'Enter') {
            const [res, err] = await queryApi('interestpoint/addIP/', addInput, 'POST', false, connectedUser.token);
            setAddInput({ ...addInput, inputDisplay: false, inputValue: "" })
            reloadAllIPs();
        }
    }

    const closeUpdateInput = () =>{

        setUpdateInput({ ...updateInput, ipId: "" })
    }
    async function handleKeyPressUpdate(event) {
        if (event.key === 'Enter') {
        const [res, err] = await queryApi('interestpoint/updateIP/', updateInput, 'PUT', false, connectedUser.token);
        setUpdateInput({ ...updateInput, ipId:"", inputValue: "" })
        reloadAllIPs();
        }
    }
    return (

        <div className='container mt-5'>

            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Value</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allIPs && allIPs.map((ip, index) => (
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="ms-3">
                                        <p class="fw-normal mb-1">{ip._id}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {ip._id != updateInput.ipId &&
                                    <p class="fw-normal mb-1">{ip.value}</p>
                                }
                                {ip._id == updateInput.ipId &&
                                    <input type="text" className="form-control" id="inputValue" name="inputValue" value={updateInput.inputValue} placeholder="Enter a new Interest Point" onChange={(e) => onUpdateIPinput(e)} onKeyPress={(e) => handleKeyPressUpdate(e)} />
                                }
                            </td>
                            <td>
                                {ip._id != updateInput.ipId &&
                                    <button type="submit" className="btn get-started-btn ms-0" onClick={() => {
                                        openUpdateInput(ip)
                                    }}><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon></button>
                                }
                                {ip._id == updateInput.ipId &&
                                    <button type="submit" className="btn get-started-btn ms-0" style={{ background: "#FF0000" }} onClick={() => {
                                        closeUpdateInput()
                                    }}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                                }
                            </td>
                            <td>
                                <button type="submit" className="btn get-started-btn ms-0" style={{ background: "#FF0000" }} onClick={() => {
                                    deleteIp(ip._id)
                                }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        {addInput.inputDisplay == false &&
                            <td colSpan={4} style={{ textAlign: "center" }}>
                                <button onClick={() => openAddIP()} className="btn get-started-btn"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                            </td>
                        }
                        {addInput.inputDisplay == true &&

                            <>
                                <td colSpan={3}>
                                    <div >
                                        <input type="text" className="form-control" id="inputValue" name="inputValue" value={addInput.inputValue} placeholder="Enter a new Interest Point" onChange={(e) => onAddIPinput(e)} onKeyPress={(e) => handleKeyPressAdd(e)} />
                                    </div>

                                </td>
                                <td colSpan={1}>
                                    <div className='col-3'>
                                        <button onClick={() => closeAddIP()} className="btn get-started-btn ms-0" style={{ background: "#FF0000" }}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                                    </div>
                                </td>
                            </>
                        }
                    </tr>
                </tbody>
            </table>


        </div >
    )
}