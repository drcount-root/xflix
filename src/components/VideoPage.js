import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import Loading from "../utils/Loading";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { TimeFormat } from "../utils/TimeFormat";
import { useSnackbar } from "notistack";
import { config } from "../App";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";

const VideoPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectVideo, setSelectVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const { id } = useParams();

  const fetchVideoById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.endpoint}/${id}`);
      const data = await response.data;
      setSelectVideo(data);
      setUpVote(data.votes.upVotes);
      setDownVote(data.votes.downVotes);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const updateViews = async () => {
    const response = await axios.patch(`${config.endpoint}/${id}/views`);
    return response;
  };

  useEffect(() => {
    fetchVideoById();
    updateViews();

    // eslint-disable-next-line
  }, [id]);

  const patchVoteData = async (vote) => {
    const voteData = {
      vote: vote,
      change: "increase",
    };

    try {
      const response = await axios.patch(
        `${config.endpoint}/${id}/votes`,
        voteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const handleUpVote = () => {
    setUpVote(upVote + 1);
    patchVoteData("upVote");
  };

  const handleDownVote = () => {
    setDownVote(downVote + 1);
    patchVoteData("downVote");
  };

  return (
    <Box sx={{ marginTop: "9vh" }}>
      <Navbar videoDetails={true} />
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box className="ifarme-container">
            <iframe
              className="iframe"
              src={`https://www.${selectVideo.videoLink}`}
              title={selectVideo.title}
            />
          </Box>
          <Box sx={{ width: "80vw", marginTop: "16px" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ color: "#fff" }}>
                <Typography variant="h5">{selectVideo.title}</Typography>
                <Typography variant="p">
                  {selectVideo.contentRating} |{" "}
                  {<TimeFormat releaseDate={selectVideo.releaseDate} />}
                </Typography>
              </Box>

              <Box>
                <Button onClick={handleUpVote}>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <ThumbUpIcon />
                    <Typography
                      variant="p"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      {upVote}
                    </Typography>
                  </Stack>
                </Button>

                <Button onClick={handleDownVote}>
                  <Stack direction="row" gap="10px" alignItems="center">
                    <ThumbDownIcon />
                    <Typography
                      variant="p"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      {downVote}
                    </Typography>
                  </Stack>
                </Button>
              </Box>
            </Stack>
          </Box>
          <hr />
        </Box>
      )}

      <LandingPage videoDetails={true} />
    </Box>
  );
};

export default VideoPage;
