import { View, Text, StyleSheet } from 'react-native';
import React, { FC, ReactNode } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface TodoItemProps {
  title: string;
  actions?: ReactNode;
  toggleTodo?: (completed: boolean) => void,
}

const TodoItem: FC<TodoItemProps> = ({ title, actions, toggleTodo }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <BouncyCheckbox
          size={18}
          fillColor="red"
          unFillColor="#FFFFFF"
          text={title}
          iconStyle={{ borderColor: 'red' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
          onPress={toggleTodo}
        />
      </View>
      <View style={styles.actionContainer}>{actions}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 14,
  },
});

export default TodoItem;
