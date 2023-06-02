import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const updateAccessToken = (token) => {
    setAccessToken(token);
    console.log(token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, updateAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
