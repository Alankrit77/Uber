import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Start from "./pages/start/Start";
import UserLogin from "./pages/users/UserLogin";
import UserSignUp from "./pages/users/UserSignUp";
import CaptainLogin from "./pages/captains/CaptainLogin";
import CaptainSignup from "./pages/captains/CaptainSignup";
import Home from "./pages/home/home";
import UserLogout from "./pages/users/UserLogout";
import CaptainLogout from "./pages/captains/CaptainLogout";
import CaptainHome from "./pages/home/CaptainHome.jsx";
import UserWithAuth from "./componets/hoc/UserWithAuth.jsx";
import CaptainWithAuth from "./componets/hoc/CaptainWithAuth.jsx";
import Riding from "./pages/ride/Riding.jsx";
import CaptainRiding from "./pages/captains/CaptainRiding.jsx";

const isMobileDevice = () => {
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

const DesktopMessage = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f5f5f5",
    }}>
    <h1 style={{ color: "#333", marginBottom: "20px" }}>Mobile App Only</h1>
    <p
      style={{
        color: "#666",
        fontSize: "18px",
        maxWidth: "500px",
      }}>
      Please switch to mobile view or open this application on a mobile device
      to proceed.
    </p>
    <p
      style={{
        color: "#999",
        fontSize: "14px",
        marginTop: "20px",
      }}>
      This app is optimized for mobile devices only.
    </p>
  </div>
);

const App = () => {
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = isMobileDevice();
      if (!isMobile && currentIsMobile) {
        window.location.reload();
      }
      setIsMobile(currentIsMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  if (!isMobile) {
    return <DesktopMessage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="signup" element={<UserSignUp />} />
      <Route path="captain/login" element={<CaptainLogin />} />
      <Route path="captain/signup" element={<CaptainSignup />} />
      <Route path="/riding" element={<Riding />} />
      <Route
        path="/captain/riding"
        element={
          <CaptainWithAuth>
            <CaptainRiding />
          </CaptainWithAuth>
        }
      />
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
