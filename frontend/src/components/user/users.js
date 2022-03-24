import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi"
import { useApi } from "../../utils/useApi"
import { useSelector } from 'react-redux';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Users(props) {
    var connectedUser = useSelector(selectConnectedUser);
    const history = useHistory()
    useEffect(()=> {
        if(connectedUser.type != "admin"){
            history.push('/profile')
        }
    },[])
    const [users, err, reloadUsers] = useApi("user/allUsers/" + connectedUser.id, null, "GET", false, connectedUser.token)
    const ban = async (id) =>{   
         
        const [res, err] = await queryApi('user/ban/'+connectedUser.id + '/' +id,null,"GET",false,connectedUser.token);
        reloadUsers()

    }
    const unban = async (id) =>{
        const [res, err] = await queryApi('user/unban/'+connectedUser.id+'/'+id,null,"GET",false,connectedUser.token);
        reloadUsers()
    }
    return (

        <div className='container mt-5'>
            <div className="row justify-content-center container">
                {users && users.map((user, index) => (
                    <div className="row align-items-center">
                        <div className="col-4">
                            {user.image.startsWith('https') &&
                                <img src={user.image} className="rounded-circle"
                                    width="200"></img>
                            }
                            {!user.image.startsWith('https') &&
                                <img src={require('../../assets/uploads/user/' + user.image)} alt="user" className="rounded-circle"
                                    width="200" />
                            }
                        </div>
                        <div className="col-6">
                            <h4>Name : {user.name}</h4>
                            <h4>lastName : {user.lastName}</h4>
                            <h4>Email : {user.email}</h4>
                        </div>
                        {user.typeUser != "admin" &&
                        <div className="col-2">
                            {user.state != -1 &&
                                <button onClick={() => ban(user._id)} className="btn btn-template-user" style={{ float: "right", background: "#FF0000" }}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></button>
                            }
                            {user.state == -1 &&
                                <button onClick={() => unban(user._id)} className="btn btn-template-user" style={{ float: "right" }}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></button>
                            }
                            <Link to={`/check/${user._id}`} className="btn btn-template-user me-3" style={{ float: "right" }} ><FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon></Link>
                            
                        </div>
                        }
                    </div>

                ))}

            </div >
        </div>
    )
}