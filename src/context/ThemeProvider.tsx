"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
    elementColor: string;
    darkgrayishblue: string;
    lightgrayishblue: string;

};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => { },
    elementColor: "white",
    darkgrayishblue: "red",
    lightgrayishblue: "hsl(233, 11%, 84%)",


});
//Creates and exports the context with a default value.
interface ThemeProviderProps {
    //Type: ReactNode is a type provided by React that represents 
    //any node that can be rendered in a React application. 
    children: ReactNode;
}
//Defines the ThemeProvider component, typed with React.FC and the props interface.
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");



    //Creates a state variable for the theme with "light" as the default.
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    //Defines a function to switch between light and dark themes.
    const color = theme === "light" ? " hsl(235, 19%, 35%)" : "white";
    const backgroundColor = theme === "light" ? " hsl(0, 0%, 98%)" : " hsl(235, 21%, 11%)";
    const elementColor = theme === "light" ? "white" : "hsl(235, 24%, 19%)";
    const darkgrayishblue = theme === "light" ? "hsl(236, 9%, 61%)" : "hsl(234deg 39% 85% / 33%)";
    const lightgrayishblue = theme === "light" ? "hsl(233, 11%, 84%)" : " hsl(234deg 39% 85% / 33%)";

    //Sets color values based on the current theme.
    useEffect(() => {
        document.body.style.color = color;
        document.body.style.backgroundColor = backgroundColor;
    }, [theme, color, backgroundColor]);
    //Updates the document body styles when the theme changes.

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, elementColor, darkgrayishblue, lightgrayishblue }}>
            {children}
        </ThemeContext.Provider>
    );
};