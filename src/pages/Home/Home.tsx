import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  Box,
  IconButton,
  CircularProgress,
  Grow,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React, { useState, useEffect } from 'react';
import './Home.css';
import * as PlaylistManagement from '../../roots/GetData';

type HomeProps = {
  searchCriteria: string;
  handleFavourite: any;
  favourites: string[];
};

const Home: React.FunctionComponent<HomeProps> = ({
  searchCriteria,
  handleFavourite,
  favourites,
}) => {
  const [data, setData] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setID] = useState<any>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [groupedArtistData, setGroupedArtistData] = useState<any>(null);
  const [playSong, setPlaySong] = useState<boolean>(false);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const getSongData = await PlaylistManagement.GET_SEARCH(searchCriteria);
        const songData = await getSongData.json();
        setData(songData);
      } catch (e) {
        console.error(e);
      }
    };

    getPlaylistData();
  }, [searchCriteria, favourites]);

  useEffect(() => {
    if (!openModal) return;
    const getTrackData = async () => {
      try {
        const getTrackData = await PlaylistManagement.GET_MODAL(id);
        const modalData = await getTrackData.json();
        setModalData(modalData);
      } catch (e) {
        console.error(e);
      }
    };

    getTrackData();
  }, [openModal]);

  const secondsToMinutes = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const str_pad_left = (string: number, pad: string, length: number) => {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    };
    return str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
  };

  type GroupedResult<T> = { [key: string]: T[] };

  const groupBy = <T extends unknown>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => string
  ): GroupedResult<T> =>
    array.reduce((acc, value, index, array) => {
      const key = predicate(value, index, array);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(value);
      return acc;
    }, {} as GroupedResult<T>);

  useEffect(() => {
    if (!data) return;
    const groupedArtistData = groupBy(
      data.data,
      (track: any) => track.artist.name
    );
    setGroupedArtistData(groupedArtistData);
  }, [data]);

  return (
    <div className="full-page" style={{ marginTop: '16vh' }}>
      {data && groupedArtistData ? (
        <>
          {Object.entries(groupedArtistData).map(([artist, tracks]: any) => (
            <>
              <Typography className="artist-title">{artist}</Typography>
              <div className="output">
                {tracks.map(({ id, artist, album, title }: any) => (
                  <Grow key={id} in>
                    <Card
                      key={id}
                      className="custom-card"
                      sx={{
                        overflow: 'visible !important',
                        boxShadow: 'none',
                        backgroundColor: '#353535',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                        },
                        '&:hover .learn-more-button': {
                          display: 'block',
                        },
                      }}
                    >
                      <div className="learn-more-button">
                        <Button
                          size="medium"
                          sx={{ color: '#fff' }}
                          onClick={() => {
                            setOpenModal(true);
                            setID(id);
                          }}
                        >
                          Learn More
                        </Button>
                      </div>
                      <CardMedia
                        sx={{
                          height: '330px',
                          width: '330px',
                          borderRadius: '16px',
                          zIndex: 0,
                          margin: 'auto',
                        }}
                        image={album.cover_big}
                        title={artist.name}
                        className="album-cover"
                      />
                      <CardContent
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 0,
                        }}
                      >
                        <CardContent sx={{ height: 30 }}>
                          <Typography gutterBottom className="card-title">
                            {title}
                          </Typography>
                          <Typography className="card-album-title">
                            {album.title}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ height: 35, paddingTop: 3 }}>
                          <IconButton
                            aria-label="add to favorites"
                            className="card-icon"
                            onClick={() => handleFavourite(id)}
                          >
                            {!favourites.includes(id) ? (
                              <FavoriteBorderOutlinedIcon />
                            ) : (
                              <FavoriteIcon sx={{ color: '#e91e63' }} />
                            )}
                          </IconButton>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </div>
            </>
          ))}
        </>
      ) : (
        <CircularProgress />
      )}

      {openModal && id && modalData && (
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="song-modal"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box className="modal-content">
            <IconButton
              onClick={() => {
                setID(null);
                setModalData(null);
                setOpenModal(false);
                setPlaySong(false);
              }}
              sx={{
                padding: 0,
              }}
            >
              <CloseIcon
                sx={{
                  marginLeft: 'auto',
                  marginRight: '10px',
                  fill: '#FFF',
                  marginTop: '10px',
                }}
              />
            </IconButton>
            <img src={modalData.album.cover_big} className="modal-image" />
            <div className="modal-text">
              <div className="title_favourite">
                <Typography
                  id="modal-modal-title"
                  sx={{
                    fontSize: '32px',
                    fontWeight: 700,
                    fontFamily: 'Oswald',
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {modalData.title}
                </Typography>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleFavourite(modalData.id)}
                >
                  {!favourites.includes(modalData.id) ? (
                    <FavoriteBorderOutlinedIcon />
                  ) : (
                    <FavoriteIcon sx={{ color: '#e91e63' }} />
                  )}
                </IconButton>
              </div>
              <Typography
                className="modal-album-title"
                variant="h6"
                component="h6"
              >
                {modalData.album.title}
              </Typography>
              <span className="divider"></span>
              <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                Artist:{' '}
                <div className="album-info">{modalData.artist.name}</div>
              </Typography>
              <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                Album: <div className="album-info">{modalData.album.title}</div>
              </Typography>
              <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                Duration:{' '}
                <div className="album-info">
                  {secondsToMinutes(modalData.duration)}
                </div>
              </Typography>
            </div>

            {playSong ? (
              <audio className="modal-audio" controls src={modalData.preview} />
            ) : (
              <div className="play-song-button">
                <Button
                  size="medium"
                  sx={{ color: '#fff', textTransform: 'none' }}
                  onClick={() => {
                    setPlaySong(true);
                  }}
                >
                  Play song
                </Button>
              </div>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Home;
