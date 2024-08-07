import { useContext, useState } from "react";
import { AdminAuth } from "../App";

function Home() {
  const adminAuth = useContext(AdminAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const loginHandler = async () => {
    const body = {
      username: username,
      password: password,
    };

    try {
      const url = "http://localhost:3000/user/adminlogin";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error occured ${response.status}`);
      }

      const json = await response.json();
      if (json.isadmin === true) {
        console.log("User is an admin");
        localStorage.setItem("token", json.token);
        window.location.href = "/posts";
      }
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  if (adminAuth.adminState === false) {
    return (
      <>
        <h2>Admin panel</h2>
        <p>Log in to proceed</p>
        <form method="none" onSubmit={(e) => e.preventDefault()}>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => usernameHandler(e)}
            ></input>
          </div>
          <div className="password">
            <label htmlFor="password">Username</label>
            <input
              name="password"
              type="password"
              onChange={(e) => passwordHandler(e)}
            ></input>
          </div>
          <button className="loginSubmit" onClick={loginHandler}>
            Log in
          </button>
        </form>
      </>
    );
  }
  return (
    <>
      <h2>Admin panel</h2>
      <p>List blog posts</p>
    </>
  );
}

export default Home;
