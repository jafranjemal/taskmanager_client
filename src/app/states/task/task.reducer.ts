import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.action';
import { initialState } from './task.state';

export const TaskReducer = createReducer(
    initialState,
    on(TaskActions.loadTasks, state => ({ 
        ...state, 
        loading: true, 
        error: null 
    })),
    on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
        ...state,
        tasks,
        loading: false, 
        error: null
    })),
    on(TaskActions.loadTasksFailure, (state, { error }) => ({ 
        ...state, 
        loading: false, 
        error })),

)