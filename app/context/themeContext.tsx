import { createContext, FC, ReactNode, useContext, useState } from 'react';

export type CustomAppTheme = 'light' | 'dark' | 'followSystem';

export type ThemeContextValue = {
  theme: CustomAppTheme;
  supportedThemes: CustomAppTheme[];
  setTheme: (value: 'light' | 'dark' | 'followSystem') => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// create theme provider
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<CustomAppTheme>('dark');
  const supportedThemes: CustomAppTheme[] = ['light', 'dark', 'followSystem'];
  const updateTheme = (theme: CustomAppTheme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, supportedThemes, setTheme: updateTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

//create theme hook

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error('ThemeContext must be used inside ThemeProvider');

  return ctx;
};
