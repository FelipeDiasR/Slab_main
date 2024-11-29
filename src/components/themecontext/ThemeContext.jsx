import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLigmode, setIsLigmode] = useState(false);

  const toggleTheme = () => {
    setIsLigmode(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isLigmode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
