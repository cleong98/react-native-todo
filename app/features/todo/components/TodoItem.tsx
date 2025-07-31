import { View, Text, StyleSheet } from 'react-native';
import React, { FC, ReactNode, useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface TodoItemProps {
  title: string;
  description: string;
  actions?: ReactNode;
  toggleTodo?: (completed: boolean) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  title,
  description,
  actions,
  toggleTodo,
}) => {
  const [completed, setCompleted] = useState(false);
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        style={styles.checkboxContainer}
        size={18}
        fillColor="red"
        isChecked={completed}
        unFillColor="#FFFFFF"
        iconStyle={{ borderColor: 'red' }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: 'JosefinSans-Regular' }}
        onPress={val => {
          setCompleted(val);
          toggleTodo?.(val);
        }}
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.todoTitle, completed && styles.completedText]}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.todoDescription, completed && styles.completedText]}
        >
          {description}
        </Text>
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
  checkboxContainer: {
    width: 50,
  },
  contentContainer: {
    flex: 1,
  },
  todoTitle: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { fontSize: 16, fontWeight: '300' },
  completedText: {
  textDecorationLine: 'line-through'
  }
});

export default TodoItem;
