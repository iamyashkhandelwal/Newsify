import { makeStyles, Container, createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchedNews from './components/SearchedNews';
import TrendingNews from './components/TrendingNews';
import { DarkThemeState } from './ThemeContext';



function App() {

  const [input, setInput] = useState('');
  const [country, setCountry] = useState('in');
  const [category, setCategory] = useState('general');

  const {darkTheme} = DarkThemeState();

  const dTheme = createTheme({
    palette: {
        background: {
          default: '#484848'
        },
        primary: {
          main: '#ffffff'
        },
    }
  })

// default: '#dddddd'

  const lTheme = createTheme({
    palette: {
        background: {
          default: '#e2eaed'
        },
        primary: {
          main: '#000000'
        },
    }
  })

  const useStyles = makeStyles(() => ({
    searchContainer: {
      width: "100%",
      borderBottom: "2px solid gray"
    },
   
  }))

  const classes = useStyles();

  const onInputChange = (e) => {
    // console.log('onInputChange');
    // e.preventDefault();
    // console.log(e.target.value);
    setInput(e.target.value);
  }

  const onCountryChange = (e) => {
    // console.log(e.target.value);
    setCountry(e.target.value);
  }

  const onCategoryChange = (e) => {
    // console.log(e.target.value);
    setCategory(e.target.value);
  }
  
    return (
      
        <ThemeProvider theme={darkTheme ? dTheme : lTheme}>
          <CssBaseline />
        <Header />
          <Container style={{textAlign: "center"}}>
          <div className={classes.searchContainer}>
            <SearchBar onInputChange={onInputChange} />
          </div>
            
            {
              input === '' 
              ? <TrendingNews 
                  country={country} 
                  category={category}
                  onCountryChange={onCountryChange}
                  onCategoryChange={onCategoryChange}/> 
              : <SearchedNews input={input}/>
            }

          </Container>

          <Footer />
        </ThemeProvider>

    );

  
}

export default App;
