import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { useApi } from '../../utils/useApi';
export default function VisitorProfile() {
    var connectedUser = useSelector(selectConnectedUser);
    const { id } = useParams()
    var [user, err, reloadUser] = useApi('user/getGeneralInfo/' + id, null, 'GET', false);

    return (

        <>
            {user && user.state != -1 &&
                <div id="main" data-aos="fade-in" className="mt-5" >
                    <div className="container">
                        <div className="main-body">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="card">
                                        <div className="card-body">

                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div>
                                                    {user.image.startsWith('https') &&

                                                        <img src={user.image} className="rounded-circle"
                                                            width="300" referrerpolicy="no-referrer"></img>
                                                    }
                                                    {!user.image.startsWith('https') && <img src={require('../../assets/uploads/user/' + user.image)} alt="Admin" className="rounded-circle"
                                                        width="300" />
                                                    }
                                                </div>
                                                <div className="mt-3">
                                                    <h4>{user.name} {user.lastName} </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 my-3">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {user.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Last Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {user.lastName}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Birth date</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {user.birthDate != null &&
                                                        <>
                                                            {user.birthDate.substring(0, 10)}
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {user.email}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone Number</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {user.phone}
                                                </div>
                                            </div>
                                            <hr />

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 my-3">
                                    <div className="card mb-3">
                                        <div className="mx-auto my-auto">
                                            <h3 className="my-3">Course Preferences</h3>
                                        </div>
                                        <hr />
                                        <div className="card-body">
                                            {user.coursepreferences.map((cp, index) => (
                                                <>
                                                    <div className="row">

                                                        <div className="col-sm-6">
                                                            <h6 className="mt-2">{cp}</h6>
                                                        </div>

                                                    </div>
                                                    <hr />
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >}
            <div>
                {user && user.state == -1 &&
                    <div class="alert alert-warning mt-5 mx-5" role="alert">
                        <h3>Sorry you can't access to this account's profile </h3>
                    </div>
                }
            </div>
        </>
    )
}