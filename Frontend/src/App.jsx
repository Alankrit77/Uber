import { Route, Routes } from "react-router-dom";
import Start from "./pages/start/Start";
import UserLogin from "./pages/users/UserLogin";
import UserSignUp from "./pages/users/UserSignUp";
import CaptainLogin from "./pages/captains/CaptainLogin";
import CaptainSignup from "./pages/captains/CaptainSignup";
import Home from "./pages/home/Home";
import WithAuth from "./componets/hoc/WithAuth";
import UserLogout from "./pages/users/UserLogout";

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
          <WithAuth>
            <Home />
          </WithAuth>
        }
      />
      <Route
        path="/user/logout"
        element={
          <WithAuth>
            <UserLogout />
          </WithAuth>
        }
      />
    </Routes>
  );
};

export default App;
