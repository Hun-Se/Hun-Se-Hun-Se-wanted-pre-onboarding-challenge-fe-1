import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("access-token")
      ? navigate("/todo")
      : navigate("/auth");
  }, []);

  return <></>;
};

export default Home;
