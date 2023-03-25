import { useState } from "react";
import { createContext } from "react";

export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [id, setId] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser, id, setId }}>
      {children}
    </userContext.Provider>
  );
};
