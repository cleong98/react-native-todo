import { useTheme } from '@app/context/themeContext';
import { AppTheme, getAppTheme } from '@app/theme/theme';
import { useMemo } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

const useThemedStyles = <T extends Record<string, ViewStyle | TextStyle>>(
  createStyles: (theme: AppTheme) => T,
) => {
  const { resolvedTheme } = useTheme();

  const appTheme = useMemo(() => getAppTheme(resolvedTheme), [resolvedTheme]);

  return useMemo(() => createStyles(appTheme), [appTheme]);
};

export default useThemedStyles;
