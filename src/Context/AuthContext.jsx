import { createContext, useState } from "react";
import { useNavigate } from "react-router";

const loginContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user")
    return savedUser? JSON.parse(savedUser):null; 
  }
);

  const login = (name, email) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("user",JSON.stringify(userData))
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user")
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
