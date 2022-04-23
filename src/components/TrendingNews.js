import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, makeStyles, CircularProgress } from '@material-ui/core'
import axios from 'axios';
import { TopHeadlines } from '../news-api/NewsAPI';
import {categoryList, countryList} from '../news-api/data'
import SingleNews from './SingleNews';
import { Pagination } from '@material-ui/lab';
import { DarkThemeState } from '../ThemeContext';


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TrendingNews = ({country, category, onCategoryChange, onCountryChange}) => {

  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);

  const {darkTheme} = DarkThemeState();

  const useStyles = makeStyles(() => ({
    filters: {
      display: "flex",
      justifyContent: "space-around",
      padding: 20
    },
    select: {
      color: (darkTheme ? "white" : "black"),
      borderColor: (darkTheme ? "white" : "black")
    },
    newsContainer: {
      minHeight: "50vh",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
      padding: 20
    },
    pagination:{
      display: "flex",
      justifyContent: "center",
      margin: 20
    }
  }))

  const classes = useStyles();

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      //fetching top 40 headlines
      const result1 = await axios.get(TopHeadlines(country, category, 1));
      // console.log(result1);
      // console.log(result1.status); //check for status and then proceed
      if(result1?.status === 200) {
        let result2 = [];
        if(result1.data.totalResults > 20)
          result2 = await axios.get(TopHeadlines(country, category, 2))

        const finalResult = [...result1.data.articles, ...result2.data.articles];
        // console.log(finalResult);

        setNewsData(finalResult);
      }
      else {
        console.log(result1);
        return(<h3>{result1.status}</h3>)
      }
      
    }

    fetchTopHeadlines();
  }, [country, category])

  console.log(newsData);
  // console.log(newsData[0].content);

  return (
    <>
      <div className={classes.filters}>
        <FormControl
          style={{minWidth: 100}}>
          <InputLabel
            id="demo-simple-select-label"
            className={classes.select}
          >
            Category
          </InputLabel>
          <Select 
            className={classes.select}
            variant='outlined'
            label='Category'
            onChange={onCategoryChange}
            value={category}  
          >
            {categoryList.map((c) => {
              return(
                <MenuItem 
                  key={c}
                  value={c} 
                >{capitalizeFirstLetter(c)}
              </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel 
            id="demo-simple-select-label" 
            className={classes.select}
          >
            Country
          </InputLabel>
          <Select 
            className={classes.select}
            variant='outlined'
            label='Country'
            onChange={onCountryChange}
            value={country}  
          >
            {countryList.map((c) => {
              return(
                <MenuItem 
                  key={c.code}
                  value={c.code} 
                >{c.name}
              </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>

      {/* {
      !newsData.length 
      ? <CircularProgress />
      : <div className={classes.newsContainer}>
      TrendingNews
    </div>
      } */}

    <div className={classes.newsContainer}>
    {
      !newsData.length 
      ? <CircularProgress />
      : newsData.slice((page-1)*12, (page-1)*12 + 12).map((news, idx) => {
        return(
          <SingleNews key={idx} news={news} />
        )
      })
    }

    </div>

    
      <Pagination
        className={classes.pagination}
        count={(newsData.length)%12 ? Number(((newsData.length)/12).toFixed(0)) + 1 : Number(((newsData.length)/12).toFixed(0))}
        page={page}
        onChange={(e,page) => setPage(page)} 
      />
      
    </>
  )
}

export default TrendingNews