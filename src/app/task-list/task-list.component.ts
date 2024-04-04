import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITaskModel } from '../models/tasks.interface';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from '../shared/alert/alert.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../states/app.state';
 
import * as TaskActions from '../states/task/task.action';
import * as TaskSelector from '../states/task/task.selector';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],

})

export class TaskListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Title', 'Description', 'DueDate', 'Actions'];
  dataSource: MatTableDataSource<ITaskModel> = new MatTableDataSource<ITaskModel>();
  isLoading: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
 

  constructor(private store: Store<AppState>,private _taskManagerService: TasksService, private _router: Router, private _alert: AlertService) { }
  ngOnInit(): void {
    this.getAllTasks();
     

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllTasks(): void {
    this._taskManagerService.getAllTasks().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => console.log(e)
    })
 

  }

  getAllTasks_old(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.store.select(TaskSelector.selectAllTasks).subscribe({
      next: (tasks) => {
        // this.dataSource.data = tasks;  
        // this.dataSource.paginator = this.paginator;  
        // this.dataSource.sort = this.sort;  
      },
      error: (e) => console.log(e)
    });
  }
  

  editTask(id: any): void { this.navigateTo(['tasks/edit', id]); }
  deleteTask(id: any): void {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to delete this task?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._taskManagerService.deleteTask(id).subscribe(
          () => {
            console.log("delete success")
            this._alert.showAlert("Task Deleted Successfully", "success")
            this.getAllTasks();
          },
          error => {
            console.error(error);
            this._alert.showAlert("Task Deletion Failed", "error")
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle cancellation
      }
    });
  }

  viewTask(id: any): void {
    this.navigateTo(['tasks', id]);
  }

  navigateTo(path: any) {
    this._router.navigate(path)
  }
}


