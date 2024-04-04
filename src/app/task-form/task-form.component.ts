import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ITaskModel } from '../models/tasks.interface';
import { MatCalendar } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

  isEditMode = false;
  editedTaskId = "";
  taskForm: FormGroup;
  selectedDate: Date;
  startAtDate: Date;
  dueDate: Date;

  constructor(private _alert: AlertService, private datePipe: DatePipe, private activeRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private _taskService: TasksService, private _snackBar: MatSnackBar, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.initForm();
    this.activeRoute.params.subscribe(param => {
      const id = param['id'];
      if (id) {
        this.isEditMode = true;
        this.editedTaskId = id;
        this.getTaskAndSetToForm(Number(id));

      } else {
        this.isEditMode = false;

        this.startAtDate = this.dueDate;
      }

    });
  }



  initForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      dueDate: ['', Validators.required]
    })
  }

  resetForm() {
    if (this.taskForm.dirty || this.taskForm.touched) {
      this.taskForm.reset();

      Object.keys(this.taskForm.controls).forEach(controlName => {
        const control = this.taskForm.get(controlName);
        control?.clearValidators();
        control?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });

      this.calendar._goToDateInView(new Date(), "month");

    }
  }

  updateFormDate(value: any) {
    //this.taskForm.get('dueDate')?.setValue(value);
    this.taskForm.patchValue({
      dueDate: value
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.extractTaskData();
      const taskObservable = this.isEditMode ? this._taskService.updateTask(taskData) : this._taskService.addTask(taskData);

      taskObservable.subscribe({
        next: () => {
          this.handleSuccess(this.isEditMode ? 'Task Updated Successfully' : 'New Task Created Successfully');
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  private extractTaskData(): ITaskModel {
    const formattedDueDate = this.datePipe.transform(this.taskForm.get('dueDate')?.value, 'yyyy/MM/dd');
    const id = this.editedTaskId ? Number(this.editedTaskId) : 0;
    const dueDate = formattedDueDate || '';
    const title = this.taskForm.get('title')?.value?.toString() || '';
    const description = this.taskForm.get('description')?.value?.toString() || '';

    return { Id: id, DueDate: dueDate, Title: title, Description: description };
  }

  private handleSuccess(message: string): void {
    this.resetForm();
    this._alert.showAlert(message, 'success')

  }

  private handleError(error: any): void {
    console.error(error.error.Errors);
    if (error.status === 400 && error.error.Errors) {
      const errorMessage = error.error.Errors.map((err: any) => err.Message).join(',');
      this._snackBar.open(errorMessage, 'Close', {
        duration: 10000,
        verticalPosition: 'bottom',
      });
    }
  }

  getTaskAndSetToForm(taskId: number) {

    this._taskService.getTaskById(taskId).subscribe(
      (task: ITaskModel) => {
        console.log(task)

        this.taskForm.patchValue({
          title: task.Title,
          description: task.Description,
          dueDate: new Date(task.DueDate)
        })
        this.startAtDate = new Date(task.DueDate);
        this.calendar._goToDateInView(this.startAtDate, "month");
      },
      error => {
        console.error("Error fetching task", error)
      }
    )
  }

  getDueDateValue(): any {
    // Ensure that taskForm is initialized and dueDate is available
    return this.taskForm && this.taskForm.get('dueDate')?.value ? new Date(this.taskForm.get('dueDate')?.value) : null;
  }



}

