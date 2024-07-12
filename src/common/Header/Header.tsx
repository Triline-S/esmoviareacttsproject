import Surfer from "../Surfer/Surfer";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { myContext } from "../../app/context";
import { jwtDecode } from "jwt-decode";
import esmovia from "../../assets/esmovia.jpg";
import CInput from "../CInput/CInput";
import { Stack } from "@mantine/core";

function Header() {
  //Instance of the context

  const { state, SetAuth } = useContext(myContext);
  const [decodedName, setDecodedName] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    //This follows the value of state
    if(state.global.token !== ""){
      //I will decipher the token....
      let decoded = jwtDecode(state.global.token)

      setDecodedName(decoded?.firstName)

    }
  }, [state]);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setSearch(e.target.value)
  }

  useEffect(()=> {

    SetAuth("search", search)
    console.log(search)
  }, [search])


  return (
    <div className="bg-slate-300 shadow-xl md:rounded-b-lg p-2 md:float-left md:h-max">

      <CInput 
        type="text"
        name="search"
        placeholder="Search for movies..."
        design="m-2 rounded-sm"
        emitFunction={inputHandler}
        errorCheck={()=>{}}
      />
      
    <Stack>
      <Surfer path={"/"} destiny={"Home"} />

      {state.global.token === "" ? (
        <div className="">
          <Surfer path={"/login"} destiny={"Login"} />
        </div>
      ) : (
        <>
          <Surfer path={"/profile"} destiny={decodedName} />
          <div onClick={()=>SetAuth("token", "")}>
            <Surfer path={"/"} destiny={"Log out"} />
          </div>
        </>
      )}</Stack>
    </div>
  );
}

export default Header;
