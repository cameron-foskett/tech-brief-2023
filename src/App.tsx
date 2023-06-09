import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Favourites from "./pages/Favourites/Favourites";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function App() {
  //!----HINT HINT HINT------!//
  //!----Change the string below to your favourite artist------!//
  //!----HINT HINT HINT------!//
  const [searchCriteria, setSearchCriteria] = useState<string>("ARTIST");

  const handleSearch = (search: string) => {
    if (search === "") setSearchCriteria("artist");
    else setSearchCriteria(search);
  };

  return (
    <div className="full-page">
      <BrowserRouter>
        <div className="header">
          <div className="title">
            <span>MOOOSIC</span>
            <span>MADNESS</span>
          </div>
          <nav className="header-links">
            <NavLink
              className="link"
              to=""
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Home
            </NavLink>
            <NavLink
              className="link"
              to="favourites"
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Favourites
            </NavLink>
          </nav>
          <div className="searchBar">
            <TextField
              id=""
              label="Search"
              onChange={(e) => handleSearch(e.currentTarget.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home songData={searchCriteria} />} />
          <Route path="favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
