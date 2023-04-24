import React, { createContext, useState } from "react";

const StateContext = createContext(undefined);
const StateDispatchContext = createContext(undefined);

function StateProvider({ Children }) {
  const [userDetails, setUserDetails] = useState({});

  return (
    <StateContext.Provider value={userDetails}>
      <StateDispatchContext.Provider value={setUserDetails}>
        {Children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

export { StateProvider, StateContext, StateDispatchContext };
