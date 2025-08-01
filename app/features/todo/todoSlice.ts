import { RootState } from '@app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

export const TodoFilters = ['all', 'active', 'completed'] as const;
export type TodoFilter = (typeof TodoFilters)[number];
interface Todo {
  id: string;
  title: string;
  description: string;
  createDate: string;
  completedDate: string | null;
}

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  keyword: string;
}

type CreateTodo = Pick<Todo, 'title' | 'description'>;
type UpdateTodo = Pick<Todo, 'title' | 'description' | 'id'>;

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  keyword: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<CreateTodo>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: uuid.v4(),
        createDate: new Date().toISOString(),
        completedDate: null,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completedDate = todo.completedDate
          ? null
          : new Date().toISOString();
      }
    },
    updateTodo: (state, { payload }: PayloadAction<UpdateTodo>) => {
      const todo = state.todos.find(t => t.id === payload.id);
      if (todo) Object.assign(todo, payload);
    },
    updateFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
    updateKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } =
  todoSlice.actions;

const selectTodosState = (s: RootState) => s.todo;
const selectItems = (s: RootState) => s.todo.todos;
const selectFilter = (s: RootState) => s.todo.filter;
const selectKeywordLower = (s: RootState) => s.todo.keyword.toLowerCase();

export const selectTodos = (s: RootState) => s.todo.todos;

export const selectFilteredTodos = createSelector(
  [selectItems, selectFilter, selectKeywordLower],
  (items, filter, keyword) => {
    const byFilter =
      filter === 'active'
        ? items.filter(todo => todo.completedDate === null)
        : filter === 'completed'
        ? items.filter(todo => todo.completedDate !== null)
        : items;
    return keyword
      ? byFilter.filter(
          todo =>
            todo.title.toLowerCase().includes(keyword) ||
            todo.description.toLowerCase().includes(keyword),
        )
      : byFilter;
  },
);

export const selectTodoById = (state: RootState, id: string) =>
  state.todo.todos.find(todo => todo.id === id);

export default todoSlice.reducer;
