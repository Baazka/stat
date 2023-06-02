import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
} from "react";
import Footer from "./components/Footer.js";
import Sidebar from "./components/Sidebar.js";
import Header from "./components/Header.js";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

function App() {
  const [sidebarSize, setSidebarSize] = useState(true);

  return (
    <div className="h-screen overflow-hidden w-full">
      <HashRouter
        getUserConfirmation={(message, callback) => {
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}
      >
        <Route path="/" exact>
          <Login

          // checkNotification={(value) => checkNotification(value)}
          />
        </Route>

        <Route path="/web">
          <Web
            sidebarSize={sidebarSize}
            setSidebarSize={setSidebarSize}

            // notification={notification !== null ? notification : []}
          />
        </Route>

        <div
          className={
            !sidebarSize ? "md:ml-60 duration-500" : "md:ml-20 duration-500"
            //zurag bg-zuragHee bg-cover bg-opacity-5
          }
        >
          <Route path="/web/Home/Audit" component={Home} exact />
        </div>
      </HashRouter>
    </div>
  );
}

function Web({ sidebarSize, setSidebarSize }) {
  const [sidebarSwitch, setSidebarSwitch] = useState(false);

  return (
    <div>
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
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
