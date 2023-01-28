import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ChipsModule} from 'primeng/chips';
import {EditorModule} from 'primeng/editor';
import {MultiSelectModule} from 'primeng/multiselect';
import {DividerModule} from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {TreeTableModule} from 'primeng/treetable';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {MenuModule} from 'primeng/menu';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModule,
    MenubarModule,
    InputTextModule,
    InputTextareaModule,
    ChipsModule,
    EditorModule,
    ToggleButtonModule,
    MultiSelectModule,
    DividerModule,
    StyleClassModule,
    PanelMenuModule,
    ConfirmDialogModule,
    TableModule,
    RatingModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DropdownModule,
    TreeTableModule,
    AvatarModule,
    CardModule,
    AccordionModule,
    MenuModule
  ]
})
export class PrimengModule { }
