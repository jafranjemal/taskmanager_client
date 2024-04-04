import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as TaskActions from './task.action';
import { TasksService } from 'src/app/services/tasks.service';

@Injectable()
export class TaskEffects {
    loadAllTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            switchMap(() =>
                this._taskService.getAllTasks().pipe(
                    map((res) => TaskActions.loadTasksSuccess({ tasks: res })),
                    catchError((error) => of(TaskActions.loadTasksFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private _taskService: TasksService
    ) { }
}
