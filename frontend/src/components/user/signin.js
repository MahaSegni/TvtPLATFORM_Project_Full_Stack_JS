import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { chnageConenctedUser} from '../../Redux/slices/sessionSlice';

export default function Signin() {

    const dispatch = useDispatch();

    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        type:""
      })
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
      }
      const onSubmit = async (e) => {
        e.preventDefault()
        const user = {email : formData.email, password : formData.password, type : "user"}
        dispatch(chnageConenctedUser(user))
        
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
                    
                    <button type="submit" class="ms-auto my-2 btn get-started-btn">Submit</button>
                </form>
            </div>
    );
}