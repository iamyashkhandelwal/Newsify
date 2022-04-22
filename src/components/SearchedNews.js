import { CircularProgress, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SearchByInput } from '../news-api/NewsAPI'
import SingleNews from './SingleNews';

const SearchedNews = ({input}) => {
  const [searchedNewsData, setSearchedNewsData] = useState([]);
  const [page, setPage] = useState(1);

  const useStyles = makeStyles(() => ({
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
    const fetchNews = async () => {
      const {data} = await axios.get(SearchByInput(input, 1));

      let maxPages = data.totalResults%20 === 0 ? ~~(data.totalResults/20) : ~~(data.totalResults/20) + 1;

      //because as a developer we can fetch at max 5 pages
      let maxLimit = Math.min(maxPages, 5);
      let finalData = [...data.articles];
      for(let page=2; page<=maxLimit; page++){
        const {data} = await axios.get(SearchByInput(input, page));

        finalData = [...finalData, ...data.articles]
      }

      // console.log(finalData);
      setSearchedNewsData(finalData);
    }

    // fetchNews();
    //debouncing....
    const timerID = setTimeout(() => {
      if(input) {
        console.log(`fetching..... for ${input}`);
        fetchNews();
      }
    }, 500);

    return () => {
      clearTimeout(timerID);
    }
  }, [input])

  return (
    <>
      {/* <div>News searched for {input}</div> */}

      <div className={classes.newsContainer}>
    {
      !searchedNewsData.length 
      ? <CircularProgress />
      : searchedNewsData.slice((page-1)*12, (page-1)*12 + 12).map((news, idx) => {
        return(
          <SingleNews key={idx} news={news} />
        )
      })
    }

    </div>

    <Pagination
        className={classes.pagination}
        count={(searchedNewsData.length)%12 ? Number(((searchedNewsData.length)/12).toFixed(0)) + 1 : Number(((searchedNewsData.length)/12).toFixed(0))}
        page={page}
        onChange={(e,page) => setPage(page)} 
      />
    </>
  )
}

export default SearchedNews