import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { queryApi } from "../../utils/queryApi"
import { chnageConenctedUser} from '../../Redux/slices/sessionSlice';

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
        const [result, err] = await queryApi('user/signin',formData, "POST", false)
        
        if ((result == 'Incorrect password')||( result == 'Incorrect email' )){
          setErrorDisplay(result)
        }else{
          
        let userResult = {id :result._id, email : result.email, type : result.typeUser , name : result.name,lastName : result.lastName , phone :result.phone, birthDate : result.birthDate, image : result.image,token : result.token} 
          dispatch(chnageConenctedUser(userResult))
          history.push('/')
        }
        
      }
    return (
            <div class="my-5">
                <h1 class="logo mx-auto" style={{textAlign:"center",color:"#5fcf80"}}>Sign In</h1>
                <form class="w-50 mx-auto" onSubmit={onSubmit}>
                   
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => onChange(e)} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" onChange={(e) => onChange(e)}/>
                    </div>
                    
                <div style={{ textAlign: "center", color: "red" }}>{errorDisplay}</div>
                    <button type="submit" class="ms-auto my-2 btn get-started-btn">Submit</button>
                </form>
            </div>
    );
}