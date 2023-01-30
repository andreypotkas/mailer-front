import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MailSenderComponent } from './components/pages/mail-sender/mail-sender.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactListComponent } from './components/pages/contact-list/contact-list.component';
import { MyEmailsComponent } from './components/pages/my-emails/my-emails.component';
import { MessageListComponent } from './components/pages/message-list/message-list.component';
import { DialogWindowComponent } from './components/dialog-window/dialog-window.component';
import { EmailEditorModule } from 'angular-email-editor';

@NgModule({
  declarations: [
    MailSenderComponent, MainComponent, ContactListComponent, MyEmailsComponent, MessageListComponent, DialogWindowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    SharedModule,
  ],
   exports:[MailSenderComponent, MainComponent]
})
export class MainModule { }
