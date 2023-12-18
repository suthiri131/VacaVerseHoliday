import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../../assets/images/logo.png";

const LoginForm: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedRememberMe === "true") {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Success!");

        // Store user ID in localStorage
        localStorage.setItem("userId", data.user.userid);
        localStorage.setItem("authToken", data.user.token);
        localStorage.setItem("roleid", data.user.roleid);

        if (data.user.roleid === 1) {
          router.push('/');
        } else if (data.user.roleid === 2) {
          router.push('/admin');
        }
      } else {
        alert("Wrong email/password! Please enter again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="frame">
      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
            {/* <img className="vacaverse-logo" src={logo} alt="Vacaverse Logo" /> */}
            <div className="text-wrapper">LOGIN</div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="group">
              <input
                type="text"
                id="email"
                name="email"
                className="email-field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
            </div>
            <div className="overlap-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="password-field"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
            </div>

            <button className="overlap-2" name="login" type="submit">
              Login
            </button>

            <label className="overlap-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </form>
        </div>

        <Link href="/register">
          <a className="p">Don’t have an account? Sign up here.</a>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
