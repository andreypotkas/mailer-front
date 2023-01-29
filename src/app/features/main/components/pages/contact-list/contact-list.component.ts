import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs';
import { IEmailContact, IEmailContactList } from '../../../models/email-contact.interface';
import { ContactService } from '../../../services/contact.service';
import { ContactListService } from '../../../services/contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ConfirmationService]
})
export class ContactListComponent implements OnInit {
    contactList!: any;
    currentContactList!: any;

    contactDialog!: boolean;
    contactListDialog!: boolean;

    contacts: IEmailContact[] = [];
    contactLists: IEmailContactList[] = [];
    submitted!: boolean;

    cols!: any[];

    _selectedColumns!: any[];

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }
    constructor(
        private contactListService: ContactListService, 
        private contactEmailService: ContactService, 
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.contactListService.getAllContactLists().subscribe(data => {

            this.contactLists = data;  
            this.currentContactList = data[0]
            
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'email', header: 'Email' },
            { field: 'facebook', header: 'Facebook' },
            { field: 'instagram', header: 'Instagram' },
            { field: 'linkedin', header: 'Linkedin' },
            { field: 'phoneNumber', header: 'PhoneNumber' },
            { field: 'telegram', header: 'Telegram' },
            { field: 'whatsup', header: 'Whatsup' },
        ];

        this._selectedColumns = this.cols.slice(0,3);
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter(col => val.includes(col));
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
        this.contactListService.createContactList(this.contactList).pipe(take(1)).subscribe(data => {
            this.contactLists.push(data);
        } );

        this.contactListDialog = false;
    }

    selectContactList(item: any){
        this.currentContactList = item;
    }
}
