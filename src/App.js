import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";
import ScrollToTop from "./utils/ScrollToTop";


const theme = createTheme({
  spacing: 10,
  palette: {
    mode: "dark",
    primary: {
      main: "#202020",
      light: "#9005fa"
    },
    secondary: {
      main: "#2196f3",
    }
    // customRibRed: {
    //   main: red[400],
    //   superDark: red[800],
    //   superLight: red[100]
    // }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
  // typography: {
  //   myVariant: {
  //     fontSize: "2rem"
  //   }
  // }
});
export const config = {
  //Mock server api
  // endpoint: 'https://937eb2d1-2b0f-42e1-af80-2c776b32bcc1.mock.pstmn.io/v1/videos'
  endpoint: "https://xflixbackendapp.herokuapp.com/v1/videos",
};


export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <ScrollToTop />
        <Box sx={{ backgroundColor: "#181818" }}>
          <Routes>
            <Route path="/" exact element={<LandingPage />}></Route>
            <Route path="/video/:id" element={<VideoPage />}></Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>

  );
}
