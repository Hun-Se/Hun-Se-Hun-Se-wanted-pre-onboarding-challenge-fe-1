import { useState } from "react";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";

const AuthPage = () => {
  const [renderLogin, setRenderLogin] = useState<boolean>(true);

  return (
    <>
      {renderLogin ? (
        <Login renderLogin={setRenderLogin} />
      ) : (
        <SignUp renderLogin={setRenderLogin} />
      )}
    </>
  );
};

export default AuthPage;
