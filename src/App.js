import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import './index.css'

const Login = lazy(()=> import('./pages/login'));
const SignUp = lazy(()=> import('./pages/signup'));
const NotFound = lazy(()=> import('./pages/notfound'));
const Dashboard = lazy(()=> import('./pages/dashboard'));
const Profile = lazy(()=> import('./pages/profile'));

function App() {
  const {user} = useAuthListener();
  return (
    <UserContext.Provider value={{user}}>
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} exact />
          <Route path={ROUTES.SIGN_UP} element={<SignUp/>} exact/>
          <Route path={ROUTES.PROFILE} element={<Profile/>} exact/>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard/>} exact/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
</Router>
     </UserContext.Provider>
  );
}

export default App;
