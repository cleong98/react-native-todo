import { ThemeProvider, useTheme } from '@app/context/themeContext';
import Navigation from '@app/navigation/navigation';
import { store } from '@app/store';
import { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

const AppContent = () => {
  const { resolvedTheme } = useTheme();

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
