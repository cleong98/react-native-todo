import { StyleSheet, View, FlatList, Text, Alert, Image } from 'react-native';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@app/components/AppBar';
import TodoItem from './components/TodoItem';
import Icon from '@react-native-vector-icons/fontawesome6';
import IconButton from './components/IconButton';
import { useAppDispatch, useAppSelector } from '@app/hooks/storeHook';
import {
  deleteTodo,
  selectFilteredTodos,
  selectTodoFilter,
  selectTodos,
  TodoFilter,
  TodoFilters,
  toggleTodo,
  updateFilter,
} from './todoSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useThemedStyles from '@app/hooks/useThemedStyles';
import { StackParamList } from '@app/navigation/navigation';
import { images } from '@app/assets/constant';
import { Picker } from '@react-native-picker/picker';
import { camelCase } from 'change-case';

type TodoListScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Main'
>;

const TodoListScreen = () => {
  const styles = useThemedStyles(theme =>
    StyleSheet.create({
      appTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      appTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.textColor,
      },
      appTitleLogo: {
        width: 50,
        height: 50,
      },
      todoListContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: theme.background,
        gap: 20,
      },
      scrollViewContainer: {
        flex: 1,
        padding: 10,
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
    }),
  );
  const TodoEmpty = useMemo(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No todos</Text>
      </View>
    );
  }, [styles]);

  const AppTitle = useMemo(() => {
    return (
      <View style={styles.appTitleContainer}>
        <Image source={images.Logo} style={styles.appTitleLogo} />
        <Text style={styles.appTitleText}>My Todo</Text>
      </View>
    );
  }, [styles]);

  const navigation = useNavigation<TodoListScreenNavigationProp>();
  const todos = useAppSelector(selectFilteredTodos);
  const todoFilter = useAppSelector(selectTodoFilter);

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

  const onUpdateTodoFilter = (val: TodoFilter) => {
    dispatch(updateFilter(val));
  };

  return (
    <SafeAreaView style={styles.todoListContainer} edges={['top']}>
      <Header
        title={AppTitle}
        action={
          <View style={{ paddingRight: 10 }}>
            <IconButton
              icon={
                <Icon name="plus" iconStyle="solid" color={'white'} size={18} />
              }
              backgroundColor="#6874E8"
              onPress={onAddTodo}
            />
          </View>
        }
      />
    <View
    style={{
      flex: 1,
      height: 100,
      // borderWidth: 1,
      // borderColor: '#ccc',
      // borderRadius: 6,
      // overflow: 'hidden',
    }}
  >
    <Picker
      selectedValue={todoFilter}
      onValueChange={onUpdateTodoFilter}
      mode="dropdown"
      style={{ width: '100%', height: 50 }}
      itemStyle={{ height: 50, fontSize: 16 }}
    >
      {TodoFilters.map(f => (
        <Picker.Item key={f} label={camelCase(f)} value={f} />
      ))}
    </Picker>
  </View>
      <View style={styles.scrollViewContainer}>
        <FlatList
          ListEmptyComponent={TodoEmpty}
          data={todos}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => {
            const disabled = item.completedDate !== null;
            return (
              <TodoItem
                toggleTodo={_ => onToggleTodo(item.id)}
                title={item.title}
                description={item.description}
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

export default TodoListScreen;
