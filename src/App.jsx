import { useState, createContext, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";

export const AdminAuth = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/posts", element: <Posts /> },
]);

function App() {
  const [adminState, setAdminState] = useState(false);

  return (
    <AdminAuth.Provider value={{ adminState, setAdminState }}>
      <RouterProvider router={router} />
    </AdminAuth.Provider>
  );
}

export default App;
