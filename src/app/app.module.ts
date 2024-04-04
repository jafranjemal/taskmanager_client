import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DatePipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import { TaskEffects } from './states/task/task.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskReducer } from './states/task/task.reducer';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ task: TaskReducer }),
    EffectsModule.forRoot([TaskEffects]),     
    SweetAlert2Module.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
