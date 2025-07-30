import TodoListScreen from '@app/features/todo/TodoListScreen';
import Navigation from '@app/navigation/navigation';
import { store } from '@app/store';
import { StatusBar, Text, View } from 'react-native';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <Navigation />
    </Provider>
  );
}

export default App;
