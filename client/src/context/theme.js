// import React, { useState, createContext } from 'react';

// export const ThemeCon
text = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const setThemeColor = (color) => {
//     setTheme(color);
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         themeColor: theme,
//         setThemeColor,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const setThemeColor = (color) => {
    setTheme(color);
  }
  return (
    <ThemeContext.Provider
      value={
        {
          themeColor: theme,
          setThemeColor
        }
      }
    >
      {children}
    </ThemeContext.Provider>
  )
}

const { themeColor } = useContext(ThemeContext);

////////////////////////////////////////////////////////////////////////////////
const Abc = ({children}) => {
  return <div>
    {children}
  </div>
}