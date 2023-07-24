import React from "react";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_DEEZER_API_KEY}`,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
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

export const GET_TRACK = async (id: string) => {
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
