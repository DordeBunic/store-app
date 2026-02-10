import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/services/state/store";
import type { Theme } from "@/models/Theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "blue",
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const preferencesTheme = useSelector(
    (state: RootState) => state.preferences.preferences?.theme,
  );

  const [theme, setTheme] = useState<Theme>(preferencesTheme ?? "blue");

  useEffect(() => {
    if (preferencesTheme && preferencesTheme !== theme) {
      setTheme(preferencesTheme);
    }
  }, [preferencesTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
