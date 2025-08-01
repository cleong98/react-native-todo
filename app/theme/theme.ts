import { CustomAppTheme } from '@app/context/themeContext';

export interface AppTheme {
  background: string;
  primary: string;
  lightPrimary: string;
  card: string;
  border: string;
  textColor: string;
  iconColor: string;
  buttonText: string;
}

export const lightTheme: AppTheme = {
  background: 'transparent',
  primary: '#6874E8',
  lightPrimary: '#B8C4F6',
  card: '#fff',
  border: '#D3D3D3',
  textColor: '#000',
  iconColor: '#fff',
  buttonText: '#FFFFFF',
};

export const darkTheme: AppTheme = {
  background: '#2B2B2B',
  card: '#121212',
  primary: '#6874E8',
  lightPrimary: '#9DA5F1',
  border: '#D3D3D3',
  textColor: '#FFFFFF',
  iconColor: '#FFFFFF',
  buttonText: '#FFFFFF',
};

export type SupportAppTheme = Exclude<CustomAppTheme, 'followSystem'>;

export const getAppTheme = (theme: SupportAppTheme): AppTheme => {
  if (theme === 'light') return lightTheme;
  return darkTheme;
};
