import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITaskState } from "./task.state";

export const selectTaskFeature = createFeatureSelector<ITaskState>("task");

export const selectAllTasks = createSelector(
    selectTaskFeature,
    (state: ITaskState)=> state.tasks
)

export const selectTaskError = createSelector(
    selectTaskFeature,
    (state: ITaskState)=> state.error
)