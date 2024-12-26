import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./config/firebaseClient.js";


const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); 
  const navigate = useNavigate();

  const auth = getAuth(app);
  const database = getDatabase(app);

  useState(() => {
    setIsLoaded(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const adminRef = ref(database, "Admin");
      const adminSnapshot = await get(adminRef);

      if (adminSnapshot.exists()) {
        const adminData = adminSnapshot.val();
console.log(adminData);
        const storedEmail = adminData.Email;
        const storedPassword = adminData.Password;


        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem("user_email", storedEmail);
          setLoginError(null);
          navigate("/dashboard");
        } else {
          setLoginError("Invalid email or password.");
        }
      } else {
        setLoginError("Admin credentials not found.");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="page home">
      <div className={`login-box ${isLoaded ? "fade-in" : ""}`}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
    </div>
  );
};

export default Home;
