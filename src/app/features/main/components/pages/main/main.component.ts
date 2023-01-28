import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { MyEmailsService } from '../../../services/my-emails.service';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	items: MenuItem[] = [];
	activeItem!: MenuItem;
    emails: any[] = [];
	constructor(private router: Router, private myEmailsService: MyEmailsService) {}

	ngOnInit() {
        this.myEmailsService.getAllMyEmailByUserId().subscribe((data) => {
            this.emails = data;
            
            this.emails = data.map(item => {
                const newItem = {} as MenuItem;
                newItem.label = item.email;
                newItem.icon = 'pi pi-envelope';
                newItem.queryParams = [item.id];
                newItem.routerLink = 'messages-list';
                return newItem;
            });
            
            this.items = [
                        {
                            label: 'Mail sender', 
                            icon: 'pi pi-send',
                            routerLink: 'mail-sender',
                        },
                        {
                            label: 'Contact list', 
                            icon: 'pi pi-list', 
                            routerLink: 'contact-list'
                        },
                        {
                            label: 'My emails', 
                            icon: 'pi pi-folder', 
                            routerLink: 'my-emails',
                        },                   
            ];

            this.activeItem = this.items[0];
        });
	}
}
