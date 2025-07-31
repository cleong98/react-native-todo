import { RootState } from '@app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

interface Todo {
  id: string;
  title: string;
  description: string;
  createDate: string;
  completedData: string | null;
}

type CreateTodo = Pick<Todo, 'title' | 'description'>;
type UpdateTodo = Pick<Todo, 'title' | 'description' | 'id'>;

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<CreateTodo>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: uuid.v4(),
        createDate: new Date().toISOString(),
        completedData: null,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const exist = state.find(todo => todo.id === action.payload);
      if (!exist) {
        throw new Error(`${action.payload} not exist`);
      }
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(todo => todo.id === action.payload);
      if (index < 0) {
        throw new Error(`${action.payload} not exist`);
      }

      if (state[index].completedData === null) {
        state[index].completedData = new Date().toISOString();
      } else {
        state[index].completedData = null;
      }
    },
    updateTodo: (state, action: PayloadAction<UpdateTodo>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index < 0) {
        throw new Error(`${action.payload} not exist`);
      }

      state[index].title = action.payload.title;
      state[index].description = action.payload.description;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.find(todo => todo.id === id);

export default todoSlice.reducer;
