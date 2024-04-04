 
import { createAction, props } from '@ngrx/store'; 
import { ITaskModel } from 'src/app/models/tasks.interface';


export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: ITaskModel[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: ITaskModel }>()
);
export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: ITaskModel }>()
);
export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: any }>()
);

export const deleteTask = createAction(
    '[Task] Delete Task',
    props<{taskId: number}>()
)

 
