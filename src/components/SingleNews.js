import { makeStyles } from '@material-ui/core'
import React from 'react'
import { DarkThemeState } from '../ThemeContext'

const SingleNews = ({news}) => {

    const {darkTheme} = DarkThemeState();

  const useStyles = makeStyles(() => ({
      container: {
        cursor: 'pointer',
        position: 'relative',
        border: "2px solid black",
        width: 280,
        borderRadius: 5,
        margin: 8,
        padding: 6,
        backgroundColor: (darkTheme ? "#282828" : "#f3f6f7"),
        color: (darkTheme ? "white" : "black"),
      },
    
      newsBox: {
          // cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          // padding: 5,
          // margin: 5,
          // border: "2px solid black",
          // width: 280,
          // borderRadius: 5,
          // backgroundColor: (darkTheme ? "#282828" : "#f3f6f7"),
          // color: (darkTheme ? "white" : "black"),
      },
      link: {
        color: (darkTheme ? "white" : "#black"),
      },
      source: {
          transition: '0.5s ease',
          opacity: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          '&:hover': {
            background: 'rgba(0,0,0,0.5)',
            opacity: 1,
          }
      },
  }))

  const classes = useStyles();
  // console.log(news.content);

  return (
    <div className={classes.container}>

        <div className={classes.newsBox}>
            <img 
                src={news.urlToImage}
                alt=""
            />   
            <a 
                href={news.url} 
                className={classes.link}
                target="_blank"
            >
                {news.title}
            </a>
        </div>

        <a href={news.url} target='_blank'>
        <div className={classes.source}>
        </div>
        </a>
    </div>
  )
}

export default SingleNews