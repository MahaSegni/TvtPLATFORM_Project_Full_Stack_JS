import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Navbar() {
  const [activePage,setActivePage] = useState('Home');
  const [connectedUser, setconnectedUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
  }, [connectedUser])
  
  return connectedUser != null? (
    <div id="header">
      <div class="container d-flex align-items-center">

        <h1 class="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
          <li><Link to={'/'}>Home</Link></li>
            
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li><Link to={'/'}>Sign In</Link></li>
            <li><Link to={'/signup'}>Sign Up</Link></li>
            <li class="dropdown"><a>More</a>
            <ul>
              <li><Link to={'/'}>Profile</Link></li>
              <li><a onClick={()=>{
                localStorage.clear()
                setconnectedUser(null)
              }}>Disconnect</a></li>
            </ul>
          </li>

            
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  ):(
    <div id="header">
      <div class="container d-flex align-items-center">

        <h1 class="logo me-auto"><a href="index.html">TvtPlatform</a></h1>
        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/'}>About Us</Link></li>
            <li><Link to={'/'}>Courses</Link></li>
            <li><Link to={'/'}>Sign In</Link></li>
            <li><Link to={'/signup'}>Sign Up</Link></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  );
}