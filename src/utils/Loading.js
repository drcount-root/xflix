import React from 'react'
import {
    Box,
    Typography,
    Stack,
    CircularProgress,
} from '@mui/material'

const Loading = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Stack gap="20px" alignItems="center" color="#ffff">
                <CircularProgress sx={{color:"white"}} />
                <Typography variant="h6">Loading...</Typography>
            </Stack>
        </Box>
    )
}

export default Loading