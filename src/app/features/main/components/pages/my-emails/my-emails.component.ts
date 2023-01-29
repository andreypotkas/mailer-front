import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { MyEmailsService } from '../../../services/my-emails.service';

@Component({
  selector: 'app-my-emails',
  templateUrl: './my-emails.component.html',
  styleUrls: ['./my-emails.component.scss'],
  providers: [ConfirmationService]
})
export class MyEmailsComponent implements OnInit {
    
    productDialog!: boolean;

    products!: any[];

    product!: any;

    constructor(private myEmailsService: MyEmailsService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.myEmailsService.getAllMyEmailByUserId().pipe(take(1)).subscribe(data => {            
            this.products = data;
        })
    }

    addYandexAccount(){
        this.myEmailsService.addYandexAccount();
    }

    addGoogleAccount(){
        this.myEmailsService.addNewMailAccountWithGoogleLogin();
    }

    addMailruAccount(){
        this.myEmailsService.addMailruAccount();
    }

    hideDialog() {
        this.productDialog = false;
    }
}
