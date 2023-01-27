import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/pages/contact-list/contact-list.component';
import { MailSenderComponent } from './components/pages/mail-sender/mail-sender.component';
import { MainComponent } from './components/pages/main/main.component';
import { MessageListComponent } from './components/pages/message-list/message-list.component';
import { MyEmailsComponent } from './components/pages/my-emails/my-emails.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'mail-sender',
        component: MailSenderComponent
      },
      {
        path: 'contact-list',
        component: ContactListComponent
      },
      {
        path: 'my-emails',
        component: MyEmailsComponent
      },
      {
        path: 'messages-list',
        component: MessageListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
