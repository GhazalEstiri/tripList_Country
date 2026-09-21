import { createContext, useState } from "react";

const loginContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name, email) => {
    const userData = { name, email };
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <div>
      <loginContext.Provider value={{ user,logout , login }}>
        {children}
      </loginContext.Provider>
    </div>
  );
}
export {loginContext};
export default AuthProvider;
