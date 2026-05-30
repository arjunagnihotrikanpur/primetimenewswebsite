import { createContext, useContext, useEffect, useState } from "react";
import { getThemeSettings } from "../services/data";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    baseColor: "#d10000",
    backgroundColor: "#f3f4f6",
    homeTitle: "Watch Breaking News Anytime",
  });

  useEffect(() => {
    const loadTheme = async () => {
      const data = await getThemeSettings();

      if (data) {
        setTheme(data);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--base-color", theme.baseColor);

    document.documentElement.style.setProperty("--bg-color", theme.baseColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
