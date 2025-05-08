import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when logged out, { email } when logged in

  const login = (email) => {
    // Mock login: Set user data
    setUser({ email });
  };

  const logout = () => {
    // Mock logout: Clear user data
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);