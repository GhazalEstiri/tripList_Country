import { useContext, useState } from "react";
import { loginContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
function Login() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pasword, setPasword] = useState("");
  const [error, setError] = useState("");
  const regexPasword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/;
  const regexName = /^[A-Za-z]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { user, logout, login } = useContext(loginContext);
  const navigate = useNavigate()

  const handleInputs = (e) => {
    e.preventDefault();

    if (!name) {
      setError("name is empty.");
      return;
    }

    if (!regexName.test(name)) {
      setError("name format is wrong.");
      return;
    }

    if (!email) {
      setError("email is empty.");
      return;
    }

    if (!regexEmail.test(email)) {
      setError("email format is wrong");
      return;
    }

    if (!pasword) {
      setError("pasword is empty. ");
      return;
    }

    if (!regexPasword.test(pasword)) {
      setError("pasword format is wrong.");
      return;
    }
    login(name, email);
    setError("");
    navigate("/")
  };

  return (
    <div>
      <div>
        {user ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl">
              Hello <span className="text-red-600">{user.name}</span>
            </p>

            <button
              onClick={logout}
              className="px-5 py-2 bg-red-600 rounded-lg"
            >
              Log out
            </button>
          </div>
        ) : (
          <form onSubmit={handleInputs}>
            <input
              type="text"
              value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={pasword}
              placeholder="Password"
              onChange={(e) => setPasword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        )}
      </div>
      {error && <p>{error}</p> }
    </div>
  );
}
export default Login;
