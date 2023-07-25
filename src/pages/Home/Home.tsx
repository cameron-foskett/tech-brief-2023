import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useState, useEffect } from "react";
import "./Home.css";
import * as PlaylistManagement from "../../roots/GetData";
import { hover } from "@testing-library/user-event/dist/hover";

function Home(songData: any) {
  const [data, setData] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setID] = useState<any>(null);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [hoverOnImage, setHoverOnImage] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const getSongData = await PlaylistManagement.GET_SEARCH(
          songData.songData
        );
        const waitSongData = await getSongData.json();
        setData(waitSongData);
      } catch (e) {
        console.log(e);
      }
    };

    getPlaylistData();
  }, [songData, favourites]);

  useEffect(() => {
    const getTrackData = async () => {
      try {
        const getTrackData = await PlaylistManagement.GET_TRACK(id);
        const waitTrackData = await getTrackData.json();
        setID(waitTrackData);
      } catch (e) {
        console.log(e);
      }
    };
    getTrackData();
  }, [id]);

  const handleFavourite = (id: string) => {
    if (favourites.includes(id)) {
      let temp = favourites.filter((val: string) => {
        return val !== id;
      });
      setFavourites(temp);
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, id]);
    }
  };

  const helper = data?.data.map(({ id, artist, album, title }: any) => {
    console.log(id);
  });
  helper;

  //!----HINT HINT HINT------!//
  //!----Create a function to change the songs duration into minutes and seconds here p.s. stackoverflow will help here massively ------!//
  //!----HINT HINT HINT------!//

  const changeTime = (duration: number) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    function padTo2Digits(num: any) {
      return num.toString().padStart(2, "0");
    }
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result;
  };

  const listItems = data?.data.map(({ id, artist, album, title }: any) => (
    <Card
      key={id}
      className="custom-card"
      onMouseEnter={() => {
        setHoverOnImage((prevState) => ({ ...prevState, [id]: true }));
      }}
      onMouseLeave={() => {
        setHoverOnImage((prevState) => ({ ...prevState, [id]: false }));
      }}
      onClick={() => {
        setID(`${id}`);
        setOpenModal(true);
      }}
      //!----HINT HINT HINT------!//
      //!----These inline stylings can be useful for certain parts of the code - try adding a hover css to apply shadow changes------!//
      //!----HINT HINT HINT------!//
      sx={{
        maxHeight: 480,
        boxShadow: "none",
        backgroundColor: `${
          hoverOnImage[id] ? "rgba(225,225,225,0.1)" : "#353535 !important"
        }`,
      }}
    >
      <div className="learn-more-button">
        <Button
          size="medium"
          sx={{
            color: "#fff",
            display: `${hoverOnImage[id] ? "show" : "none"}`,
          }}
        >
          Learn More
        </Button>
      </div>
      <CardMedia
        sx={{ height: "330px", width: "auto", borderRadius: "16px" }}
        component="img"
        alt={"Album Cover for " + album.title}
        image={album.cover_xl}
        title={artist.name}
      />
      <CardContent sx={{ height: "auto" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{artist.name}</Typography>
      </CardContent>
      <CardActions
        sx={{ height: 0, paddingTop: 0, alignItems: "right", width: "330px" }}
      >
        <IconButton
          aria-label="add to favorites"
          className="card-icon"
          onClick={() => handleFavourite(id)}
        >
          {!favourites.includes(id) ? (
            <FavoriteBorderOutlinedIcon />
          ) : (
            <FavoriteIcon sx={{ color: "#e91e63" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  ));

  return (
    <>
      <div className="full-page">
        {data ? (
          <>
            <div className="output">{listItems}</div>
          </>
        ) : (
          "Loading..."
        )}

        {openModal && id && (
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="song-modal"
          >
            <Box className="modal-content">
              <img src={id.artist.picture_xl} className="modal-image" />
              <div className="modal-text">
                <div className="title_favourite">
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h4"
                  >
                    {id.title}
                  </Typography>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleFavourite(id)}
                  >
                    {!favourites.includes(id) ? (
                      <FavoriteBorderOutlinedIcon />
                    ) : (
                      <FavoriteIcon sx={{ color: "#e91e63" }} />
                    )}
                  </IconButton>
                </div>
                <Typography
                  className="modal-album-title"
                  variant="h6"
                  component="h6"
                >
                  {id.album.title}
                </Typography>
                <span className="divider"></span>
                <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                  Artist: <div className="album-info">{id.artist.name}</div>
                </Typography>
                <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                  Album: <div className="album-info">{id.album.title}</div>
                </Typography>
                <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                  Duration: <div className="album-info">{id.duration}</div>
                </Typography>
              </div>
              <audio className="modal-audio" controls src={id.preview} />
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Home;
