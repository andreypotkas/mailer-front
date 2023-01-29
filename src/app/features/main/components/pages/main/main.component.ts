import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { UsersService } from 'src/app/core/services/users.service';
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
	constructor(
        private router: Router, 
        private myEmailsService: MyEmailsService, 
        private userService: UsersService) {}

	ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-envelope',
                routerLink: 'mail-sender',
            },
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
                label: 'Emails', 
                icon: 'pi pi-list', 
                routerLink: 'my-emails',
            },   
            {
                label: 'My messages', 
                icon: 'pi pi-envelope', 
                routerLink: 'messages-list',
            },            
        ];
	}

    public logout() {
		this.userService.logout();
		this.router.navigateByUrl('/auth');
	}
}
