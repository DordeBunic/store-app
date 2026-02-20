import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/services/state/store";
import { Theme } from "@/models/Theme";

type ThemeContextValue = {
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme.blue
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const preferencesTheme = useSelector(
    (state: RootState) => state.preferences.preferences?.theme,
  );

  const theme: Theme = preferencesTheme ?? Theme.blue;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
