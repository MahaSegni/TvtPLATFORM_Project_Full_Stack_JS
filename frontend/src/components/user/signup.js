import { useEffect,useState } from "react";
import { queryApi } from "../../utils/queryApi"
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useSelector } from 'react-redux';
export default function Signup(props) {
   
    const history = useHistory();
    var connectedUser = useSelector(selectConnectedUser);
    useEffect(() => {
        if (connectedUser.type != "disconnected") {
            history.push('/profile')
        }
    }, [])
    const [errorDisplay, setErrorDisplay] = useState("");
    const [formErrors, setFormErrors] = useState({})

    const [codeForEmail, setcodeForEmail] = useState({
        sent: false,
        value: "",
        enteredValue: "",
        error: "",
    })

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        birthDate: "",
        phone: "",
        email: "",
        password: "",
        confirmp: "",
        type: "user",

    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formData))
    }

    const validate = (values) => {
        const errors = {};
        const isContainsUppercase = /^(?=.*[A-Z])/;
        const isContainsLowercase = /^(?=.*[a-z])/;
        const isContainsNumber = /^(?=.*[0-9])/;
        const isValidLength = /^.{8,16}$/;
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
        if (!values.email) {
            errors.email = "Email is required";
            err = true;
        }
        if(!onlyNumbers.test(values.phone)){
            errors.phone = "Only numbers"
            err = true;
        }
        if ((!isContainsUppercase.test(values.password))||(!isContainsLowercase.test(values.password))||(!isContainsNumber.test(values.password))||(!isValidLength.test(values.password))) {
            errors.password =  "Password must contain betwwen 8 and 16 characters and at least 1 Upper Case character, 1 Lower Case character, 1 number";
            err = true;
        }
        if (!values.password) {
            errors.password = "Password is required";
            err = true;
        }
        if (values.password != values.confirmp) {
            errors.confirmp = "Confirm your password please";
            err = true;
        }

        if (!err) {
            addUser()
        }
        return errors;
    }

    const addUser = async () => {
        const [result, err] = await queryApi('user/check/' + formData.email, null, "GET", false)
        if (err) {
            console.log(err)
        } else {
            if (result == true) {
                setErrorDisplay('Mail already exists')
            }
            else {
                const [result, err2] = await queryApi('user/sendMail/'+formData.email,null, "GET", false)
                if (err2) {
                    console.log(err2)
                } else {
                    setcodeForEmail({ ...codeForEmail, sent: true, value: result })
                }
            }
        }
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
            const [result, err] = await queryApi('user/signup', formData, "POST", false)
            if(!err){
                history.push('signin')
            }
        } else {
            setcodeForEmail({ ...codeForEmail, error: "Incorrect verification code" })
        }
    }

    return (
        <div class="my-5">
            <h1 class="logo mx-auto" style={{ textAlign: "center", color: "#5fcf80" }}>Sign Up</h1>
            {!codeForEmail.sent &&
                <form class="w-50 mx-auto" onSubmit={onSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" value={formData.name} onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.name}</div>

                    <div class="form-group my-2">
                        <input type="text" class="form-control" id="lname" name="lastname" placeholder="Enter Last Name" value={formData.lastname} onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.lastname}</div>

                    <div class="form-group my-2">
                        <input type="date" class="form-control" id="bdate" name="birthDate" value={formData.birthDate} onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.birthDate}</div>

                    <div class="form-group my-2">
                        <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.phone}</div>

                    <div class="form-group my-2">
                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" value={formData.email} aria-describedby="emailHelp" placeholder="Enter Email" onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.email}</div>

                    <div class="form-group my-2">
                        <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={formData.password} placeholder="Enter Password" onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.password}</div>
                    <div class="form-group my-2">
                        <input type="password" class="form-control" id="confirmPassword1" name="confirmp" value={formData.confirmp} placeholder="Confirm your Password" onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formErrors.confirmp}</div>
                    <div style={{ textAlign: "center", color: "red" }}>{errorDisplay}</div>
                    <button type="submit" class="ms-auto my-2 btn btn-template-user">Submit</button>

                </form >}

            {codeForEmail.sent &&
                <form class="w-50 mx-auto mt-5" onSubmit={codeVerification}>
                    <h4>A verification code was sent to your email address</h4>
                    <div class="form-group">
                        <label for="enteredValue" style={{ float: "left" }}><h5>Verification Code : </h5></label>
                        <input type="text" class="form-control" id="enteredValue" name="enteredValue" value={codeForEmail.enteredValue} placeholder="Enter your verification code" onChange={(e) => onChangeCE(e)} />
                    </div>
                    <h5 style={{ color: "red" }}></h5><h5 style={{ textAlign: "center", color: "red" }}>{codeForEmail.error}</h5>
                    <button type="submit" className="btn btn-template-user" style={{ float: "right" }}>Submit</button>
                </form>
            }
        </div >
    );
}