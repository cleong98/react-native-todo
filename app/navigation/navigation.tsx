import TodoListScreen from '@app/features/todo/TodoListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddTodoScreen from '@app/features/todo/AddTodoScreen';

export type BottomTabParamList = {
  Home: undefined;
  Setting: undefined;
};

export type HomeStackParamList = {
  TodoList: undefined;
  AddTodo: undefined;
  UpdateTodo: { id: string };
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TodoList"
        component={TodoListScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddTodo"
        component={AddTodoScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="UpdateTodo"
        component={TodoListScreen}
      />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeStackNavigation}
      />
      <Tab.Screen
        name="Setting"
        options={{
          headerShown: false,
        }}
        component={TodoListScreen}
      />
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
