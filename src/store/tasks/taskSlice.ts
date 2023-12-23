/* eslint-disable prettier/prettier */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

interface TaskState {
  tasks: Task[];
  autoId: number;
  filterView: Task[];
}

const initialState: TaskState = {
  tasks: [],
  autoId: 0,
  filterView: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(
      state,
      action: PayloadAction<
        Pick<Task, 'title' | 'description' | 'completed' | 'dueDate'>
      >,
    ) {
      const newTask = action.payload;
      state.tasks = [...state.tasks, {...newTask, id: state.autoId++}];
    },
    deleteTask(state, action: PayloadAction<{id: number}>) {
      const {id} = action.payload;
      const updatedTasks = state.tasks.filter(task => task.id !== id);
      state.tasks = updatedTasks;
    },
    toggleTask(state, action: PayloadAction<{id: number}>) {
      const {id} = action.payload;
      const updatedTasks = state.tasks.map(task => {
        if (task.id === id) {
          return {...task, completed: !task.completed};
        }

        return task;
      });
      state.tasks = updatedTasks;
    },
    filterView(state, action: PayloadAction<{type: string}>) {
      const {type} = action.payload;

      switch (type) {
        case 'All':
          state.filterView = state.tasks;
          break;
        case 'Complete':
          state.filterView = state.tasks.filter(task =>
            Boolean(task.completed),
          );
          break;
        case 'InComplete':
          state.filterView = state.tasks.filter(task =>
            Boolean(!task.completed),
          );
          break;
        default:
          state.filterView = state.tasks;
          break;
      }
    },
  },
});

export const {addTask, deleteTask, toggleTask, filterView} = taskSlice.actions;

export const tasksCount = (state: RootState) => state.task.tasks.length;

export default taskSlice.reducer;
