import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from "../../utils/useApi"
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
export default function Library() {
    const history = useHistory();
    useEffect(()=> {
        if(connectedUser.type == "disconnected"){
            history.push('/signin')
        }
    },[])
    var connectedUser = useSelector(selectConnectedUser);
    const [ownModules, err, reloadAllModules] = useApi('user/getModulesByOwner/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    const [subscribedModules, err2, reloadSubscribedModules] = useApi('user/getModulesBySubscriber/' + connectedUser.id, null, 'GET', false, connectedUser.token);
    return (
        <>

            <div className=" container my-5">
                <div class="card">
                    <div class="card-body">
                    {ownModules && ownModules[0] &&
                        <div className="row">
                            <div className="my-2" style={{ textAlign: "center"}}><h3>Your Own Modules List</h3></div>
                            <hr/>
                            {ownModules.map((module, index) => (
                                <div className="card col-md-3 mx-2 mb-5" style={{ width: "18rem;" }}>
                                    <img src={require('../../assets/uploads/module/' + module.image)} alt="" style={{ width: '100%', height: '13vw', objectFit: 'cover' }}></img>
                                    <div clclassNameass="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center" }}>{module.label}</h5>
                                        {/*  <p className="card-text my-2">{module.description}</p>*/}
                                        <button className="btn btn-template-user my-2" style={{ float: "right" }}>Check</button>
                                    </div>
                                </div>
                            ))}
                            <hr/>
                        </div>
                    }
                    {subscribedModules && subscribedModules[0] &&
                        <div className="row">
                            <div className="my-2" style={{ textAlign: "center"}}><h3>Modules You are Subscribed In</h3></div>
                            <hr/>
                            {subscribedModules.map((module, index) => (
                                <div className="card col-md-3 mx-2 mb-5" style={{ width: "18rem;" }}>
                                    <img src={require('../../assets/uploads/module/' + module.image)} alt="" style={{ width: '100%', height: '13vw', objectFit: 'cover' }}></img>
                                    <div clclassNameass="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center" }}>{module.label}</h5>
                                        
                                        <button className="btn btn-template-user my-2" style={{ float: "right" }}>Check</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    </div>
                </div>
            </div>



        </>
    );
}