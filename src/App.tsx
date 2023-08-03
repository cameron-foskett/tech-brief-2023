import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Favourites from './pages/Favourites/Favourites';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { Input, Paper, Snackbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<string>('axel f');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const handleFavourite = (id: string) => {
    if (favourites.includes(id)) {
      let temp = favourites.filter((val: string) => {
        return val !== id;
      });
      setOpenToast(true);
      setFavourites(temp);
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, id]);
    }
  };
  useEffect(() => {
    const timeOutId = setTimeout(
      () => setSearchCriteria(query === '' ? 'axel f' : query),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className="full-page">
      <link
        href="https://fonts.googleapis.com/css?family=Oswald"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
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
                textDecoration: isActive ? 'underline' : 'none',
              })}
            >
              Home
            </NavLink>
            <NavLink
              className="link"
              to="favourites"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
              })}
            >
              Favourites
            </NavLink>
          </nav>
          <div className="searchBar">
            <Paper
              component="form"
              sx={{
                p: '15px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '306px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
              }}
            >
              <Input
                sx={{
                  ml: 1,
                  flex: 1,
                  '& ::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '16px',
                    fontFamily: 'Roboto',
                  },
                }}
                disableUnderline
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />

              <SearchIcon
                sx={{
                  fillOpacity: 0.3,
                  fill: 'var(--transparent, #FFF)',
                  backgroundBlendMode: 'multiply',
                }}
              />
            </Paper>
          </div>
        </div>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          message={'Removed from your Favourited Songs'}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setOpenToast(false)}
          sx={{ mt: '6rem' }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchCriteria={searchCriteria}
                handleFavourite={handleFavourite}
                favourites={favourites}
              />
            }
          />
          <Route
            path="favourites"
            element={
              <Favourites
                handleFavourite={handleFavourite}
                favourites={favourites}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
