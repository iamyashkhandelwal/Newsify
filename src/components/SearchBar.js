import React from 'react'
import { TextField } from '@material-ui/core'

const SearchBar = ({onInputChange}) => {

  // const useStyles = makeStyles(() => ({
  //   searchContainer: {
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     padding: 40
  //   }
  // }))
  // const classes = useStyles();
  return (
      <>
        <TextField 
            style={{width: '80%', margin: 40}}
            label='Search News'
            variant='outlined'
            onChange={onInputChange}
        />
      </>
  )
}

export default SearchBar