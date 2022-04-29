import React, { useEffect, useState } from "react"
import "../../assets/css/Modal.css"
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi"
import { chnageConenctedUser } from '../../Redux/slices/sessionSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
export default function UpdateUser({ closeModal }) {
    const [uploadImage, setUploadImage] = useState({
        image: ""
    })
    const onChangeFile = (e) => {
        setUploadImage({ ...uploadImage, image: e.target.files[0] })
    }
    const dispatch = useDispatch();
    var connectedUser = useSelector(selectConnectedUser);
    const [formErrors, setFormErrors] = useState({})

    const [formData, setFormData] = useState({
        id: connectedUser.id,
        name: connectedUser.name,
        lastname: connectedUser.lastName,
        birthDate: connectedUser.birthDate,
        phone: connectedUser.phone,

    })
    const deleteDate = () => {
        setFormData({ ...formData, birthDate: "" })
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        

    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formData))

    }

    const validate = (values) => {
        const errors = {};
        var onlyNumbers = /^-?\d*\.?\d*$/

        let err = false;
        if (!values.name) {
            errors.name = "Name is required";
            err = true;
        }
        if (!values.lastname) {
            errors.lastname = "Last Name is required";
            err = true;
        }
        if (!onlyNumbers.test(values.phone) && values.phone != null) {
            errors.phone = "Only numbers"
            err = true;
        }
        if (!err) {
            updateUser()
        }
        return errors;
    }
    const updateUser = async () => {
        if (uploadImage.image != "") {
            const [imageResult, err] = await queryApi('user/uploadPicture/' + connectedUser.id, uploadImage, "PUT", true, connectedUser.token)
            const [result, err2] = await queryApi('user/update', formData, "PUT", false, connectedUser.token)
            if (!err2) {
                let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: imageResult, token: result.token, connectionType: connectedUser.connectionType, pictureType: "external" }
                dispatch(chnageConenctedUser(userResult))
            }
            closeModal(false)
        }
        else {
            const [result, err2] = await queryApi('user/update', formData, "PUT", false, connectedUser.token)
            if (!err2) {
                let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token, connectionType: connectedUser.connectionType, pictureType: connectedUser.pictureType }
                dispatch(chnageConenctedUser(userResult))
                closeModal(false)
            }
        }
    }
    return (

        <div className="modalBackground-user">
            <div className="modalContainer-user col-sm-10 offset-md-1 my-5">
                <div className="title my-5">
                    <h1>Your Account's General Informations</h1>
                </div>
                <div className="body row">
                    <div className="col-md-6">
                        <form class="w-75 mx-auto" onSubmit={onSubmit}>
                            <div class="form-group">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" value={formData.name} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.name}</h5>

                            <div class="form-group">
                                <input type="text" class="form-control" id="lname" name="lastname" placeholder="Enter Last Name" value={formData.lastname} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.lastname}</h5>

                            <div class="form-group">
                                <input type="date" class="form-control" id="bdate" name="birthDate" value={formData.birthDate} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.birthDate}</h5>

                            <div class="form-group">
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.phone}</h5>


                            <div className="mt-5">
                                <button onClick={() => closeModal(false)} className="btn btn-template-user me-3" id="cancelBtn">Cancel</button>
                                <button type="submit" className="btn btn-template-user" >Submit</button>
                            </div>

                        </form >
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center text-center">
                            <div>
                                {connectedUser.pictureType == "external" &&
                                    <img src={connectedUser.image} className="rounded-circle"
                                        width="300" referrerpolicy="no-referrer"></img>
                                }
                                {connectedUser.pictureType == "internal" && <img src={require('../../assets/uploads/user/' + connectedUser.image)} alt="Admin" className="rounded-circle"
                                    width="300" />
                                }
                                <input type="file" id="profilepicture" name='image' onChange={(e) => onChangeFile(e)} />
                                <label for="profilepicture" id="uploadPhotoBtn"><FontAwesomeIcon icon={faImage}></FontAwesomeIcon></label>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}