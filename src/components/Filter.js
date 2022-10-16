import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
// import Buttoncomp from './Buttoncomp'
import useMediaQuery from "@mui/material/useMediaQuery";
import Searchbar from "./Searchbar";
const Filter = ({ func1, func2, funcChange, handleSortBy }) => {
  //button for genre
  // const buttn = ["All Genre-Btn", "Education", "Sports", "comedy", "Lifestyle"];
  //button for age
  const [allGenere, setAllGenere] = useState(true);
  const [education, setEducation] = useState(false);
  const [sports, setSports] = useState(false);
  const [comedy, setComedy] = useState(false);
  const [allAge, setAllAge] = useState(true);
  const [seven, setSeven] = useState(false);
  const [twelve, setTwelve] = useState(false);
  const [sixteen, setSixTeen] = useState(false);
  const [eighteen, seteighteen] = useState(false);

  const allAgeTrue = () => {
    setSixTeen(false);
    setAllAge(true);
    setSeven(false);
    seteighteen(false);
    setTwelve(false);
  };
  const sevenTrue = () => {
    setSixTeen(false);
    setAllAge(false);
    setSeven(true);
    seteighteen(false);
    setTwelve(false);
  };
  const twelveTrue = () => {
    setSixTeen(false);
    setAllAge(false);
    setSeven(false);
    seteighteen(false);
    setTwelve(true);
  };
  const sixteenTrue = () => {
    setSixTeen(true);
    setAllAge(false);
    setSeven(false);
    seteighteen(false);
    setTwelve(false);
  };
  const eighteenTrue = () => {
    setSixTeen(false);
    setAllAge(false);
    setSeven(false);
    seteighteen(true);
    setTwelve(false);
  };

  const caseTrue = {
    bgcolor: "white",
    color: "black",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    mx: "1rem",
    my: "1rem",
    ":hover": {
      bgcolor: "white",
      color: "black",
    },
  };
  const caseFalse = {
    bgcolor: "primary.main",
    color: "white",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    mx: "1rem",
    my: "1rem",
    ":hover": {
      bgcolor: "primary.light",
      color: "white",
    },
    ":active": {
      bgcolor: "white",
      color: "black",
    },
  };
  //media query for responsive design;
  const matches = useMediaQuery("(min-width:750px)");

  // setting all genere True false for style;
  const toggleGenere = () => {
    setAllGenere(true);
    setComedy(false);
    setEducation(false);
    setSports(false);
  };
  const restOfGeneres = (e) => {
    setAllGenere(false);
    const name = e.target.value;
    if (name === "Comedy") {
      setComedy(true);
    }
    if (name === "Education") {
      setEducation(true);
    }
    if (name === "Sports") {
      setSports(true);
    }
  };

  return (
    <Box
      key={"outerdiv"}
      sx={{
        marginTop: "9vh",
        paddingTop: "5vh",
        width: "full",
        height: "auto",
        bgcolor: "primary.main",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!matches ? <Searchbar change={funcChange} /> : ""}
      <Box
        key={"genre-button"}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Button
          key={"All-Genere-Btn"}
          value={"All-Genere-Btn"}
          onClick={(e) => {
            toggleGenere();
            func1(e);
          }}
          variant="contained"
          name="All-Genere-Button"
          sx={allGenere ? caseTrue : caseFalse}
        >
          All-Genere-Btn
        </Button>
        <Button
          key={"Education"}
          onClick={(e) => {
            restOfGeneres(e);
            func1(e);
          }}
          value={"Education"}
          variant="contained"
          name="Education"
          sx={education ? caseTrue : caseFalse}
        >
          Education
        </Button>
        <Button
          key={"Sports"}
          onClick={(e) => {
            restOfGeneres(e);
            func1(e);
          }}
          value={"Sports"}
          variant="contained"
          name="Sports"
          sx={sports ? caseTrue : caseFalse}
        >
          Sports
        </Button>
        <Button
          key={"Comedy"}
          onClick={(e) => {
            restOfGeneres(e);
            func1(e);
          }}
          value={"Comedy"}
          variant="contained"
          name="Comedy"
          sx={comedy ? caseTrue : caseFalse}
        >
          Comedy
        </Button>
        <Button
          key={"Lifestyle"}
          onClick={(e) => {
            toggleGenere();
            func1(e);
          }}
          value={"Lifestyle"}
          variant="contained"
          name="Lifestyle"
          sx={caseFalse}
        >
          Lifestyle
        </Button>

        <Stack
          sx={{
            bgcolor: "white",
            color: "black",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "25px",
            cursor: "pointer",
            width: "200px",
            margin: "auto",
          }}
          direction="row"
          alignItems="center"
          gap="10px"
        >
          <KeyboardDoubleArrowUpIcon />
          <select
            sx={{ border: "none" }}
            //   value={sortBy}
            onChange={handleSortBy}
          >
            <option
              style={{ height: "50px" }}
              id="release-date-option"
              value={"releaseDate"}
            >
              Release Date
            </option>
            <option id="view-count-option" value={"viewCount"}>
              View Count
            </option>
          </select>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          key={"all-age"}
          onClick={(e) => {
            func2(e);
            allAgeTrue();
          }}
          value={"Anyone"}
          variant="contained"
          name="Lifestyle"
          sx={allAge ? caseTrue : caseFalse}
        >
          Any Age Group
        </Button>
        <Button
          key={"7+"}
          onClick={(e) => {
            func2(e);
            sevenTrue();
          }}
          value={7}
          variant="contained"
          name="Lifestyle"
          sx={seven ? caseTrue : caseFalse}
        >
          7+
        </Button>
        <Button
          key={"12+"}
          onClick={(e) => {
            func2(e);
            twelveTrue();
          }}
          value={12}
          variant="contained"
          name="Lifestyle"
          sx={twelve ? caseTrue : caseFalse}
        >
          12+
        </Button>
        <Button
          key={"16+"}
          onClick={(e) => {
            func2(e);
            sixteenTrue();
          }}
          value={16}
          variant="contained"
          name="Lifestyle"
          sx={sixteen ? caseTrue : caseFalse}
        >
          16+
        </Button>
        <Button
          key={"18+"}
          onClick={(e) => {
            func2(e);
            eighteenTrue();
          }}
          value={18}
          variant="contained"
          name="Lifestyle"
          sx={eighteen ? caseTrue : caseFalse}
        >
          18+
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
