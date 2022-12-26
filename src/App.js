import React, { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useBackendRequest from './hooks/backendRequest';
import { authActions } from './storage-redux/auth';



const RepertoryPage = React.lazy(() => import('./pages/RepertoryPage/RepertoryPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const UserMainPage = React.lazy(() => import('./pages/UserMainPage/UserMainPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/RegisterPage'));
const WelcomePage = React.lazy(() => import('./pages/WelcomePage/WelcomePage'));
const InfoPage = React.lazy(() => import('./pages/InfoPage/InfoPage'));

const App = () => {
  const paths = useSelector(state => state.routes);
  const auth = useSelector(state => state.auth);
  const request = useBackendRequest();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  useEffect(() => {
    request.backendRequest({
      url: '/checkUser',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: {
        token
      }
    }).then(data => {
      dispatch(authActions.login({userData: data.user, token: data.token}));
    }).catch(error => {
      dispatch(authActions.logout());
    })
  },[]);


  const isNotAuthenticated = !auth.isAuth && !auth.isLoading;
  const isAuthenticated = auth.isAuth && !auth.isLoading;

  return (
    <Suspense fallback={<></>}>
      <Switch>

        

        <Route exact path={paths.frontend.home}>
          {isNotAuthenticated && <WelcomePage />}
          {isAuthenticated && <UserMainPage />}
        </Route>

        <Route exact path={paths.frontend.home}>
          {isNotAuthenticated && <WelcomePage />}
          {isAuthenticated && <UserMainPage />}
        </Route>

        {isNotAuthenticated && <Route exact path={paths.frontend.info}>
          <InfoPage />
        </Route>}

        

        {!auth.isAuth && <Route exact path={paths.frontend.register}>
          <RegisterPage />
        </Route>}

        {!auth.isAuth && <Route exact path={paths.frontend.login}>
          <LoginPage />
        </Route>}

        <Route exact path={paths.frontend.repertory}>
          {isAuthenticated && <RepertoryPage />}
        </Route>
        
        <Route path={paths.frontend.any}>
          <Redirect to={paths.frontend.home} />
        </Route>
      </Switch>
    </Suspense>
  );

}

export default App;
