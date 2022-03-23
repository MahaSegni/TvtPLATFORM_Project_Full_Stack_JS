import { Link } from "react-router-dom";
import { queryApi } from "../utils/queryApi"
import { useSelector } from 'react-redux';
import { chnageConenctedUser, selectConnectedUser,refreshUserToken } from '../Redux/slices/sessionSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
export default function Navbar() {
  
  
  const autoSignOut = async () => {
    const [res, err] = await queryApi('user/autoSignOut/f5bc2de53fb87ca782918b25504e1f402cd0b4b47099b7aeba2a3/'+ connectedUser.id);
    history.push('/signin')
    dispatch(chnageConenctedUser({ type: "disconnected" }))
  }


  useEffect(() => {
    if (connectedUser.type != "disconnected" && !Cookies.get('connected')) { 
        autoSignOut()
    }
  },[])

  const history = useHistory()
  const dispatch = useDispatch();
  var connectedUser = useSelector(selectConnectedUser);
  return connectedUser.type == "disconnected" ? (
    <div id="header">
      <div className="container d-flex align-items-center">
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
            <li><Link to={'/users'}>Users</Link></li>
            <li><Link to={'/interestpoints'}>Interest Points</Link></li>
            <li><Link to={'/'}>Modules</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li className="dropdown"><a>More</a>
              <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><a onClick={async () => {
                  const [res, err] = await queryApi('user/signout/' + connectedUser.id, null, "GET", false,connectedUser.token);
                  history.push('/signin')
                  dispatch(chnageConenctedUser({ type: "disconnected" }))
                  Cookies.remove('connected')
                }}>Sign Out</a></li>
              </ul>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  ) : connectedUser.type == "user" ? (
    <div id="header">
      <div className="container d-flex align-items-center">

        <h1 className="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li className="dropdown"><a>More</a>
              <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><Link onClick={async () => {
                  const [res, err] = await queryApi('user/signout/' + connectedUser.id, null, "GET", false,connectedUser.token);
                  history.push('/signin')
                  dispatch(chnageConenctedUser({ type: "disconnected" }))
                  Cookies.remove('connected')
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