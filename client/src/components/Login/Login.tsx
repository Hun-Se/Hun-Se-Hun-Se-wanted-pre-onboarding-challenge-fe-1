import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <>{isLoggedIn ? navigate("/todo") : <LoginForm />}</>;
};

export default Login;
