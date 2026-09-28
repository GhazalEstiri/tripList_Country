import { useState } from "react";
import "./App.css";
import Home from "./Page/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import CountryDetail from "./Page/CountryDetail";
import FavePage from "./Page/FavoritePage";
import Login from "./Page/Login";
import Countries from "./Page/Country";
import Profile from "./Page/Profile";
import MyTrip from "./Page/MyTrip";
import TripDetail from "./Page/TripDetail";
import { useReducer } from "react";
import { initialState, tripReducer } from "./Reducer/tripReducer";
function App() {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CountryDetail" element={<CountryDetail />} />
          <Route path="/Favorite" element={<FavePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Countries" element={<Countries />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/MyTrip"
            element={<MyTrip state={state} dispatch={dispatch} />}
          />
          <Route
            path="/TripDetail/:id"
            element={<TripDetail state={state} dispatch={dispatch} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
