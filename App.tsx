import { ThemeProvider, useTheme } from '@app/context/themeContext';
import Navigation from '@app/navigation/navigation';
import { store, persistor } from '@app/store';
import { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </PersistGate>
    </ThemeProvider>
  );
}

export default App;
