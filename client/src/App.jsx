
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App(){
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="users/guest" replace/>}/>
        <Route path="/users/guest" element={<Home />}/>
        <Route path="/users/:username" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  )
}