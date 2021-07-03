import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import SideBar from "./components/SideBar";

import GlobalStyle from "./styles/global";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <MenuBar />
      <Routes />
      <SideBar />
    </Router>
  );
}

export default App;
