import '@styles/reset.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Main from './pages/Main'
import Theme from './pages/Theme';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import { LoginProvider, useLogin } from './hooks/LoginContext';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useLogin();
  const location = useLocation();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/theme/:themeKey" element={<Theme />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-account" element={
            <RequireAuth>
              <MyAccount />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;