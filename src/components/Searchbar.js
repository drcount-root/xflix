import React from 'react'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  });


const Searchbar = ({change}) => {
  return (
    <><CssTextField onChange={change} sx={{width:"20rem"}} label="Search" id="custom-css-outlined-input" 
    InputProps={{
        endAdornment:(
            <InputAdornment position="end">
                <SearchIcon color="white"/>
            </InputAdornment>
        )
    }}/></>
  )
}

export default Searchbar