import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const ThemeContext = createContext()
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.querySelector('html').setAttribute('class', theme)
    },[theme])
    
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;