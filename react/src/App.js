import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import AddAccount from "./AddAccount";
import ViewAccount from "./ViewAccount";
import Error from "./Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/addAccount" element={<AddAccount/>} />
        <Route path="/viewAccount" element={<ViewAccount/>} />
        <Route element={Error} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
