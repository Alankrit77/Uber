import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import UserLogin from "./pages/users/UserLogin";
import UserSignUp from "./pages/users/UserSignUp";
import CaptainLogin from "./pages/captains/CaptainLogin";
import CaptainSignup from "./pages/captains/CaptainSignup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="signup" element={<UserSignUp />} />
      <Route path="captain/login" element={<CaptainLogin />} />
      <Route path="captain/signup" element={<CaptainSignup />} />
    </Routes>
  );
};

export default App;
