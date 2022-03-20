import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
const Navbar = React.lazy(() => import('./components/navbar'));
const Signup = React.lazy(() => import('./components/user/signup'));
const Signin = React.lazy(() => import('./components/user/signin'));
const Profile = React.lazy(() => import('./components/user/profile'));
const ForgetPassword = React.lazy(() => import('./components/user/forgetPassword'));
const Library = React.lazy(() => import('./components/user/library'));
const Users = React.lazy(() => import('./components/user/users'));
const InterestPoints = React.lazy(() => import('./components/user/interestPoints'));
function App() {

  return (
    <>
      <head>
      </head>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Navbar />
          <Switch>
            <Route exact path='/signup' render={props => <Signup {...props} />}></Route>
            <Route path='/signin' render={props => <Signin {...props} />}></Route>
            <Route path='/profile' render={props => <Profile {...props} />}></Route>
            <Route path='/forgetPassword' render={props => <ForgetPassword {...props} />}></Route>
            <Route path='/library' render={props => <Library {...props} />}></Route>
            <Route path='/users' render={props => <Users {...props} />}></Route>
            <Route path='/interestpoints' render={props => <InterestPoints {...props} />}></Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>);
}

export default App;
