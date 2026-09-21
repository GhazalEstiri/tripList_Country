import { useState } from "react";
import "./App.css";
import Home from "./Page/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import CountryDetail from "./Page/CountryDetail";
import FavePage from "./Page/FavoritePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CountryDetail" element={<CountryDetail />} />
          <Route path="/Favorite" element={<FavePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
