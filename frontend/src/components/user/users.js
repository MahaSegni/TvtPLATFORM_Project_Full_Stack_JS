import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi"
import { useApi } from "../../utils/useApi"
import { useSelector } from 'react-redux';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../../assets/css/user.css"
export default function Users(props) {

    var connectedUser = useSelector(selectConnectedUser);
    const history = useHistory()
    const [users, err, reloadUsers] = useApi("user/allUsers/" + connectedUser.id, null, "GET", false, connectedUser.token)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 5
    const pagesVisited = pageNumber * usersPerPage
    const [searchInput, setSearchInput] = useState('')
    useEffect(() => {
        if (connectedUser.type != "admin") {
            history.push('/profile')
        }
    }, [])
    const ban = async (id) => {

        const [res, err] = await queryApi('user/ban/' + connectedUser.id + '/' + id, null, "GET", false, connectedUser.token);
        reloadUsers()

    }
    const unban = async (id) => {
        const [res, err] = await queryApi('user/unban/' + connectedUser.id + '/' + id, null, "GET", false, connectedUser.token);
        reloadUsers()
    }
    const onChangesearchInput = (e) => {
        setSearchInput(e.target.value)
    }
    return (

        <div id="main">
            <div className='container mt-5'>
                <div className="row justify-content-center container">
                    <div className='my-4'>
                        <input type="text" className="form-control" id="searchInput" name="searchInput" value={searchInput} placeholder="Search" onChange={(e) => onChangesearchInput(e)} />
                    </div>

                    {users && users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => (
                        <>
                            {searchInput != "" && (user.name.includes(searchInput) || user.lastName.includes(searchInput) || user.email.includes(searchInput)) &&

                                <>

                                    <div className="row align-items-center">

                                        <div className="col-4">
                                            {user.image.startsWith('https') &&
                                                <img src={user.image} className="rounded-circle"
                                                    width="100" referrerpolicy="no-referrer"></img>
                                            }
                                            {!user.image.startsWith('https') &&
                                                <img src={require('../../assets/uploads/user/' + user.image)} alt="user" className="rounded-circle"
                                                    width="100" />
                                            }
                                        </div>
                                        <div className="col-6">
                                            <h4><b>Name :</b> {user.name}</h4>
                                            <h4><b>Last Name :</b> {user.lastName}</h4>
                                            <h4><b>Email :</b> {user.email}</h4>
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
                                    <hr />
                                </>
                            }

                            {searchInput == "" &&
                                <>
                                    <div className="row align-items-center">

                                        <div className="col-4">
                                            {user.image.startsWith('https') &&
                                                <img src={user.image} className="rounded-circle"
                                                    width="100" referrerpolicy="no-referrer"></img>
                                            }
                                            {!user.image.startsWith('https') &&
                                                <img src={require('../../assets/uploads/user/' + user.image)} alt="user" className="rounded-circle"
                                                    width="100" />
                                            }
                                        </div>
                                        <div className="col-6">
                                            <h4><b>Name :</b> {user.name}</h4>
                                            <h4><b>Last Name :</b> {user.lastName}</h4>
                                            <h4><b>Email :</b> {user.email}</h4>
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
                                    <hr />
                                </>
                            }
                        </>
                    ))}
                    {users &&
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={Math.ceil(users.length / usersPerPage)}
                            onPageChange={({ selected }) => setPageNumber(selected)}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            activeClassName={"paginationActive"}
                        ></ReactPaginate>
                    }
                </div >

            </div>
        </div>
    )
}