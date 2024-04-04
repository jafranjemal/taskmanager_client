import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { ITaskModel } from '../models/tasks.interface';
import { AlertService } from '../shared/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: ITaskModel;

  constructor(private _router: Router, private _activeRoutes: ActivatedRoute, private _taskManagerService: TasksService, private alert: AlertService) { }

  ngOnInit(): void {

    this._activeRoutes.params.subscribe(
      parameter => {

        const id = parameter['id']
        this._taskManagerService.getTaskById(id).subscribe(
          (result) => this.task = result
          ,
          (error) => this.alert.showAlert(JSON.stringify(error), "error")
        )
      }
    )
  }

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
            this.alert.showAlert("Task Deleted Successfully", "success")
            this._router.navigate(["tasks"])

          },
          error => {
            console.error(error);
            this.alert.showAlert("Task Deletion Failed", "error")
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle cancellation
      }
    });
  }
}
