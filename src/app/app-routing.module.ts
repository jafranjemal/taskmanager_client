import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: '', redirectTo:"tasks" , pathMatch:"full" },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
