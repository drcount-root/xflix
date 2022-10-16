import React, { useState } from 'react'
import FileUploadIcon from "@mui/icons-material/FileUpload"
import CloseIcon from '@mui/icons-material/Close'
import {
    Box,
    Stack,
    Typography,
    Select,
    Button,
    TextField,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Modal
} from "@mui/material"
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import axios from "axios"
import { config } from "../App"
import { useSnackbar } from "notistack"
import './Upload.css'
// import { styled } from '@mui/material/styles';
// const CssTextField = styled(TextField)({
//     '& label.Mui-focused': {
//         color: 'black',
//     },
//     '& .MuiInput-underline:after': {
//         borderBottomColor: 'black',
//     },
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             borderColor: 'black',
//         },
//         '&:hover fieldset': {
//             borderColor: 'black',
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: 'black',
//         },
//     },
// });
const UploadVideo = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(new Date())
    const [postData, setPostData] = useState({
        videoLink: "",
        previewImage: "",
        title: "",
        contentRating: "",
        genre: "",
        releaseDate: value,

    })

    let dateString = ""

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleLink = (link) => {
        let urlLink = new URL(link)
        console.log(urlLink)
        let videoParam = urlLink.searchParams.get("v")
        // console.log(videoParam);
        const finalVideoLink = `youtube.com/embed/${videoParam}`
        setPostData({ ...postData, videoLink: finalVideoLink })
    }

    //https://i.ytimg.com/vi/nx2-4l4s4Nw/mqdefault.jpg
    //youtube.com/embed/nx2-4l4s4Nw

    const handleDateChange = (newValue) => {
        setValue(newValue)
        const years = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]

        const date = newValue.getDate();

        const month = years[newValue.getMonth()];

        const fullYear = newValue.getFullYear();

        dateString = date + " " + month + " " + fullYear;

        setPostData({ ...postData, releaseDate: dateString });
    }

    const handlePostData = async (dataPost) => {
        const data = dataPost;
        if (
            data.videoLink &&
            data.title &&
            data.genre &&
            data.contentRating &&
            data.releaseDate &&
            data.previewImage
        ) {
            try {
                // eslint-disable-next-line
                const response = await axios.post(`${config.endpoint}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                handleClose();
                enqueueSnackbar("Uploaded Successfully", { variant: "success" })
                //return response.data

            } catch (error) {
                enqueueSnackbar(error.response.data.message, { variant: "error" })

            }
        } else if (!data.videoLink) {
            enqueueSnackbar("link must be a valid url", { variant: "warning" })

        } else {
            enqueueSnackbar("All fields are required", { variant: "warning" })

        }
    }



    return (
        <div>
            <Button
                sx={{
                    bgcolor: "secondary.main", color: "white", ':hover': {
                        bgcolor: 'primary.light',
                        color: 'white',
                    },
                }}
                variant="contained"
                startIcon={<FileUploadIcon />}
                onClick={handleOpen}
            >
                Upload
            </Button>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='upload-modal'>
                    <Stack gap="10px" justifyContent="flex-start">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",

                            }}
                        >
                            <Typography
                                id="upload-btn-submit"
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "2px",color:'white' }}
                            >
                                Upload Video
                            </Typography>
                            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" ,color:'white'}} />
                        </Box>
    
                        <TextField
                            className="video-tile-link"
                            id="videoLink"
                            placeholder='Video Link'
                            variant="outlined"
                            helperText="This link will be used to derive the video"
                            onChange={(e) => handleLink(e.target.value)}
                        />
                        <TextField
                            className="video-tile-link"
                            id="thumbnailImageLink"
                            placeholder="Thumbnail Image Link"
                            variant="outlined"
                            helperText="This link will be used to preview the thumbnail image"
                            onChange={(e) =>
                                setPostData({ ...postData, previewImage: e.target.value })
                            }
                        />
                        <TextField
                            className="video-tile-link"
                            id="title"
                            placeholder="Title"
                            variant="outlined"
                            helperText="This title will be representative text for video"
                            onChange={(e) =>
                                setPostData({ ...postData, title: e.target.value })
                            }
                        />
                        <FormControl>
                            <InputLabel id="genre">Genre</InputLabel>
                            <Select
                                className="genre-btn"
                                labelId="genre"
                                id="genreFilter"
                                label="Genre"
                                value={postData.genre}
                                onChange={(e) =>
                                    setPostData({ ...postData, genre: e.target.value })
                                }
                            >
                                <MenuItem value={"Education"}>Education</MenuItem>
                                <MenuItem value={"Sports"}>Sports</MenuItem>
                                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                                <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                                {/* <MenuItem value={"Movies"}>Movies</MenuItem> */}
                            </Select>
                            <FormHelperText sx={{ marginBottom: "4px" }}>
                                Genre will help in categorizing your videos
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="age">Suitable age group for the clip</InputLabel>
                            <Select
                                labelId="age"
                                id="ageFilter"
                                value={postData.contentRating}
                                label="Suitable age group for the clip"
                                onChange={(e) =>
                                    setPostData({ ...postData, contentRating: e.target.value })
                                }
                            >
                                {/* <MenuItem value={"Anyone"}>Anyone</MenuItem> */}
                                <MenuItem value={"7+"}>7+</MenuItem>
                                <MenuItem value={"12+"}>12+</MenuItem>
                                <MenuItem value={"16+"}>16+</MenuItem>
                                <MenuItem value={"18+"}>18+</MenuItem>
                            </Select>
                            <FormHelperText sx={{ marginBottom: "4px" }}>
                                This will be used to filter videos on age group suitability
                            </FormHelperText>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Upload and Publish Date"
                                inputFormat="dd/MM/yyyy"
                                value={value}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        helperText="This will be used to sort videos"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                borderRadius: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ color: "#fff", textTransform: "uppercase", border: "0" }}
                                onClick={() => handlePostData(postData)}
                            >
                                Upload Video
                            </Button>
                            <Button
                                id="upload-btn-cancel"
                                variant="text"
                                sx={{ color: "white", textTransform: "uppercase", fontSize: "1rem", fontWeight: "bold" }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default UploadVideo