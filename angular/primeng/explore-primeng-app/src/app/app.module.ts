import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AccordionModule } from "primeng/accordion";
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { NgButtonComponent } from './global/components/ng-button/ng-button.component';
import { AccordionComponent } from './global/components/accordion/accordion.component';
import { FileUploadComponent } from './global/components/file-upload/file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    NgButtonComponent,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    ButtonModule,
    FileUploadModule
=======
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
>>>>>>> 4368d4c308d6148f3870efec1dd4663972b76023
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
