import { Link } from "react-router-dom";
import { queryApi } from "../utils/queryApi"
import { useSelector } from 'react-redux';
import { chnageConenctedUser, selectConnectedUser } from '../Redux/slices/sessionSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Navbar() {

  const history = useHistory()
  const dispatch = useDispatch();
  var connectedUser = useSelector(selectConnectedUser);
  return connectedUser.type == "disconnected" ? (
    <div id="header">
      <div className="container d-flex align-items-center  ">
        <h1 class="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li><Link to={'/signin'}>Sign In</Link></li>
            <li><Link to={'/signup'}>Sign Up</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  ) : connectedUser.type == "admin" ? (
    <div id="header">
      <div className="container d-flex align-items-center">

        <h1 className="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><Link to={'/'}>Users</Link></li>
            <li><Link to={'/'}>Interest Points</Link></li>
            <li><Link to={'/'}>Modules</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li className="dropdown"><a>More</a>
              <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><a onClick={async () => {
                   const [res, err] = await queryApi('user/signout/'+connectedUser.id);
                   history.push('/signin')
                   dispatch(chnageConenctedUser({ type: "disconnected" }))
                }}>Sign Out</a></li>
              </ul>
            </li>   
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  ) : connectedUser.type == "user" ? (
    <div id="header " >
      <div className="container d-flex align-items-center ">

        <h1 className="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li><Link to={'/SocialMedia'}>Social Media</Link></li>
            
            <li className="dropdown"><a>More</a>
              <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><Link onClick={async () => {   
                  const [res, err] =  await queryApi('user/signout/'+connectedUser.id);
                  history.push('/signin')
                  dispatch(chnageConenctedUser({ type: "disconnected" }))
                }}>Sign Out</Link></li>
              </ul>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  ) : (
    <h1>problem happened</h1>
  )
}