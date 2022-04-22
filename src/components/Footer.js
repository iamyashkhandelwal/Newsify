import { makeStyles } from '@material-ui/core';
import React from 'react';
import { DarkThemeState } from '../ThemeContext';


const Footer = () => {

    const {darkTheme, setDarkTheme} = DarkThemeState();

    const useStyles = makeStyles(() => ({
        container: {
            width: '100%',
            // height: 70,
            padding: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: (darkTheme ? "#282828" : "#b4bbbd"),
            color: (darkTheme ? "#fff" : "#000"),
            
        }

    }))

    const classes = useStyles();
  return (
    <div className={classes.container}>
        <span>
            Copyright &copy; 2022
        </span>
        <span>
            All Rights Reserved 
        </span>
        <span>
            Made with ❤️ by <em>YASH KHANDELWAL</em>.
        </span>
    </div>
  )
}

export default Footer