import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { take } from 'rxjs';
import { IEmailContact, IEmailContactList } from '../../../models/email-contact.interface';
import { ContactEmailService } from '../../../services/contact-email.service';
import { ContactListService } from '../../../services/contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ContactListComponent implements OnInit {
    contactList!: any;

    contactDialog!: boolean;
    contactListDialog!: boolean;

    contacts: IEmailContact[] = [];
    contactLists: IEmailContactList[] = [];
    submitted!: boolean;

    constructor(
        private contactListService: ContactListService, 
        private contactEmailService: ContactEmailService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.contactListService.getAllContactLists().subscribe(data => {
            this.contactLists = data;      
            console.log(data);
                  
        });
    }


    openContactDialog() {        
        this.submitted = false;
        this.contactDialog = true;
    }

    openContactListDialog() {        
        this.contactList = {};
        this.submitted = false;
        this.contactListDialog = true;
    }

    openRemoveContactListDialog(id: string) {       
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this contact list?',
            accept: () => {
                this.contactListService.deleteContactListById(id).pipe(take(1)).subscribe();
            } 
        }) 
    }

    hideContactDialog() {
        this.contactDialog = false;
        this.submitted = false;
    }

    hideContactListDialog() {
        this.contactListDialog = false;
        this.submitted = false;
    }
    

    saveContact(contact: any){
        this.contactEmailService.createContactEmail(contact).pipe(take(1)).subscribe(data => {
            
        });      

        this.contactDialog = false;
    }
    saveContactList(){
        this.contactListService.createContactList(this.contactList).pipe(take(1)).subscribe(data => {});

        this.contactListDialog = false;
    }
}
