import TodoListScreen from '@app/features/todo/TodoListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddTodoScreen from '@app/features/todo/AddTodoScreen';
import UpdateTodoScreen from '@app/features/todo/UpdateTodoScreen';
import CustomTabbar from '@app/components/CustomTabbar';
import SettingScreen from '@app/features/misc/SettingScreen';
import ThemeScreen from '@app/features/misc/ThemeScreen';

export type BottomTabParamList = {
  Home: undefined;
  Setting: undefined;
};

export type HomeStackParamList = {
  TodoList: undefined;
  AddTodo: undefined;
  UpdateTodo: { id: string };
};

export type SettingStackParamList = {
  General: undefined;
  Theme: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Stack = createNativeStackNavigator<HomeStackParamList>();

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TodoList" component={TodoListScreen} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} />
      <Stack.Screen name="UpdateTodo" component={UpdateTodoScreen} />
    </Stack.Navigator>
  );
};

const SettingStackNavigation = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingStack.Screen name="General" component={SettingScreen} />
      <SettingStack.Screen name="Theme" component={ThemeScreen} />
    </SettingStack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        popToTopOnBlur: true,
      }}
      initialRouteName="Setting"
      tabBar={props => <CustomTabbar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen name="Setting" component={SettingStackNavigation} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
};

export default Navigation;
