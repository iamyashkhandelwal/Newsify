import React, { createContext, useContext, useState } from 'react'

const Theme = createContext();

const ThemeContext = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <Theme.Provider value={{darkTheme, setDarkTheme}}>{children}</Theme.Provider>
  )
}

export default ThemeContext;

export const DarkThemeState = () => {
    return useContext(Theme);
}