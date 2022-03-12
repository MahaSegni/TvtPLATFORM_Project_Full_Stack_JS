import { useState } from "react"
import { queryApi } from "../../utils/queryApi"
import { useHistory } from "react-router-dom";

export default function ForgetPassword() {
    const history = useHistory()
    const [formPass, setFormPass] = useState({
        email: "",
        password: "",
        confirmp: "",
        passwordError: "",
        confirmpError: "",
    })
    const [codeForEmail, setcodeForEmail] = useState({
        sent: false,
        value: "",
        enteredValue: "",
        error: "",
        changePassDisplay: false,
    })
    const [formEmail, setFormEmail] = useState({
        email: "",
        error: ""
    })

    async function onSubmit(e) {
        e.preventDefault()
        if (formEmail.email != "") {
            const [result, err] = await queryApi('user/check/' + formEmail.email, null, "GET", false)
            if (err) {
                console.log(err)
            } else {
                if (result == true) {
                    const [result, err2] = await queryApi('user/sendMail/' + formEmail.email, null, "GET", false)
                    if (err2) {
                        console.log(err2)
                    } else {
                        setcodeForEmail({ ...codeForEmail, sent: true, value: result })
                    }
                }
                else {
                    setFormEmail({ ...formEmail, error: "Mail does not exist" })
                }
            }
        }
        else {
            setFormEmail({ ...formEmail, error: "Your Email address is required" })
        }
    }

    function onChange(e) {
        setFormEmail({ ...formEmail, email: e.target.value })
    }

    const codeVerification = async (e) => {
        e.preventDefault();
        if (codeForEmail.enteredValue == "") {
            setcodeForEmail({ ...codeForEmail, error: "Verification code is required" })
        }
        else if (codeForEmail.value == codeForEmail.enteredValue) {
            setcodeForEmail({ ...codeForEmail, changePassDisplay: true })
            setFormPass({...formPass, email : formEmail.email})
        } else {
            setcodeForEmail({ ...codeForEmail, error: "Incorrect verification code" })
        }
    }
    const onChangeCE = (e) => {
        setcodeForEmail({ ...codeForEmail, [e.target.name]: e.target.value })
    }

    const changePass = async (e) => {
        e.preventDefault()
        if (formPass.password == "") {
            setFormPass({ ...formPass, passwordError: "Enter a new password" })
            return;
        }
        else if (formPass.confirmp != formPass.password) {
            setFormPass({ ...formPass, confirmpError: "Confirm your new password" })
            return;
        }
        else {
            const [res, err] = await queryApi('user/forgetPassword/', formPass, 'PUT', false);
            if(res == 'success'){
                history.push('/signin')
            }
        }
    }

    const onChangePass = (e) => {
        setFormPass({ ...formPass, [e.target.name]: e.target.value })
    }
    return (
        <div>
            {!codeForEmail.sent &&
                <form class="w-50 mx-auto mt-5" onSubmit={onSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => onChange(e)} />
                    </div>
                    <div style={{ textAlign: "center", color: "red" }}>{formEmail.error}</div>
                    <button type="submit" class="ms-auto my-2 btn get-started-btn">Submit</button>
                </form>
            }
            {codeForEmail.sent &&
                <form class="w-50 mx-auto mt-5" onSubmit={codeVerification}>
                    <h4>A verification code was sent to your email address</h4>
                    <div class="form-group">
                        <label for="enteredValue" style={{ float: "left" }}><h5>Verification Code : </h5></label>
                        <input type="text" class="form-control" id="enteredValue" name="enteredValue" value={codeForEmail.enteredValue} placeholder="Enter Your Verification code" onChange={(e) => onChangeCE(e)} />
                    </div>
                    <h5 style={{ color: "red" }}></h5><h5 style={{ textAlign: "center", color: "red" }}>{codeForEmail.error}</h5>
                    <button type="submit" className="btn get-started-btn" style={{ float: "right" }}>Continue</button>
                </form>
            }

            {codeForEmail.changePassDisplay == true &&
                <form class="w-50 mx-auto mt-5" onSubmit={changePass}>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={formPass.password} placeholder="Enter Password" onChange={(e) => onChangePass(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formPass.passwordError}</div>
                    <div class="form-group">
                        <label for="confirmPassword1">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword1" name="confirmp" value={formPass.confirmp} placeholder="Confirm your Password" onChange={(e) => onChangePass(e)} />
                    </div>
                    <div style={{ color: "red" }}>{formPass.confirmpError}</div>
                    <button type="submit" className="btn get-started-btn" style={{ float: "right" }}>Continue</button>
                </form>
            }
        </div>


    )
}