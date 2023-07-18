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
//!----HINT HINT HINT------!//
//!----Add a new function here for the get track feature that the modal pop up can use use the DEEZER DOCS to help you get the correct url
///https://rapidapi.com/deezerdevs/api/deezer-1------!//
//!----HINT HINT HINT------!//

export const GET_SEARCH = async (search: string) => {
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`,
    options
  );

  return response;
};
