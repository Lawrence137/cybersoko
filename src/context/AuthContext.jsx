import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sign Up function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In function
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Out function
  const signout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;