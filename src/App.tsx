import React, { useState } from "react";

import Footer from "./components/Footer.js";
import Sidebar from "./components/Sidebar.js";
import Header from "./components/Header.js";
import "./App.css";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Mayagt from "./pages/Mayagt";
import Burtgel from "./components/Burtgel";
import CM from "./pages/CM";
import News from "./pages/News";
interface Web_Value {
  sidebarSize: boolean;
  setSidebarSize: (params: boolean) => void;
  sidebarSwitch: boolean;
  setSidebarSwitch: (params: boolean) => void;
}

function App() {
  const [sidebarSize, setSidebarSize] = useState<boolean>(true);
  const [sidebarSwitch, setSidebarSwitch] = useState<boolean>(false);

  const router = createHashRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/web",
      element: (
        <Web
          sidebarSize={sidebarSize}
          setSidebarSize={setSidebarSize}
          sidebarSwitch={sidebarSwitch}
          setSidebarSwitch={setSidebarSwitch}
        />
      ),
      children: [
        {
          path: "/web/Home/Audit",
          element: <Home />,
        },
        {
          path: "/web/CM/ReportAudit",
          element: <CM />,
        },
        {
          path: "/web/Home/Form",
          element: <Mayagt />,
        },
        {
          path: "/web/CM/Medee",
          element: <News />,
        },
        {
          path: "/web/Home/Nemeh/:id?",
          element: <Burtgel />,
        },
      ],
    },
  ]);

  return (
    <div className="h-screen overflow-hidden w-full">
      <RouterProvider router={router} />
    </div>
  );
}

function Web({
  sidebarSize,
  setSidebarSize,
  sidebarSwitch,
  setSidebarSwitch,
}: Web_Value) {
  return (
    <>
      <header>
        <Header
          setSidebarSwitch={setSidebarSwitch}
          sidebarSwitch={sidebarSwitch}
          setSidebarSize={setSidebarSize}
          sidebarSize={sidebarSize}
        />
      </header>

      <div>
        <Sidebar
          sidebarSwitch={sidebarSwitch}
          setSidebarSwitch={setSidebarSwitch}
          setSidebarSize={setSidebarSize}
          sidebarSize={sidebarSize}
        />
        <div
          className={
            !sidebarSize
              ? "md:ml-60 duration-500 overflow-scroll"
              : "md:ml-20 duration-500  overflow-scroll"
          }
        >
          <Outlet />
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
