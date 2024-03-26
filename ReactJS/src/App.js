import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/signin/signin";
import Helper from "./helper";
import PageNotFound from "./components/pageNotFound";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <>
      <Helper />
      <Router>
        <Routes>
          <Route exact path="/" Component={SignIn} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="*" Component={PageNotFound} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
