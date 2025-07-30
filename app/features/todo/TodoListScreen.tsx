import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@app/components/AppBar';
import TodoItem from './components/TodoItem';
import Icon from '@react-native-vector-icons/fontawesome6';
import IconButton from './components/IconButton';
import { useAppDispatch, useAppSelector } from '@app/hooks/storeHook';
import { addTodo, deleteTodo, selectTodos, toggleTodo } from './todoSlice';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@app/navigation/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TodoListScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'TodoList'
>;

const TodoEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No todos</Text>
    </View>
  );
};

const TodoListScreen = () => {
  const navigation = useNavigation<TodoListScreenNavigationProp>();
  const todos = useAppSelector(selectTodos);

  const dispatch = useAppDispatch();

  const onToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const onDeleteTodo = (id: string) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteTodo(id));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const onEdit = (id: string) => {
    navigation.navigate('UpdateTodo', {
      id,
    });
  };

  const onAddTodo = () => {
    navigation.navigate('AddTodo');
  };

  return (
    <SafeAreaView style={styles.todoListContainer}>
      <Header
        title={'Todo App'}
        action={
          <IconButton
            icon={
              <Icon name="plus" iconStyle="solid" color={'white'} size={18} />
            }
            backgroundColor="red"
            onPress={onAddTodo}
          />
        }
      />
      <View>
        <FlatList
          ListEmptyComponent={<TodoEmpty />}
          data={todos}
          renderItem={({ item }) => {
            const disabled = item.completedData !== null;
            return (
              <TodoItem
                toggleTodo={_ => onToggleTodo(item.id)}
                title={item.title}
                key={item.id}
                actions={
                  <>
                    <IconButton
                      disabled={disabled}
                      icon={
                        <Icon size={16} name="pen-to-square" color={'white'} />
                      }
                      onPress={() => onEdit(item.id)}
                      backgroundColor="#4CAF50"
                    />
                    <IconButton
                      disabled={disabled}
                      icon={
                        <Icon
                          size={16}
                          name="trash"
                          iconStyle="solid"
                          color={'white'}
                        />
                      }
                      onPress={() => onDeleteTodo(item.id)}
                      backgroundColor="#F44336"
                    />
                  </>
                }
              />
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'grey',
  },
});

export default TodoListScreen;
