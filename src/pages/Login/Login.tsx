import { useContext, useState, useEffect } from "react";
import { myContext } from "../../app/context";
import CInput from "../../common/CInput/CInput";
import checkE from "../../utils/errors";
import { LoginMe } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Login() {

  //Instance of the context

  const {state, SetAuth} = useContext(myContext)
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const [credentialsErrors, setCredentialsErrors] = useState({
    nameError: "",
    passwordError: "",
  });

  const inputHandler = (e: any) => {
    //Binding process
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      //email : maciej@gmail.com
    }));
  };

  const errorCheck = (e: any) => {
    let error: string|undefined = "";

    error = checkE(e.target.name, e.target.value);

    setCredentialsErrors((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginFunction = async () => {

    LoginMe(credentials)
        .then(res => {
          SetAuth("token", res.token);
        })
        .catch(error => console.log(error));

  };

  // useEffect(()=>{

  //     console.log(credentials)

  // }, [credentials])

  return (
    <div className="p-10 flex flex-col">
      <CInput
        type="text"
        name="name"
        placeholder=""
        design={`${
          credentialsErrors.nameError !== "" ? "border-solid border-2 border-black w-40" : ""
        } border-solid border-1 border-black w-40`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      /> <br />
      {credentialsErrors.nameError}
      <br />
      <CInput
        type="password"
        name="password"
        placeholder=""
        design={`${
          credentialsErrors.passwordError !== "" ? "border-solid border-2 border-black w-40" : ""
        } border-solid border-1 border-black w-40`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      /> <br />
      {credentialsErrors.passwordError}
      {credentials.name !== "" &&
        credentials.password !== "" &&
        credentialsErrors.nameError === "" &&
        credentialsErrors.passwordError === "" && (
          <div className="login-button-design" onClick={loginFunction}>
            Login me!
          </div>
        )}
    </div>
  );
}

export default Login;
