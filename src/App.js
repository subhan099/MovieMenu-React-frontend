import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CreateMoviePage from "./Pages/CreateMoviePage";
import UpdateMoviePage from "./Pages/UpdateMoviePage";
import SignUp from "./Pages/SignUp";
import MyFavourites from "./Pages/MyFavourites";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-favourites" element={<MyFavourites />} />
        <Route path="/add-movie" element={<CreateMoviePage />} />
        <Route path="/update-movie" element={<UpdateMoviePage />} />
      </Routes>
    </>
  );
}

export default App;
