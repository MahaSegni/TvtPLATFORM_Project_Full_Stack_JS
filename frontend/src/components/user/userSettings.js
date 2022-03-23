import React, { useState } from "react"
import "../../assets/css/Modal.css"
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi"
import { chnageConenctedUser } from '../../Redux/slices/sessionSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function UserSettings({ closeModal }) {
    const history = useHistory()

    var connectedUser = useSelector(selectConnectedUser);

    const dispatch = useDispatch();
    const [errorDisplay, setErrorDisplay] = useState("");
    const [errorEmailDisplay, setErrorEmailDisplay] = useState("");
    const [errorDeletelDisplay, setErrorDeleteDisplay] = useState("");
    const [secondFormErrors, setsecondFormErrors] = useState({})
    const [emailFormErrors, setEmailFormErrors] = useState({})
    const [deleteFormErrors, setDeleteFormErrors] = useState({})
    const [formDelete, setFormDelete] = useState({
        id: connectedUser.id,
        currentPassword: ""
    })
    const [codeForEmail, setcodeForEmail] = useState({
        sent: false,
        value: "",
        enteredValue: "",
        error: "",
    })
    const [formPassword, setFormPassword] = useState({
        id: connectedUser.id,
        currentPassword: "",
        newPassword: "",
        passwordConfirmation: "",
    })
    const [formEmail, setFormEmail] = useState({
        id: connectedUser.id,
        email: "",
        currentPassword: "",
    })

    const onChangeDelete = (e) => {
        setFormDelete({ ...formDelete, [e.target.name]: e.target.value })
    }

    const onSubmitDelete = (e) => {
        e.preventDefault();
        setDeleteFormErrors(validateDelete(formDelete))
    }

    const onChangePassword = (e) => {

        setFormPassword({ ...formPassword, [e.target.name]: e.target.value })
    }

    const onSubmitPassword = (e) => {
        e.preventDefault();
        setsecondFormErrors(validate(formPassword))
    }

    const onChangeEmail = (e) => {

        setFormEmail({ ...formEmail, [e.target.name]: e.target.value })
    }

    const onSubmitEmail = (e) => {
        e.preventDefault();
        setEmailFormErrors(validateEmail(formEmail))
    }

    const onChangeCE = (e) => {
        setcodeForEmail({ ...codeForEmail, [e.target.name]: e.target.value })
    }

    const codeVerification = async (e) => {
        e.preventDefault();
        if (codeForEmail.enteredValue == "") {
            setcodeForEmail({ ...codeForEmail, error: "Verification code is required" })
        }
        else if (codeForEmail.value == codeForEmail.enteredValue) {
            const [result, err2] = await queryApi('user/changeEmailAction', formEmail, "PUT", false, connectedUser.token)
            if (result) {
                let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token, connectionType: connectedUser.connectionType, pictureType: connectedUser.pictureType }
                dispatch(chnageConenctedUser(userResult))
                closeModal(false)
            }
        } else {
            setcodeForEmail({ ...codeForEmail, error: "Incorrect verification code" })
        }
    }


    const validateDelete = (values) => {
        const errors = {};
        let err = false;
        if (!values.currentPassword) {
            errors.currentPassword = "Your current Password is required";
            err = true;
        }
        if (!err) {
            deleteUser()
        }
        return errors;
    }


    const deleteUser = async () => {
        const [result, err2] = await queryApi('user/deleteUser', formDelete, "POST", false, connectedUser.token)

        if (result == "Incorrect Current password") {
            setErrorDeleteDisplay(result)
        }
        else if (result == "success") {
            history.push('/signin')
            dispatch(chnageConenctedUser({ type: "disconnected" }))

        }
    }

    const validateEmail = (values) => {
        const errors = {};
        let err = false;
        if (!values.email) {
            errors.email = "New Email address is required";
            err = true;
        }
        if (!values.currentPassword) {
            errors.currentPassword = "Your current Password is required";
            err = true;
        }
        if (!err) {
            updateEmail()
        }
        return errors;
    }
    const updateEmail = async () => {
        const [resultCheck, err] = await queryApi('user/check/' + formEmail.email, null, "GET", false)
        if (resultCheck == false) {
            const [result, err2] = await queryApi('user/changeEmail', formEmail, "POST", false, connectedUser.token)
            if (result == "Incorrect Current password") {
                setErrorEmailDisplay(result)
            }
            else if (result) {
                setcodeForEmail({ ...codeForEmail, sent: true, value: result })
            }
        } else {
            setErrorEmailDisplay("An account with this email address already exists")
        }
    }

    const validate = (values) => {
        const errors = {};
        const isContainsUppercase = /^(?=.*[A-Z])/;
        const isContainsLowercase = /^(?=.*[a-z])/;
        const isContainsNumber = /^(?=.*[0-9])/;
        const isValidLength = /^.{8,16}$/;
        let err = false;

        if (!values.currentPassword) {
            errors.currentPassword = "Your current Password is required";
            err = true;
        }
        if ((!isContainsUppercase.test(values.newPassword)) || (!isContainsLowercase.test(values.newPassword)) || (!isContainsNumber.test(values.newPassword)) || (!isValidLength.test(values.newPassword))) {
            errors.newPassword = "Password must contain betwwen 8 and 16 characters and at least 1 Upper Case character, 1 Lower Case character, 1 number";
            err = true;
        }
        if (!values.newPassword) {
            errors.newPassword = "Enter a new password";
            err = true;
        }
        if (values.newPassword != values.passwordConfirmation) {
            errors.passwordConfirmation = "Confirm your password please";
            err = true;
        }

        if (!err) {
            updateUser()
        }
        return errors;
    }
    const updateUser = async () => {
        const [result, err2] = await queryApi('user/changePassword', formPassword, "PUT", false, connectedUser.token)
        if (err2) {
            console.log(err2)
        } else {
            if (result == "Incorrect Current password") {
                setErrorDisplay(result)
            }
            else if (result == "success") {
                closeModal(false)
            }
        }
    }
    return (
        <div className="modalBackground ">
            <div className="modalContainer col-sm-10 offset-md-1 mt-2">
                <div className="title">
                    <h1>Settings</h1>
                </div>
                {connectedUser.connectionType == "default" &&
                    <>
                        <div id="accordion" style={{ display: "block" }}>

                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Password Settings
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <div className="body">
                                            <form class="w-75 mx-auto" onSubmit={onSubmitPassword}>
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="currentPassword" name="currentPassword" value={formPassword.currentPassword} placeholder="Enter Password" onChange={(e) => onChangePassword(e)} />
                                                </div>
                                                <h5 style={{ color: "red" }}>{secondFormErrors.currentPassword}</h5>

                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="newPassword" name="newPassword" value={formPassword.newPassword} placeholder="Enter Password" onChange={(e) => onChangePassword(e)} />
                                                </div>
                                                <h5 style={{ color: "red" }}>{secondFormErrors.newPassword}</h5>

                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="passwordConfirmation" name="passwordConfirmation" value={formPassword.passwordConfirmation} placeholder="Confirm your Password" onChange={(e) => onChangePassword(e)} />
                                                </div>
                                                <h5 style={{ color: "red" }}>{secondFormErrors.passwordConfirmation}</h5>
                                                <h5 style={{ textAlign: "center", color: "red" }}>{errorDisplay}</h5>
                                                <div className="mt-5">
                                                    <button type="submit" className="btn get-started-btn" >Continue</button>
                                                </div>
                                            </form >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button class="btn collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Email Settings
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body">
                                        <div className="body">

                                            {!codeForEmail.sent &&
                                                <form class="w-75 mx-auto" onSubmit={onSubmitEmail}>

                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="email" name="email" value={formEmail.email} placeholder="Enter your new email address" onChange={(e) => onChangeEmail(e)} />
                                                    </div>
                                                    <h5 style={{ color: "red" }}>{emailFormErrors.email}</h5>
                                                    <div class="form-group">
                                                        <input type="password" class="form-control" id="currentPassword" name="currentPassword" value={formEmail.currentPassword} placeholder="Confirm your Password" onChange={(e) => onChangeEmail(e)} />
                                                    </div>
                                                    <h5 style={{ color: "red" }}>{emailFormErrors.currentPassword}</h5>
                                                    <h5 style={{ textAlign: "center", color: "red" }}>{errorEmailDisplay}</h5>
                                                    <div className="mt-5">
                                                        <button type="submit" className="btn get-started-btn" >Continue</button>
                                                    </div>

                                                </form >
                                            }

                                            {codeForEmail.sent &&
                                                <form class="w-75 mx-auto" onSubmit={codeVerification}>
                                                    <h4>A verification code was sent to you new email address</h4>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="enteredValue" name="enteredValue" value={codeForEmail.enteredValue} placeholder="Enter Your Verification code" onChange={(e) => onChangeCE(e)} />

                                                    </div>
                                                    <h5 style={{ color: "red" }}></h5><h5 style={{ textAlign: "center", color: "red" }}>{codeForEmail.error}</h5>
                                                    <button type="submit" className="btn get-started-btn">Continue</button>
                                                </form>

                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header" id="headingThree">
                                    <h5 class="mb-0">
                                        <button class="btn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Account deletion
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body">
                                        <div className="body">
                                            <form class="w-75 mx-auto" onSubmit={onSubmitDelete}>
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="currentPassword" name="currentPassword" value={formDelete.currentPassword} placeholder="Confirm your Password" onChange={(e) => onChangeDelete(e)} />
                                                </div>
                                                <h5 style={{ color: "red" }}>{deleteFormErrors.currentPassword}</h5>
                                                <h5 style={{ textAlign: "center", color: "red" }}>{errorDeletelDisplay}</h5>
                                                <div className="mt-5">
                                                    <button type="submit" className="btn get-started-btn" >Continue</button>
                                                </div>
                                            </form >
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>}
                {connectedUser.connectionType == "google" &&
                    <div className="alert alert-warning mt-5 mx-5" role="alert">
                        You are now connected with your Google credentials, please switch to your own credentials (email and password)
                        in order to procceed to your profile settings. If you don't already have a password, please sign out, click on
                        "ForgetPassword" and create one.
                        <br/>
                        <br/>
                        NOTE : After creating a password you can continue to sign in with your Google Account. 
                    </div>
                }
                <div className="my-1" style={{ textAlign : "center" }}>
                    <button onClick={() => closeModal(false)} className="btn get-started-btn" id="cancelBtn">Cancel</button>
                </div>
            </div>
        </div>
    )
}