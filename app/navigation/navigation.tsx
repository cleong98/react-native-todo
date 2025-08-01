import TodoListScreen from '@app/features/todo/TodoListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddTodoScreen from '@app/features/todo/AddTodoScreen';
import UpdateTodoScreen from '@app/features/todo/UpdateTodoScreen';
import CustomTabbar from '@app/components/CustomTabbar';
import SettingScreen from '@app/features/misc/SettingScreen';
import ThemeScreen from '@app/features/misc/ThemeScreen';
import SplashScreen from '@app/features/misc/SplashScreen';

export type BottomTabParamList = {
  Home: undefined;
  Setting: undefined;
};

export type StackParamList = {
  Splash: undefined;
  Main: undefined;
  AddTodo: undefined;
  UpdateTodo: { id: string };
  Theme: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Stack = createNativeStackNavigator<StackParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        popToTopOnBlur: true,
      }}
      initialRouteName="Home"
      tabBar={props => <CustomTabbar {...props} />}
    >
      <Tab.Screen name="Home" component={TodoListScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} />
      <Stack.Screen name="UpdateTodo" component={UpdateTodoScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
