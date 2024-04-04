import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ITaskModel } from '../models/tasks.interface';
 

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'https://localhost:44340/api/tasks';
  constructor(private _http : HttpClient) { }

  

  getAllTasks(): Observable<ITaskModel[]> {
    return this._http.get<ITaskModel[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  addTask(task: ITaskModel):Observable<ITaskModel>{
    return this._http.post<ITaskModel>(this.apiUrl, task).pipe(
      catchError(error=> {
        console.error("Error adding task");
         throw error;
      })
    )
  }

  getTaskById(id: number): Observable<ITaskModel> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.get<ITaskModel>(url);
  }

  updateTask(task: ITaskModel):Observable<ITaskModel>{
    const updateUrl = `${this.apiUrl}/${task.Id}`
    return this._http.put<ITaskModel>(updateUrl, task).
    pipe(
      catchError(error=> {
        console.error("Error updating task",error)
        throw error;
      })
    )
  }

  deleteTask(taskId: number):Observable<void>{
    const deleteUrl = `${this.apiUrl}/${taskId}`
    return this._http.delete<void>(deleteUrl).
    pipe(
      catchError(error=> {
        console.error("Error deleting task",error)
        throw error;
      })
    )
  }
  
}
