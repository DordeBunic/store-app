import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/services/state/store";
import type { Theme } from "@/models/Theme";

type ThemeContextValue = {
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "blue"
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const preferencesTheme = useSelector(
    (state: RootState) => state.preferences.preferences?.theme,
  );

  const theme: Theme = preferencesTheme ?? "blue";

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
