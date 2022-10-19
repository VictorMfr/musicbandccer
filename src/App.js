import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import UserMainPage from './pages/UserMainPage/UserMainPage';
import useBackendRequest from './hooks/backendRequest';
import { authActions } from './storage-redux/auth';
import LoginPage from './pages/LoginPage/LoginPage';
import RepertoryPage from './pages/RepertoryPage/RepertoryPage';

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
    <Switch>

      <Route path={paths.frontend.repertory}>
        <RepertoryPage />
      </Route>

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
        <Redirect to={paths.frontend.home}/>
      </Route>
    </Switch>
  );

}

export default App;
