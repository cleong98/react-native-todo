import { ThemeProvider, useTheme } from '@app/context/themeContext';
import TodoListScreen from '@app/features/todo/TodoListScreen';
import Navigation from '@app/navigation/navigation';
import { store } from '@app/store';
import { useMemo } from 'react';
import { StatusBar, Text, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';

const AppContent = () => {
  const { theme: currentTheme } = useTheme();
  const colorScheme = useColorScheme();

  const resolvedTheme =
    currentTheme === 'followSystem'
      ? colorScheme === 'dark'
        ? 'dark'
        : 'light'
      : currentTheme;

  const barStyle = useMemo(
    () => (resolvedTheme === 'dark' ? 'light-content' : 'dark-content'),
    [resolvedTheme],
  );
  return (
    <>
      <StatusBar barStyle={barStyle} />
      <Navigation />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
