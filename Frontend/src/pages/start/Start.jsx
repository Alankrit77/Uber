import HomeBg from "../../assets/Home.png";
import { useNavigate } from "react-router";

const Start = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div
        className="bg-cover bg-center bg-no-repeat flex-1 flex flex-col justify-start w-full pt-8"
        style={{ backgroundImage: `url(${HomeBg})` }}>
        <img
          className="w-16 ml-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber Logo"
        />
      </div>
      <div className="bg-white pb-7 py-4 px-4 flex-shrink-0">
        <h2 className="text-2xl font-bold font">Get Started with Uber</h2>
        <button
          className="w-full bg-black text-white py-2 px-4 rounded mt-5 hover:bg-gray-800"
          onClick={handleNavigate}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Start;
