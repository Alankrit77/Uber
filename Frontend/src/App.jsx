import { Route, Routes } from "react-router-dom";
import Start from "./pages/start/Start";
import UserLogin from "./pages/users/UserLogin";
import UserSignUp from "./pages/users/UserSignUp";
import CaptainLogin from "./pages/captains/CaptainLogin";
import CaptainSignup from "./pages/captains/CaptainSignup";
import Home from "./pages/home/Home";
import UserLogout from "./pages/users/UserLogout";
import CaptainLogout from "./pages/captains/CaptainLogout";
import CaptainHome from "./pages/home/CaptainHome.jsx";
import UserWithAuth from "./componets/hoc/UserWithAuth.jsx";
import CaptainWithAuth from "./componets/hoc/CaptainWithAuth.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="signup" element={<UserSignUp />} />
      <Route path="captain/login" element={<CaptainLogin />} />
      <Route path="captain/signup" element={<CaptainSignup />} />
      <Route
        path="/home"
        element={
          <UserWithAuth>
            <Home />
          </UserWithAuth>
        }
      />
      <Route
        path="/user/logout"
        element={
          <UserWithAuth>
            <UserLogout />
          </UserWithAuth>
        }
      />
      <Route
        path="/captain/home"
        element={
          <CaptainWithAuth>
            <CaptainHome />
          </CaptainWithAuth>
        }
      />
      <Route
        path="/captain/logout"
        element={
          <CaptainWithAuth>
            <CaptainLogout />
          </CaptainWithAuth>
        }
      />
    </Routes>
  );
};

export default App;
