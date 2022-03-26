import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'

import CategoryModule from './components/Category/admincategory'
import Module from './components/Module/listModule'
import  Listemodulefront from './components/Module/listmodulefront'
const Navbar = React.lazy(() => import('./components/navbar'));
const Signup = React.lazy(() => import('./components/user/signup'));
const Signin = React.lazy(() => import('./components/user/signin'));
const Profile = React.lazy(() => import('./components/user/profile'));

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
            <Route exact path='/module' render={props => <Module {...props} />}></Route>
            <Route exact path='/modules' render={props => <Listemodulefront {...props} />}></Route>
            <Route exact path='/category' render={props => <CategoryModule {...props} />}></Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>);
}

export default App;
/*<Route path='/module/add' render={props => <AddModule {...props} />} ></Route>
            <Route path='/module/:id' render={props => <DetailModule {...props} />} ></Route>
            <Route  path='/modulefront' render={props => <Modulefront {...props} />}></Route>
            <Route exact path='/addUser/:id/:email' render={props => <AddUserToModule {...props} />}></Route>
            */