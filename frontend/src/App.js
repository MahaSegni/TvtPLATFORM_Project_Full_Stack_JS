import React from 'react';
import { useSelector } from 'react-redux';
import { chnageConenctedUser, selectConnectedUser, refreshUserToken } from './Redux/slices/sessionSlice';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { queryApi } from "./utils/queryApi"
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom';
const Navbar = React.lazy(() => import('./components/navbar'));
const Signup = React.lazy(() => import('./components/user/signup'));
const Signin = React.lazy(() => import('./components/user/signin'));
const Profile = React.lazy(() => import('./components/user/profile'));
const ForgetPassword = React.lazy(() => import('./components/user/forgetPassword'));
const Library = React.lazy(() => import('./components/user/library'));
const Users = React.lazy(() => import('./components/user/users'));
const InterestPoints = React.lazy(() => import('./components/user/interestPoints'));
const VisitorProfile = React.lazy(() => import('./components/user/visitorProfile'));
function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  var connectedUser = useSelector(selectConnectedUser);

  const [refresh, setRefresh] = useState(false)


  const refreshUser = async () => {
    const [result, err] = await queryApi('user/refreshUser/f5bc2de53fb87ca782918b25504e1f402cd0b4b47099b7aeba2a3/' + connectedUser.id);
    console.log(result)
    if (result.image.startsWith('https')) {
      let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token, connectionType: connectedUser.connectionType, pictureType: "external" }
      dispatch(chnageConenctedUser(userResult))
      setRefresh(true)
    }
    else {
      let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token, connectionType: connectedUser.connectionType, pictureType: "internal" }
      dispatch(chnageConenctedUser(userResult))
      setRefresh(true)
    }
  }

  useEffect(() => {
    if (connectedUser.type != "disconnected" && Cookies.get('connected') && refresh == false) {
      refreshUser()
    }
    else {
      setRefresh(true)
    }
  })
  return (
    <>
      <head>
      </head>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Navbar />
          {refresh == true &&
            <Switch>
              <Route exact path='/signup' render={props => <Signup {...props} />}></Route>
              <Route path='/signin' render={props => <Signin {...props} />}></Route>
              <Route path='/profile' render={props => <Profile {...props} />}></Route>
              <Route path='/forgetPassword' render={props => <ForgetPassword {...props} />}></Route>
              <Route path='/library' render={props => <Library {...props} />}></Route>
              <Route path='/users' render={props => <Users {...props} />}></Route>
              <Route path='/interestpoints' render={props => <InterestPoints {...props} />}></Route>
              <Route path='/check/:id' render={props => <VisitorProfile {...props} />}></Route>

            </Switch>
          }
        </Suspense>
      </BrowserRouter>
    </>);
}

export default App;
