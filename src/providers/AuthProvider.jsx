import { useEffect, useState } from "react";

import { AuthContext } from "../context";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      try {
        return { token, user: JSON.parse(user) };
      } catch (error) {
        console.error("Failed to parse user data:", error);
        return { token: null, user: null };
      }
    }

    return { token: null, user: null };
  });

  useEffect(() => {
    if(auth.token) {
      localStorage.setItem("access_token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }

  }, [auth]);

  const login = (token, user) => {
    setAuth({ token, user });
  };

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  const updateUser = (user) => {
    setAuth((prevAuth) => ({ ...prevAuth, user }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;