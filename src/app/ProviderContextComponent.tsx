import { useState } from "react";
import { myContext } from "./context";

export const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    global: {
      token: "",
      name: "",
      search: "",
      movie: {},
      favorites: []
    },
  });

  const SetAuth = (target: string, payload: any) => {
    setState((prevState) => ({
      ...prevState,
      global: {
        ...state.global,
        [target]: payload,
      },
    }));
  };

  return (
    <myContext.Provider value={{ state, SetAuth }}>
      {children}
    </myContext.Provider>
  );
};
