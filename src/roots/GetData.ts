import React from 'react';
if (!process.env.REACT_APP_API_KEY) {
  throw 'API KEY undefined';
}
const API_KEY: string = process.env.REACT_APP_API_KEY;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
};

export const GET_PLAYLIST = async (id: string) => {
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`,
    options
  );

  return response;
};

export const GET_MODAL = async (id: string) => {
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
    options
  );

  return response;
};
export const GET_SEARCH = async (search: string) => {
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`,
    options
  );

  return response;
};
