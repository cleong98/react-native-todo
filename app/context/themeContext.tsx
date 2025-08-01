import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, useColorScheme } from 'react-native';

export type CustomAppTheme = 'light' | 'dark' | 'followSystem';

export type ThemeContextValue = {
  theme: CustomAppTheme;
  resolvedTheme: Exclude<CustomAppTheme, 'followSystem'>;
  supportedThemes: CustomAppTheme[];
  setTheme: (value: CustomAppTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// create theme provider
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<CustomAppTheme>('followSystem');
  const supportedThemes: CustomAppTheme[] = ['light', 'dark', 'followSystem'];
  const colorScheme = useColorScheme();
  const updateTheme = async (theme: CustomAppTheme) => {
    setTheme(theme);
    await AsyncStorage.setItem('theme', theme);
  };

  const initialize = async () => {
    try {
      const stored = await AsyncStorage.getItem('theme');
      if (
        stored === 'light' ||
        stored === 'dark' ||
        stored === 'followSystem'
      ) {
        setTheme(stored);
      } else {
        await AsyncStorage.setItem('theme', theme);
      }
    } catch (err) {
      console.error('Failed to load theme from storage', err);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'followSystem'
      ? colorScheme === 'dark'
        ? 'dark'
        : 'light'
      : theme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        supportedThemes,
        setTheme: updateTheme,
        resolvedTheme,
      }}
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
