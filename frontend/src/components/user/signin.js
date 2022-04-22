import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { queryApi } from "../../utils/queryApi"
import { chnageConenctedUser } from '../../Redux/slices/sessionSlice';
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Cookies from 'js-cookie'
export default function Signin(props) {
  

  const dispatch = useDispatch();
  const history = useHistory();
  const [errorDisplay, setErrorDisplay] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const [result, err] = await queryApi('user/signin', formData, "POST", false)

    if ((result == 'Incorrect password') || (result == 'Incorrect email') || (result == 'You are Trying to connect with a google account that does not have a password, click Forgot Password to create one') || (result == 'Account Banned')) {
      setErrorDisplay(result)
    } else {
      if (result.image.startsWith('https')) {
        let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token, connectionType: "default", pictureType: "external" }
        dispatch(chnageConenctedUser(userResult))
      }
      else {
        let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token, connectionType: "default", pictureType: "internal" }
        dispatch(chnageConenctedUser(userResult))
      }
      window.localStorage.setItem("chatbotsession",JSON.stringify([{text:"Hello "+result.name +" "+ result.lastName ,own:false},{text:"Do you want to answer some questions? " ,own:false,responses:[{text:"yes",value:0},{text:"no",value:.0}]}]));
      history.push('/')
      Cookies.set('connected', 'true', { expires: 1 })
    }

  }
  const handleFailure = (result) => {
    alert(result);
  }
  const handleLogin = async (googleData) => {
    const [resultGoogleLogin, err] = await queryApi('user/googleLogin', JSON.stringify({
      token: googleData.tokenId,
    }), "POST", false)
    if (resultGoogleLogin) {
      if (resultGoogleLogin == "Account Banned") {
        setErrorDisplay(resultGoogleLogin)
      }
      else {
        if (resultGoogleLogin.image.startsWith('https')) {
          let googleUserResult = { id: resultGoogleLogin._id, email: resultGoogleLogin.email, type: resultGoogleLogin.typeUser, name: resultGoogleLogin.name, lastName: resultGoogleLogin.lastName, phone: resultGoogleLogin.phone, birthDate: resultGoogleLogin.birthDate, image: resultGoogleLogin.image, token: resultGoogleLogin.token, connectionType: "google", pictureType: "external" }
          dispatch(chnageConenctedUser(googleUserResult))
          
         }
        else {
          let googleUserResult = { id: resultGoogleLogin._id, email: resultGoogleLogin.email, type: resultGoogleLogin.typeUser, name: resultGoogleLogin.name, lastName: resultGoogleLogin.lastName, phone: resultGoogleLogin.phone, birthDate: resultGoogleLogin.birthDate, image: resultGoogleLogin.image, token: resultGoogleLogin.token, connectionType: "google", pictureType: "internal" }
          dispatch(chnageConenctedUser(googleUserResult))
          
        }
        window.localStorage.setItem("chatbotsession",JSON.stringify([{text:"Hello "+resultGoogleLogin.name +" "+ resultGoogleLogin.lastName ,own:false},{text:"Do you want to answer some questions? " ,own:false,responses:[{text:"yes",value:0},{text:"no",value:.0}]}]));
        history.push('/')
        Cookies.set('connected', 'true', { expires: 1 })
      }
    }
  }
  return (
    <div class="my-5">
      <h1 class="logo mx-auto" style={{ textAlign: "center", color: "#5fcf80" }}>Sign In</h1>
      <form class="w-50 mx-auto" onSubmit={onSubmit}>

        <div class="form-group">
          <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" onChange={(e) => onChange(e)} />
        </div>
        <div class="form-group my-2">
          <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" onChange={(e) => onChange(e)}  onKeyPress={(e) => {  if (e.key === 'Enter') {onSubmit();} }} />
        </div>
        <Link to={'/forgetPassword'}>Forgot Password</Link>
        <div style={{ textAlign: "center", color: "red" }}>{errorDisplay}</div>
        <button type="submit" class="ms-auto my-2 btn btn-template-user">Submit</button>
        <div style={{ float: "right" }}>
          <GoogleLogin
            clientId={process.env.REACT_APP_TVT_PLATFORM_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
        </div>
      </form>

    </div>
  );
}