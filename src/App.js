import React, { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useBackendRequest from './hooks/backendRequest';
import { authActions } from './storage-redux/auth';


const RepertoryPage = React.lazy(() => import('./pages/RepertoryPage/RepertoryPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const UserMainPage = React.lazy(() => import('./pages/UserMainPage/UserMainPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/RegisterPage'));
const WelcomePage = React.lazy(() => import('./pages/WelcomePage/WelcomePage'));

const App = () => {
  const paths = useSelector(state => state.routes);
  const auth = useSelector(state => state.auth);
  const request = useBackendRequest();
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(authActions.logout())
    } else {
      const response = request.backendRequest({
        url: '/checkUser',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: {
          token
        }
      });

      response.then(data => {
        dispatch(authActions.login({ userData: data.user, token: token }));
      });

      response.catch(error => {
        dispatch(authActions.logout())
      })

    }
  }, [])

  const isNotAuthenticated = !auth.isAuth && !auth.isLoading;
  const isAuthenticated = auth.isAuth && !auth.isLoading;

  return (
    <Suspense fallback={<></>}>
      <Switch>
        {auth.isAuth && <Route path={paths.frontend.repertory}>
          <RepertoryPage />
        </Route>}

        <Route exact path={paths.frontend.home}>
          {isNotAuthenticated && <WelcomePage />}
          {isAuthenticated && <UserMainPage />}
        </Route>
        {!auth.isAuth && <Route exact path={paths.frontend.register}>
          <RegisterPage />
        </Route>}

        {!auth.isAuth && <Route exact path={paths.frontend.login}>
          <LoginPage />
        </Route>}

        <Route path={paths.frontend.any}>
          <Redirect to={paths.frontend.home} />
        </Route>
      </Switch>
    </Suspense>
  );

}

export default App;
