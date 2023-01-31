import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { IEmailContact, IEmailContactList } from '../../../models/email-contact.interface';
import { IMyEmailAccount } from '../../../models/my-email.interface';
import { ContactListService } from '../../../services/contact-list.service';
import { MyEmailsService } from '../../../services/my-emails.service';
@Component({
  selector: 'app-mail',
  templateUrl: './mail-sender.component.html',
  styleUrls: ['./mail-sender.component.scss']
})
export class MailSenderComponent implements OnInit {

  subject!: string;
  message!: string;

  mailAdressesTypedManually: string[] = [];

  emailContactLists: IEmailContactList[] = [];

  myEmailAccountList: IMyEmailAccount[] = [];
  selectedMyEmailAccountList: IMyEmailAccount[] = [];

  selectedContacts: IEmailContact[] = [];

  constructor(private myEmailsService: MyEmailsService, private contactListService: ContactListService) { }

  ngOnInit(): void {
    // get contact lists
    this.contactListService.getAllContactLists().pipe(take(1)).subscribe(data => {      
      this.emailContactLists = data;
    });
    
    this.myEmailsService.getAllMyEmailByUserId().subscribe(data => {
      this.myEmailAccountList = data;
    })
  }

  public onSubmit(){
    const mailingListInfo = {
      mails: [...this.mailAdressesTypedManually, ...this.selectedContacts],
      subject: this.subject,
      message: this.message,
      senderAccountsIds: this.selectedMyEmailAccountList
    }        
      
    this.myEmailsService.send(mailingListInfo).pipe(take(1)).subscribe(data => console.log(data));
  }
}
