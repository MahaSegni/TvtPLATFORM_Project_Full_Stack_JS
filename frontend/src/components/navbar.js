import { Link } from "react-router-dom";
import { queryApi } from "../utils/queryApi"
import { useSelector } from 'react-redux';
import { chnageConenctedUser, selectConnectedUser, refreshUserToken } from '../Redux/slices/sessionSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
export default function Navbar({}) {
  
  const autoSignOut = async () => {
    const [res, err] = await queryApi('user/autoSignOut/' + connectedUser.id, null, 'GET', false, process.env.REACT_APP_SECRET);
    localStorage.removeItem('chatbotsession');
    localStorage.removeItem('notif');

    history.push('/signin')
    dispatch(chnageConenctedUser({ type: "disconnected" }))
  }
  useEffect(()=>{
    if(connectedUser.type != "disconnected"){
  
    }
   
  },[])


  useEffect(() => {
    if (connectedUser.type != "disconnected" && !Cookies.get('connected')) {
      autoSignOut()
    }
  }, [])

  const history = useHistory()
  const dispatch = useDispatch();
  var connectedUser = useSelector(selectConnectedUser);
  return connectedUser.type == "disconnected" ? (
    <div id="header">
      <div className="container d-flex align-items-center">
        <h1 class="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/module'}>Modules</Link></li>
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
            <li><Link to={'/category'}>Category</Link></li>
            <li><Link to={'/AdminCours'}>Courses</Link></li>
            <li><Link to={'/evaluations'}>Evaluations</Link></li>
            <li><Link to={'/chatbot'}>Chatbot</Link></li>

            <li><label style={{ display: "inline-flex" }}><Link to={'/SocialMedia'}>Community</Link>
            {JSON.parse(localStorage.getItem('notif')) && 
              <>{JSON.parse(localStorage.getItem('notif')).length> 0 && <>
                <label id="totalnotif" >   <span class="fa-stack has-badge" data-count='!'>
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-bell fa-stack-1x fa-inverse"></i>
                </span></label></>}</>}</label></li>
            <li className="dropdown"><a>More</a>
              <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><a onClick={async () => {
                  const [res, err] = await queryApi('user/signout/' + connectedUser.id, null, "GET", false, connectedUser.token);
                  localStorage.removeItem('chatbotsession');
                  localStorage.removeItem('notif');
  
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
            <li><Link to={'/Home'}>Home</Link></li>
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/module'}>Modules</Link></li>
            <li><label style={{ display: "inline-flex" }}><Link to={'/SocialMedia'}>Community</Link>
            {JSON.parse(localStorage.getItem('notif')) && 
              <>{JSON.parse(localStorage.getItem('notif')).length> 0 && <>
                <label id="totalnotif" >   <span class="fa-stack has-badge" data-count='!'>
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-bell fa-stack-1x fa-inverse"></i>
                </span></label></>}</>}</label></li>
            <li className="dropdown"><a>More</a>
              <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><Link to={'/myModules'}>My Modules</Link></li>
                <li><Link to={'/ModuleList'}>Module List</Link></li>
                <li><Link onClick={async () => {
                  const [res, err] = await queryApi('user/signout/' + connectedUser.id, null, "GET", false, connectedUser.token);
                  localStorage.removeItem('chatbotsession');
                  localStorage.removeItem('notif');
                  localStorage.removeItem('totalnotif');
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