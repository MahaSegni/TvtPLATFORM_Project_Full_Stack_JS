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
const Chatbot = React.lazy(() => import('./components/chatbot'));
const Signup = React.lazy(() => import('./components/user/signup'));
const Signin = React.lazy(() => import('./components/user/signin'));
const Profile = React.lazy(() => import('./components/user/profile'));
const ForgetPassword = React.lazy(() => import('./components/user/forgetPassword'));
const Library = React.lazy(() => import('./components/user/library'));
const Users = React.lazy(() => import('./components/user/users'));
const InterestPoints = React.lazy(() => import('./components/user/interestPoints'));
const VisitorProfile = React.lazy(() => import('./components/user/visitorProfile'));
const Coursfront = React.lazy(() => import('./components/cours/Coursfront'));
const QuizComp = React.lazy(() => import('./components/quizzes/QuizTeacher'));
const QuizStudent = React.lazy(() => import('./components/quizzes/QuizStudent'))
const Evaluations = React.lazy(() => import('./components/evaluation/evaluations'));
const CategoryModule = React.lazy(() => import('./components/Category/admincategory'));
const Module = React.lazy(() => import('./components/Module/listModule'));
const MyModules = React.lazy(() => import('./components/Module/MyModules'));
const ModuleList = React.lazy(() => import('./components/Module/ModuleList'));
const QuizStudentListe=React.lazy(()=>import('./components/quizzes/QuizStudentListe'));

const AdminCours=React.lazy(()=>import('./components/cours/AdminCours'))

const SocialMedia = React.lazy(() => import('./components/friends/socialMediaMenu'));
const MicrosoftDocsViewer=React.lazy(()=>import("./components/cours/MicrosoftDocsViewer"));

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  var connectedUser = useSelector(selectConnectedUser);

  const [refresh, setRefresh] = useState(false)


  const refreshUser = async () => {
    const [result, err] = await queryApi('user/refreshUser/'+ connectedUser.id, null,'GET',false ,process.env.REACT_APP_SECRET );
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
         {connectedUser.type != "disconnected" && <Chatbot />}
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
              <Route path='/module/:idModule/allcours' render={props => <Coursfront {...props} />}></Route>
              <Route path='/module/:idModule/Quiz' render={props => <QuizComp {...props} />}></Route>
              <Route path='/studentQuiz/:id' render={props => <QuizStudent {...props} />}></Route>
              <Route path="/evaluations" render={(props) => <Evaluations {...props} />}></Route>
              <Route exact path='/category' render={props => <CategoryModule {...props} />}></Route>
              <Route exact path='/module' render={props => <Module {...props} />}></Route>
              <Route exact path='/myModules' render={props => <MyModules {...props} />}></Route>
              <Route exact path='/ModuleList' render={props => <ModuleList {...props} />}></Route>
              <Route path='/SocialMedia' render={props => <SocialMedia {...props} />}></Route>
              <Route path='/studentQuizAll/:idModule' render={props => <QuizStudentListe {...props} />}></Route>
              <Route path='/AdminCours' render={props=><AdminCours{...props}/>}></Route>
              <Route path='/viewMicrosftDoc/:idcour/:idfile' render={props=><MicrosoftDocsViewer{...props}/>}></Route>

            </Switch>
          }
        </Suspense>
      </BrowserRouter>
    </>);
}

export default App;
