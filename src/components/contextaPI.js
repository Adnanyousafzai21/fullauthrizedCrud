import { createContext, useState } from "react";

const themeContext = createContext()


const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(false)
    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    )
}

export { ThemeProvider, themeContext }