import { ThemeContextValue, useTheme } from '@app/context/themeContext';
import { AppTheme, getAppTheme } from '@app/theme/theme';
import { useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (theme: AppTheme) => T,
) => {
  const { theme: currentTheme } = useTheme();
  const colorScheme = useColorScheme();
  const resolvedThemeType: 'light' | 'dark' =
    currentTheme === 'followSystem'
      ? colorScheme === 'dark'
        ? 'dark'
        : 'light'
      : currentTheme;

  const appTheme = useMemo(
    () => getAppTheme(resolvedThemeType),
    [resolvedThemeType],
  );

  return useMemo(() => createStyles(appTheme), [appTheme]);
};

export default useThemedStyles;
